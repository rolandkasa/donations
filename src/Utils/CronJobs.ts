import {schedule} from 'node-cron'
import Donation from '../Models/MongooseModels/DonationSchema'
import * as moment from 'moment'
import User from '../Models/MongooseModels/UserSchema'

export interface CronInterface{
    startDev(): void,
    startProd(): void
}

export class CronJob implements CronInterface{
    public startDev(): void {
        this.sendMessages()
    }

    public startProd(): void {
        this.sendMessages()
    }

    private sendMessages(){
        schedule("* * * 1 * *", async () => {
            let from = moment().subtract(30, 'days').toDate()
            let donations = await Donation.aggregate([
                {$match: {
                    createdAt: {$gte: from}
                }},
                {
                    $project: {
                        amount: {$sum: "$amount"},
                        user: "$user"
                    }
                },
                {$group: {
                    _id: "$user",
                    amount: {$sum: "$amount"}
                }}
            ])

            const populationPromises = donations.map(don => Donation.populate(don,{path: '_id', model: User}))
            donations = await Promise.all(populationPromises)

            donations = donations.filter(don => don._id !== null).map((don) => {
                don._id = don._id.email
                return don
            })

            console.log(donations)
        })
    }
}