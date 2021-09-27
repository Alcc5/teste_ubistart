import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UsersController from './UsersController';
import { Exception } from '@poppinss/utils';

const BCRYPT_SALT_ROUNDS = 12;

export default class AuthController {

    public async signIn({ request }: HttpContextContract) {
        let data = request.only(['email', 'password']);

        const isValidEmail = await AuthController.validateEmail(data.email);

        if (isValidEmail === true) {

            try {
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

                else {
                    throw new Exception('Incorrect email or password', 400);
                }
            }

            catch (error) {
                throw new Exception('Incorrect email or password', 400);
            }

        }

        else {
            throw new Exception('Invalid email', 400);
        }

    }

    public async signUp({ request }: HttpContextContract) {
        let data = request.only(['email', 'password']);

        const isValidEmail = await AuthController.validateEmail(data.email);

        if (isValidEmail === true) {
            try {

                data.email = data.email.toLowerCase();

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

            } catch (error) {
                throw new Exception(error.message, error.status);
            }
        }

        else {
            throw new Exception('Invalid email', 400);
        }
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

    public static async validateEmail(email) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return regex.test((email).toLowerCase());
    }

}
