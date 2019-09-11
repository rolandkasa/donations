import RequestInterface from '../Interfaces/RequestInterface'
import {Response} from 'express'
import FormatResponse from '../Utils/FormatResponse'

export interface AuthorizationCheckerInterface{
    isAuthorized(req: RequestInterface, res: Response, next: Function): Response
}

export class AuthorizationChecker{
    public isAuthorized(req: RequestInterface, res: Response, next: Function): Response {
        if ( req.user && req.isAuthenticated() ){
            return next()
        }

        return res.json(FormatResponse.transform('Forbidden.',403))
    }
}
