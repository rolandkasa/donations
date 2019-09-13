import * as mongoose from 'mongoose';

export default class MongoHelper {
    private db;

    constructor() {
    }

    public connect(url: string): Promise<void> {
        mongoose.connect(url, { useNewUrlParser: true })
        return mongoose.createConnection(url, { useNewUrlParser: true }).then((db) => {
            this.db = db
            return Promise.resolve()
        })
            .catch((error) => {
                console.log(error.message)
                return Promise.reject()
            })

    };

    public getDB() {
        return this.db
    }
}