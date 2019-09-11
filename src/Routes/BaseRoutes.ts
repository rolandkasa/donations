//General imports
import {Request, Response} from "express";
import FormatResponse from "../Utils/FormatResponse";
import {ContactController} from '../Controllers/ContactController'
import { UserController } from "../Controllers/UserController";
import { DonationsController } from "../Controllers/DonationsController";
import {AuthorizationChecker, AuthorizationCheckerInterface} from '../Middlewares/AuthorizationChecker'

//Models
import Contact from '../Models/MongooseModels/ContactSchema'
import User from '../Models/MongooseModels/UserSchema'
import Donation from '../Models/MongooseModels/DonationSchema'


export class BaseRoutes {     
    public contactController: ContactController = new ContactController();
    public userController: UserController = new UserController();
    public donationsController: DonationsController = new DonationsController();
    public authorizationChecker: AuthorizationCheckerInterface = new AuthorizationChecker();
    
    public routes(app): void {

        app.route('/contact') 
            .get(this.contactController.getContacts)        
            .post(this.authorizationChecker.isAuthorized, this.contactController.addNewContact)

        app.route('/user') 
            .get(this.authorizationChecker.isAuthorized, this.userController.getUsers)        
            .post(this.userController.registerUser)

        app.route('/login')
            .post(this.userController.postLogin);

        app.route('/logout')
            .get(this.userController.logout);

        app.route('/donations').get(this.donationsController.findAllDonations)
        app.route('/donate').post(this.authorizationChecker.isAuthorized, this.donationsController.addNewDonation)
        app.route('/donation/:id')
            .patch(this.authorizationChecker.isAuthorized, this.donationsController.updateDonation)
            .delete(this.authorizationChecker.isAuthorized, this.donationsController.deleteDonation)
    }
}