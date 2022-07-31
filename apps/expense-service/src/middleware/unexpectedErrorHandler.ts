import { NextFunction, Request, Response } from 'express'

import { respondWithServerError } from '../util/expressResponders'

export const unexpectedErrorHandlerMiddleware = (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    respondWithServerError({ response, error: new Error('Unexpected server error.') })
}
