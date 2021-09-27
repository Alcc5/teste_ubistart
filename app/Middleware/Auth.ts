import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@poppinss/utils';
import AuthController from 'App/Controllers/Http/AuthController';

export default class Auth {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {

    try {
      const token = request.headers().authorization?.split('Bearer ')[1];

      const currentUser = await AuthController.findByToken(token);

      const currentRequest = request.qs();

      currentRequest.currentUser = currentUser;

      request.updateQs(currentRequest);

    } catch (error) {
      throw new Exception(error.message, error.status);
    }

    await next()
  }
}
