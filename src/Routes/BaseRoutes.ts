//General imports
import {Request, Response, Application} from "express";
import FormatResponse from "../Utils/FormatResponse";
import {ContactController} from '../Controllers/ContactController'
import { UserController } from "../Controllers/UserController";
import { DonationsController } from "../Controllers/DonationsController";
import {AuthorizationChecker, AuthorizationCheckerInterface} from '../Middlewares/AuthorizationChecker'
import Validator from '../Middlewares/Validator'

//validators
import {UserValidator} from '../Models/ValidatorModels/UserValidator'

//Models
import Contact from '../Models/MongooseModels/ContactSchema'
import User from '../Models/MongooseModels/UserSchema'
import Donation from '../Models/MongooseModels/DonationSchema'
import RequestInterface from "Interfaces/RequestInterface";
import ResponseInterface from "Interfaces/ResponseInterface";


export class BaseRoutes {     
    public contactController: ContactController = new ContactController();
    public userController: UserController = new UserController();
    public donationsController: DonationsController = new DonationsController();
    public authorizationChecker: AuthorizationCheckerInterface = new AuthorizationChecker();
    public validator: Validator = new Validator();
    
    public routes(app: Application): void {

        app.route('/contact') 
            .get(this.responseAdditions, this.contactController.getContacts)        
            .post(this.authorizationChecker.isAuthorized, this.responseAdditions, this.contactController.addNewContact)

        app.route('/user') 
            .get(this.authorizationChecker.isAuthorized, this.responseAdditions, this.userController.getUsers)        
            .post(this.responseAdditions, UserValidator.post, this.validator.validate ,this.userController.registerUser)

        app.route('/login')
            .post(this.responseAdditions, UserValidator.login, this.validator.validate, this.userController.postLogin);

        app.route('/logout')
            .get(this.responseAdditions, this.userController.logout);

        app.route('/donations').get(this.responseAdditions, this.donationsController.findAllDonations)
        app.route('/donate').post(this.authorizationChecker.isAuthorized, this.responseAdditions, this.donationsController.addNewDonation)
        app.route('/donation/:id')
            .patch(this.authorizationChecker.isAuthorized, this.responseAdditions, this.donationsController.updateDonation)
            .delete(this.authorizationChecker.isAuthorized, this.responseAdditions, this.donationsController.deleteDonation)
    }

    private responseAdditions(req: RequestInterface, res: ResponseInterface, next: Function): void{
        res.handleSuccess = (payload: Object) => {
            return res.status(200).send(FormatResponse.transform(payload,200))
        }
        res.handleError = (error: Object) => {
            return res.status(500).send(FormatResponse.transform(error, 500))
        }

        return next()
    }

}