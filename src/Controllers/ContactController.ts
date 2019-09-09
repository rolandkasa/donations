import { Request, Response } from 'express';
import FormatResponse from '../Utils/FormatResponse';
import Contact from '../Models/MongooseModels/ContactSchema'

export class ContactController{
    public async addNewContact (req: Request, res: Response) {                
        try{
            let newContact = new Contact(req.body);
            let persistedContract = await newContact.save()
            
            return res.json(FormatResponse.transform(persistedContract,200))
        }catch(error){
            return res.json(FormatResponse.transform(error,500))
        }
    }

    public async getContacts ( req:Request, res:Response ){
        try{
            let contacts = await Contact.find()
            return res.json(FormatResponse.transform(contacts,200))
        }catch(error){
            return res.json(FormatResponse.transform(error,500))
        }
    }
}