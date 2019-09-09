import * as express from "express";
import * as bodyParser from "body-parser";
import { BaseRoutes } from "./Routes/BaseRoutes";
import MongoHelper from './Utils/MongoHelper'

class App {

    public app: express.Application;
    public baseRoutes: BaseRoutes = new BaseRoutes();

    constructor() {
        this.app = express();
        this.config();   
        this.baseRoutes.routes(this.app)
    }

    private config(): void{
        this.connectToDB();

        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));   
    }

    private connectToDB(): void{
        MongoHelper.connect('mongodb://localhost:27017/donations')
    }
}

export default new App().app;