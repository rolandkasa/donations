import {Request,NextFunction} from 'express'
import {validationResult, ResultFactory, ValidationError,Result,Location} from 'express-validator'
import ResponseInterface from '../Interfaces/ResponseInterface'

export default class Validator{
    public validate(req: Request, res: ResponseInterface, next: NextFunction){
        const errors:Result<string> = validationResult(req).formatWith(({ location, msg, param}) => {
            return `${msg}`;
          })
        if (!errors.isEmpty()){
            return res.handleError(errors.mapped())
        }
        return next()
    }
}