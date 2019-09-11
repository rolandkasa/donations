import { Request, Response } from 'express';
import FormatResponse from '../Utils/FormatResponse';
import Donation from '../Models/MongooseModels/DonationSchema'
import RequestInterface from '../Interfaces/RequestInterface'

export class DonationsController{
    public async findAllDonations ( req: Request, res: Response ): Promise<Response>{
        try{
            const donations = await Donation.find().populate('user')
            return res.json(FormatResponse.transform(donations,200))
        }catch(error){
            return res.json(FormatResponse.transform(error,500))
        }
    }

    public async getMyDonations ( req: RequestInterface, res: Response ): Promise<Response>{
        try{
            const donations = await Donation.find({_id: req.user._id})
            return res.json(FormatResponse.transform(donations,200))
        }catch(error){
            return res.json(FormatResponse.transform(error,500))
        }

    }

    public async addNewDonation ( req: RequestInterface, res: Response ): Promise<Response> {
        try{
            const donation = new Donation(req.body)
            const persistedDonation = await donation.save()
            return res.json(FormatResponse.transform(persistedDonation,200))
        }catch(error){
            return res.json(FormatResponse.transform(error,500))
        }   
    }

    public async updateDonation ( req: RequestInterface, res: Response ): Promise<Response> {
        try{
            const updatedDonation = await Donation.update({ _id: req.params.id, user: req.user._id}, req.body)
            return res.json(FormatResponse.transform(updatedDonation,200))
        }catch(error){
            return res.json(FormatResponse.transform(error,500))
        }
    }

    public async deleteDonation ( req: RequestInterface, res: Response ): Promise<Response> {
        try{
            const result = await Donation.deleteOne({_id: req.params.id, user: req.user._id})
            return res.json(FormatResponse.transform(
                result.deletedCount > 0 ? "The requested donation was removed" : "The requested donation was not found." ,
                result.deletedCount > 0 ? 200 : 404)
                )
        }catch(error){
            return res.json(FormatResponse.transform(error,500))
        }
    }
}