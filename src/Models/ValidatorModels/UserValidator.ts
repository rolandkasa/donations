import { check, ValidationChain } from 'express-validator'

export class UserValidator {
    public static post: Array<ValidationChain> = [
        check('username').isAlphanumeric().withMessage("Must be alphanumeric.").isLength({ min: 5 }).withMessage('Username must be alphanumeric with a minimum of 5 characters'),
        check('email').isEmail().withMessage("Must be email.").isLength({ min: 5 }).withMessage('Email must be alphanumeric with a minimum of 5 characters'),
        check('password').isLength({ min: 5 }).withMessage("Password must be at least 5 characters long.")
    ]

    public static patch: Array<ValidationChain> = [
        check('username').isAlphanumeric().withMessage("Must be alphanumeric.").isLength({ min: 5 }).withMessage('Username must be alphanumeric with a minimum of 5 characters'),
        check('email').isEmail().withMessage("Must be email.").isLength({ min: 5 }).withMessage('Email must be alphanumeric with a minimum of 5 characters'),
        check('password').isLength({ min: 5 }).withMessage("Password must be at least 5 characters long.")
    ]

    public static login: Array<ValidationChain> = [
        check('email').isEmail().withMessage("Must be email.").isLength({ min: 5 }).withMessage('Email must be alphanumeric with a minimum of 5 characters'),
        check('password').isLength({ min: 5 }).withMessage("Password must be at least 5 characters long.")
    ]
}