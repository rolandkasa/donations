import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface UserInterface {
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,
  password: string,
  registeredAt: Date,
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: 'Add username.'
  },
  email: {
    type: String,
    required: 'Add email'
  },
  password: {
    type: String,
    required: 'Add password'
  },
  registeredAt: {
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
      delete ret.password
      delete ret.__V;
    }
  }
});

const User = mongoose.model<UserInterface>('User', UserSchema)
export default User