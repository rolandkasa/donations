import * as mongoose from 'mongoose';
import {UserInterface} from './UserSchema'

const Schema = mongoose.Schema;

export interface DonationInterface{
    user: UserInterface,
    amount: Number,
    createdAt: Date,
}

const DonationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: 'Add Amount'
    },
    amount: {
        type: Number,
        required: 'Add Amount'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toObject: {
      transform: function (doc, ret) {
        delete ret.__V;
      }
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__V;
      }
    }
});

const Donation = mongoose.model<DonationInterface>('Donation', DonationSchema)
export default Donation