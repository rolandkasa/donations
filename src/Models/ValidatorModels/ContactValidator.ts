import { check, ValidationChain } from 'express-validator'

export class ContactValidator {
    public static post: Array<ValidationChain> = [
        check('firstName').isString().withMessage('Fist name must be a string').isLength({ min: 2 }).withMessage('First name length must be at least 2 characters long.'),
        check('lastName').isString().withMessage('Last name must be a string').isLength({ min: 2 }).withMessage('Last name length must be at least 2 characters long.'),
        check('email').isEmail().withMessage("Email not valid. Please enter a valid email."),
        check('company').optional().isString().withMessage('Company must be a string.'),
        check('phone').optional().isMobilePhone('ro-RO').withMessage("Phone number not valid, please enter a valid phone number")
    ]
}