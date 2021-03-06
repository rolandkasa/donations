import * as express from "express";
import * as bodyParser from "body-parser";
import { BaseRoutes } from "./Routes/BaseRoutes";
import MongoHelper from './Utils/MongoHelper'
import * as connectMongo from 'connect-mongo';
import * as ExpressSession from 'express-session'
import * as cookieParser from 'cookie-parser'
import * as passport from 'passport'
import {CronInterface,CronJob} from './Utils/CronJobs'
const cookieSession = require('cookie-session')


class App {

    public app: express.Application;
    public baseRoutes: BaseRoutes = new BaseRoutes();
    public mongoHelper: MongoHelper = new MongoHelper();
    private cronJob: CronInterface = new CronJob();

    constructor() {
        this.app = express();
        this.config();
        this.cronJob.startDev();
    }

    private config(): void {
        this.connectToDB().then(() => {
            this.app.use(express.static('public'));

            // support application/json type post data
            this.app.use(bodyParser.json());
            //support application/x-www-form-urlencoded post data
            this.app.use(bodyParser.urlencoded({ extended: false }));

            this.app.use(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", "http://localhost:3000");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Credentials", "true")
                res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
                next();
            });


            this.app.use(cookieParser())
            this.app.use(cookieSession({
                name: 'session',
                keys: ['donations']
            }))

            const MongoStore = connectMongo(ExpressSession);

            this.app.use(ExpressSession({
                secret: 'donations',
                resave: true,
                saveUninitialized: true,
                unset: 'destroy',
                cookie: {
                    secure: true,
                    maxAge: 6 * 60 * 60 * 1000
                },
                store: new MongoStore({ mongooseConnection: this.mongoHelper.getDB() })
            }));
            this.app.use(passport.initialize());
            this.app.use(passport.session());

            this.baseRoutes.routes(this.app)
        });
    }

    private connectToDB(): Promise<void> {
        return this.mongoHelper.connect('mongodb://localhost:27017/donations')
    }
}

export default new App().app;