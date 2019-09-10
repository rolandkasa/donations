import {Request, Response} from "express";
import FormatResponse from "../Utils/FormatResponse";
import {ContactController} from '../Controllers/ContactController'
import { UserController } from "../Controllers/UserController";

import Contact from '../Models/MongooseModels/ContactSchema'
import User from '../Models/MongooseModels/UserSchema'

export class BaseRoutes {     
    public contactController: ContactController = new ContactController();
    public userController: UserController = new UserController();
    
    public routes(app): void {

        app.route('/contact') 
            .get(this.contactController.getContacts)        
            .post(this.contactController.addNewContact)

        app.route('/user') 
            .get(this.userController.getUsers)        
            .post(this.userController.registerUser)

        app.route('/login')
            .post(this.userController.postLogin);
    }
}