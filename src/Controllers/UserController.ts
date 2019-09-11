import { Request, Response } from 'express';
import FormatResponse from '../Utils/FormatResponse';
import User from '../Models/MongooseModels/UserSchema'
import {generate} from 'password-hash';
import passport from '../UserAuthenticators/LocalStrategy'
import RequestInterface from '../Interfaces/RequestInterface'

export class UserController{
    /**
     * POST /user
     * Register new user.
     */
    public async registerUser(req: Request, res: Response): Promise<Response> {
        let user = new User(req.body)

        try{
            user.password = generate(user.password)
            const persistedUser = await user.save();
            return res.json(FormatResponse.transform(persistedUser,200))
        }catch(error){
            return res.json(FormatResponse.transform(error,500))
        }
    }

    /**
     * GET /user
     * Get all users.
     */
    public async getUsers(req: RequestInterface, res: Response): Promise<Response>{
        try{
            return res.json(FormatResponse.transform(await User.find(), 200))
        }catch(error){
            return res.json(FormatResponse.transform(error,500))
        }
    }

    /**
     * POST /login
     * Sign in using email and password.
     */
    public postLogin (req: RequestInterface, res: Response,next ){
        passport.authenticate("local",  { failureRedirect: '/login' }, (err: Error, user, info) => {
            if (err) { 
                return res.json(FormatResponse.transform(err,500))
            }
            if (!user) {
                return res.json(FormatResponse.transform(new Error('Email or password incorrect.'),403))
            }
            req.logIn(user, (err) => {
                if (err) { 
                    return res.json(FormatResponse.transform(err,500))
                }

                return res.send(FormatResponse.transform(user,200))
            });
        })(req, res, next);
    };

    public async logout (req: RequestInterface, res: Response,) : Promise<Response>{
        await req.logout()
        return res.send(FormatResponse.transform("Successfull logout!",200))
    }
}
