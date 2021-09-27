import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@poppinss/utils';
import moment from 'moment';
import Todo from 'App/Models/Todo';

export default class TodosController {
  public async index({ request }: HttpContextContract) {

    const currentRequest = request.qs();

    if (request.qs().currentUser.profile == 'user') {
      currentRequest.user = request.qs().currentUser.id;
      request.updateQs(currentRequest);
    }

    let filter = request.qs().filter || undefined;
    let user = request.qs().user || undefined;
    let page = request.qs().page || 1;
    let limit = request.qs().limit || 10;

    try {

      const query = await Todo.query()
        .where((builder) => {
          if (filter) {
            if (filter.atrasadas) {
              let data: any = new Date();
              data = moment(data).format('YYYY-MM-DD HH:mm');
              builder.whereRaw(`todos.closed_at IS NULL AND todos.deadline < '${data}'`);
            }
          }
          if (user) {
            builder.where('userId', `${user}`);
          }
        })
        .from('todos')
        .joinRaw('JOIN users ON todos.user_id = users.id')
        .select('todos.*', 'users.email')
        .paginate(page, limit)

      let record = query.serialize();

      record.data.map(e => {
        if (new Date(e.deadline) < new Date()) {
          e.message = 'Atrasada';
        }
      })

      return record;

    } catch (error) {
      throw new Exception(error.message, error.status);
    }
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['description', 'deadline']);

    try {

      return await Todo.create({
        description: data.description,
        deadline: data.deadline,
        userId: request.qs().currentUser.id,
      });

    } catch (error) {
      throw new Exception(error.message, error.status);
    }


  }

  public async show({ request }: HttpContextContract) {
    const id = request.params().id;
    let user;

    try {

      if (request.qs().currentUser.profile == 'user') {
        user = request.qs().currentUser.id;
      }

      let todo = await this.findById(id, user);

      return todo;

    } catch (error) {
      throw new Exception(error.message, error.status);
    }
  }

  public async update({ request }: HttpContextContract) {
    const id = request.params().id;

    try {

      //Só pode alterar TODOs do próprio user
      let user = request.qs().currentUser.id;

      let record = await this.findById(id, user);

      if (record.closedAt != null) {
        throw new Exception('Não é possível alterar uma tarefa fechada', 400);
      }

      const data = request.only(['description', 'deadline', 'close']);

      if (data.close) {
        data.close = new Date();
      }

      record = await record
        .merge({
          description: data.description,
          deadline: data.deadline,
          closedAt: data.close || null,
        })
        .save()

      return record;

    } catch (error) {
      throw new Exception(error.message, error.status);
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.params().id;

    try {
      //Só pode deletar TODOs do próprio user
      let user = request.qs().currentUser.id;

      const record = await this.findById(id, user);

      await record.delete();

      return response.json(
        {
          message: "Todo deleted"
        });

    } catch (error) {
      throw new Exception(error.message, error.status);
    }


  }

  public async findById(id, user?) {

    try {

      let todo = await Todo.query()
        .where((builder) => {
          builder.where('id', '=', `${id}`);

          if (user) {
            builder.where('userId', '=', `${user}`);
          }
        })
        .from('todos')
        .select('id', 'description', 'deadline', 'closed_at', 'created_at', 'updated_at')
        .firstOrFail()

      return todo;

    } catch (error) {
      throw new Exception(error.message, error.status);
    }

  }
}
