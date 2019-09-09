import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ContactInterface{
    firstName: String,
    lastName: String,
    email: String,
    company: String,
    phone: Number,
    created_date: Date
}

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String            
    },
    company: {
        type: String            
    },
    phone: {
        type: Number            
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}, {
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__V;
      }
    },
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__V;
      }
    }
});

const mongooseModel = mongoose.model<ContactInterface>('Contact', ContactSchema)
export default mongooseModel