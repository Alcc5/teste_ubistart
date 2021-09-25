import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UsersController from './UsersController';

const BCRYPT_SALT_ROUNDS = 12;

export default class AuthController {

    public async signIn({ request }: HttpContextContract) {
        let data = request.only(['email', 'password']);

        if (data.email.includes('@')) {
            data.email = data.email.toLowerCase();
            let user = await UsersController.findByEmail(data.email);

            const passwordsMatch = await bcrypt.compare(
                data.password,
                user.password,
            );

            if (passwordsMatch == true) {
                const token = jwt.sign(
                    { id: user.id },
                    process.env.AUTH_JWT_SECRET,
                    { expiresIn: process.env.AUTH_JWT_EXPIRES_IN },
                );

                return token;
            }

        }

    }

    public async signUp({ request }: HttpContextContract) {
        let data = request.only(['email', 'password']);

        if (data.email.includes('@')) {
            data.email = data.email.toLowerCase();
        }

        const hashedPassword = await bcrypt.hash(
            data.password,
            BCRYPT_SALT_ROUNDS,
        );

        data.password = hashedPassword;

        let user = await UsersController.createFromAuth(data);

        const token = jwt.sign(
            { id: user.id },
            process.env.AUTH_JWT_SECRET,
            { expiresIn: process.env.AUTH_JWT_EXPIRES_IN },
        );

        return token;
    }

    //utils

    public static async findByToken(token) {
        let decoded = await jwt.verify(
            token,
            process.env.AUTH_JWT_SECRET,
        );

        const user = await UsersController.prototype.findById(decoded.id);

        return user.$attributes;
    }

}
