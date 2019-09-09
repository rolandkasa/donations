import {Request, Response} from "express";
import FormatResponse from "../Utils/FormatResponse";
import {ContactController} from '../Controllers/ContactController'

export class BaseRoutes {     
    public contactController: ContactController = new ContactController();
    
    public routes(app): void {

        app.route('/')
        .get((req: Request, res: Response) => {         
            let response = FormatResponse.transform('GET request successfulll!!!!', 200)
            res.status(200).send(response)
        })
        
        app.route('/contact') 
        .get(this.contactController.getContacts)        
        .post(this.contactController.addNewContact)

        app.route('/contact/:contactId')
        .get((req: Request, res: Response) => {
            let response = FormatResponse.transform('GET request successfulll!!!!', 200)
            res.status(200).send(response)
        })
        .put((req: Request, res: Response) => {
            let response = FormatResponse.transform('GET request successfulll!!!!', 200)
            res.status(200).send(response)
        })
        .delete((req: Request, res: Response) => {       
            let response = FormatResponse.transform('GET request successfulll!!!!', 200)
            res.status(200).send(response)
        })              
    }
}