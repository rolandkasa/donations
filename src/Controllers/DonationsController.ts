import { Request, Response } from 'express';
import Donation from '../Models/MongooseModels/DonationSchema'
import RequestInterface from '../Interfaces/RequestInterface'
import ResponseInterface from '../Interfaces/ResponseInterface'

export class DonationsController{
    public async findAllDonations ( req: Request, res: ResponseInterface ): Promise<ResponseInterface>{
        try{
            let donations = await Donation.find().populate('user')
            donations = donations.filter(don => don.user !== null)
            return res.handleSuccess(donations)
        }catch(error){
            return res.handleError(error)
        }
    }

    public async getMyDonations ( req: RequestInterface, res: ResponseInterface ): Promise<ResponseInterface>{
        try{
            const donations = await Donation.find({_id: req.user._id})
            return res.handleSuccess(donations)
        }catch(error){
            return res.handleError(error)
        }

    }

    public async addNewDonation ( req: RequestInterface, res: ResponseInterface ): Promise<ResponseInterface> {
        try{
            const donation = new Donation(req.body)
            const persistedDonation = await donation.save()
            return res.handleSuccess(persistedDonation)
        }catch(error){
            return res.handleError(error)
        }   
    }

    public async updateDonation ( req: RequestInterface, res: ResponseInterface ): Promise<ResponseInterface> {
        try{
            const updatedDonation = await Donation.update({ _id: req.params.id, user: req.user._id}, req.body)
            return res.handleSuccess(updatedDonation)
        }catch(error){
            return res.handleError(error)
        }
    }

    public async deleteDonation ( req: RequestInterface, res: ResponseInterface ): Promise<ResponseInterface> {
        try{
            const result = await Donation.deleteOne({_id: req.params.id, user: req.user._id})
            return res.handleSuccess(result.deletedCount > 0 ? "The requested donation was removed" : "The requested donation was not found.")
        }catch(error){
            return res.handleError(error)
        }
    }
}