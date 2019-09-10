import { Request, Response } from 'express';
import FormatResponse from '../Utils/FormatResponse';
import User from '../Models/MongooseModels/UserSchema'
import {generate} from 'password-hash';
import passport from '../UserAuthenticators/LocalStrategy'

export class UserController{
    public async registerUser(req: Request, res: Response){
        let user = new User(req.body)

        try{
            user.password = generate(user.password)
            const persistedUser = await user.save();
            return res.json(FormatResponse.transform(persistedUser,200))
        }catch(error){
            return res.json(FormatResponse.transform(error,500))
        }
    }

    public async getUsers(req, res){
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
    public postLogin (req, res: Response,next) {
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
                return res.send(FormatResponse.transform(req.session,200))
            });
        })(req, res, next);
    };
}
