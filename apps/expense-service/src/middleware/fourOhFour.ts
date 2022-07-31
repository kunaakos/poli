import { Request, Response } from 'express'

import { respondWithClientError } from '../util/expressResponders'

export const fourOhFourMiddleware = (request: Request, response: Response) => {
    respondWithClientError({ response, statusCode: 404, error: new Error('Not found.') })
}
