import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@poppinss/utils';
import User from 'App/Models/User';
import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 12;
export default class UsersController {
  public async index({ request }: HttpContextContract) {

    if (request.qs().currentUser.profile == 'admin') {

      let filter = request.qs().filter || undefined;

      let page = request.qs().page || 1;
      let limit = request.qs().limit || 10;

      try {
        const record = await User.query()
          .where((builder) => {
            if (filter) {
              if (filter.email) {
                builder.where('email', 'like', `%${filter.email}%`);
              }
            }
          })
          .from('users')
          .select('id', 'email', 'profile', 'created_at', 'updated_at')
          .paginate(page, limit);

        return record;

      } catch (error) {
        throw new Exception(error.message, error.status);
      }

    } else {
      throw new Exception('Permission denied', 403);
    }
  }

  public async store({ request }: HttpContextContract) {

    if (request.qs().currentUser.profile == 'admin') {

      const data = request.only(['email', 'password']);

      return await User.create({
        email: data.email,
        password: data.password,
      });
    }

    else {
      throw new Exception('Permission denied', 403);
    }
  }

  public async show({ request }: HttpContextContract) {

    try {
      let id = request.params().id;

      //User só enxerga ele mesmo
      if (request.qs().currentUser.profile == 'user') {
        id = request.qs().currentUser.id;
      }

      let user = await this.findById(id);
      return user;

    } catch (error) {
      throw new Exception(error.message, error.status);
    }

  }

  public async update({ request }: HttpContextContract) {

    try {
      //Senha não pode ser atualizada por outros usuários
      let id = request.qs().currentUser.id;

      const data = request.only(['oldPassword', 'password']);

      let record = await User.query()
        .where('id', id)
        .from('users')
        .select('*')
        .firstOrFail()

      const passwordsMatch = await bcrypt.compare(
        data.oldPassword,
        record.password,
      );

      if (passwordsMatch === true) {
        const hashedPassword = await bcrypt.hash(
          data.password,
          BCRYPT_SALT_ROUNDS,
        );

        record = await record
          .merge({
            password: hashedPassword,
          })
          .save()

        return { message: 'Password updated successfully' };
      }

      else {
        throw new Exception('Incorrect password', 400);
      }

    } catch (error) {
      throw new Exception(error.message, error.status);
    }
  }

  public async destroy({ request, response }: HttpContextContract) {

    let id = request.params().id;

    if (request.qs().currentUser.profile == 'admin') {
      if (id == request.qs().currentUser.id) {
        throw new Exception('Admin cannot delete itself', 403);
      }
    }

    if (request.qs().currentUser.profile == 'user') {
      id = request.qs().currentUser.id;
    }

    try {
      const record = await this.findById(id);

      await record.delete();

      return response.json(
        {
          message: "User deleted"
        });

    } catch (error) {
      throw new Exception(error.message, error.status);
    }


  }

  //utils
  public async findById(id) {

    try {
      let user = await User.query()
        .where('id', id)
        .from('users')
        .select('id', 'email', 'profile', 'created_at', 'updated_at')
        .firstOrFail()

      return user;

    } catch (error) {
      throw new Exception(error.message, error.status);
    }

  }

  public static async createFromAuth(data) {

    return await User.create({
      email: data.email,
      password: data.password,
    });
  }

  public static async findByEmail(email) {

    const user = await User.findByOrFail('email', email);

    return user;
  }
}
