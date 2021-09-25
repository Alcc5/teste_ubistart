import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    let filter = request.qs().filter || undefined;

    let page = request.qs().page || 1;
    let limit = request.qs().limit || 10;

    const record = await User.query()
      .where((builder) => {
        if (filter) {
          if (filter.name) {
            builder.where('name', 'like', `%${filter.name}%`);
          }
        }
      })
      .from('users')
      .select('*')
      .paginate(page, limit)
    return record;
  }

  public async store({ request }: HttpContextContract) {

    const data = request.only(['email', 'password']);

    return await User.create({
      email: data.email,
      password: data.password,
    });
  }

  public async show({ request }: HttpContextContract) {
    const id = request.params().id;

    let user = await this.findById(id);
    return user;
  }

  public async update({ request }: HttpContextContract) {
    const id = request.params().id;
    const data = request.only(['password']);

    let record = await this.findById(id);

    record = await record
      .merge({
        password: data.password,
      })
      .save()

    return record;
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.params().id;

    const record = await this.findById(id);

    await record.delete();

    return response.json(
      {
        message: "User deleted"
      });
  }

  //utils
  public async findById(id) {

    let user = await User.query()
    .where('id', id)
    .from('users')
    .select('id','email','profile', 'created_at')
    .firstOrFail()
    
    return user;
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

  /* public static async findPassword(hashedPassword) {

    const user = await User.findByOrFail('password', hashedPassword);

    return user.password;
  } */
}
