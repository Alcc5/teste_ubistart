import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthController from 'App/Controllers/Http/AuthController';

export default class Auth {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {

    const token = request.headers().authorization?.split('Bearer ')[1];

    const currentUser = await AuthController.findByToken(token);

    const currentRequest = request.qs();
    
    currentRequest.currentUser = currentUser;   

    request.updateQs(currentRequest);

    await next()
  }
}
