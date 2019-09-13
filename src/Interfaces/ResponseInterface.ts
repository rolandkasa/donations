import { Response } from 'express'

export default interface ResponseInterface extends Response {
    handleSuccess(payload: Object): any
    handleError(error: Object): any
}