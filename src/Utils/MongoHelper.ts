import * as mongoose from 'mongoose';

export default class MongoHelper {
    constructor() {
    }

    public static connect(url: string): void {
        mongoose.connect(url,{  useNewUrlParser: true });
    };
}