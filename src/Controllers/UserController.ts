import { Request, Response } from 'express';
import User from '../Models/MongooseModels/UserSchema'
import { generate } from 'password-hash';
import passport from '../UserAuthenticators/LocalStrategy'
import RequestInterface from '../Interfaces/RequestInterface'
import ResponseInterface from '../Interfaces/ResponseInterface'

export class UserController {
    /**
     * POST /user
     * Register new user.
     */
    public async registerUser(req: Request, res: ResponseInterface): Promise<Response> {
        let user = new User(req.body)

        try {
            user.password = generate(user.password)
            const persistedUser = await user.save();
            return res.handleSuccess(persistedUser)
        } catch (error) {
            return res.handleError(error)
        }
    }

    /**
     * GET /user
     * Get all users.
     */
    public async getUsers(req: RequestInterface, res: ResponseInterface): Promise<ResponseInterface> {
        try {
            return res.handleSuccess(await User.find())
        } catch (error) {
            return res.handleError(error)
        }
    }

    /**
     * POST /login
     * Sign in using email and password.
     */
    public postLogin(req: RequestInterface, res: ResponseInterface, next) {
        passport.authenticate("local", { failureRedirect: '/login' }, (err: Error, user, info) => {
            if (err) {
                return res.handleError(err)
            }
            if (!user) {
                return res.handleError(new Error('Email or password incorrect.'))
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.handleError(err)
                }

                return res.handleSuccess(user)
            });
        })(req, res, next);
    };

    public async logout(req: RequestInterface, res: ResponseInterface, ): Promise<ResponseInterface> {
        await req.logout()
        return res.handleSuccess({ action: "Successfull logout!" });
    }

    public isAuthorized(req: RequestInterface, res: ResponseInterface): ResponseInterface {
        return res.handleSuccess(req.user)
    }
}
