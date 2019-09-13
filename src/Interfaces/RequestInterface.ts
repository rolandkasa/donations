import { Request } from 'express'
import { UserInterface } from '../Models/MongooseModels/UserSchema'

export default interface RequestInterface extends Request {
    user: UserInterface;
    isAuthenticated(): boolean;
    logIn(user: UserInterface, cb: Function): Promise<void>;
    logout(): Promise<void>
}