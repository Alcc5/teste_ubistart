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
      if(new Date(e.deadline) < new Date()){
        e.message = 'atrasada'
      }
    })

    return record;
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['description', 'deadline']);

    return await Todo.create({
      description: data.description,
      deadline: data.deadline,
      userId: request.qs().user,
    });

  }

  public async show({ request }: HttpContextContract) {
    const id = request.params().id;

    let todo = await this.findById(id);
    return todo;
  }

  public async update({ request }: HttpContextContract) {
    const id = request.params().id;
    let record = await this.findById(id);

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
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.params().id;

    const record = await this.findById(id);

    await record.delete();

    return response.json(
      {
        message: "Todo deleted"
      });
  }

  public async findById(id) {

    let todo = await Todo.findOrFail(id);
    return todo;
  }
}
