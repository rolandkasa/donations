import {check, ValidationChain} from 'express-validator'

export class DonationValidator{
    public static post:Array<ValidationChain> = [
        check('user').optional().isString().withMessage("Must be an ObjectId."),
        check('amount').optional().isNumeric().withMessage("Must be a number.")
    ]

    public static patch:Array<ValidationChain> = [
        check('id').isString(),
        check('user').optional().isString().withMessage("Must be an ObjectId."),
        check('amount').optional().isNumeric().withMessage("Must be a number.")
    ]

}