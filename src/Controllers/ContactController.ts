import { Request, Response } from 'express';
import Contact from '../Models/MongooseModels/ContactSchema'
import ResponseInterface from '../Interfaces/ResponseInterface'

export class ContactController{
    public async addNewContact (req: Request, res: ResponseInterface): Promise<ResponseInterface> {                
        try{
            let newContact = new Contact(req.body);
            let persistedContract = await newContact.save()
            return res.handleSuccess(persistedContract);
        }catch(error){
            return res.handleError(error)
        }
    }

    public async getContacts ( req:Request, res:ResponseInterface ): Promise<ResponseInterface>{
        try{
            let contacts = await Contact.find()
            return res.handleSuccess(contacts)
        }catch(error){
            return res.handleError(error)
        }
    }

    public async deleteContact (req:Request, res:ResponseInterface): Promise<ResponseInterface>{
        try{
            const result = await Contact.deleteOne({_id: req.params.id})
            res.handleSuccess(result)
        }catch(error){
            return res.handleError(error)
        }
    }
}