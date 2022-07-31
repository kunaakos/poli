import { Response } from 'express'

import { ClientErrorApiResponse, OkApiResponse, ServerErrorApiResponse } from '@pol/types'

/**
 * A set of typed utility functions that respond with the correct combination of
 * body content data type and http status code.
 * NOTE: these would belong in a separate utils library,
 * I will create one if I have enough time left.
 */

type ResponseParam = {
    response: Response
}

type ErrorParam = {
    error: Error
}

type StatusCodeParam = {
    statusCode?: number
}

type RespondWithClientErrorParams = ResponseParam & ErrorParam & StatusCodeParam

export const respondWithClientError = ({ response, error, statusCode = 400 }: RespondWithClientErrorParams) => {
    const errorResponse: ClientErrorApiResponse = { type: 'ClientErrorApiResponse', message: error.message }
    response.status(statusCode)
    response.json(errorResponse)
}

type WithServerErrorparams = ResponseParam & ErrorParam & StatusCodeParam

export const respondWithServerError = ({ response, error, statusCode = 500 }: WithServerErrorparams) => {
    const errorResponse: ServerErrorApiResponse = { type: 'ServerErrorApiResponse', message: error.message }
    response.status(statusCode)
    response.json(errorResponse)
}

type RespondWithDataParams = ResponseParam & StatusCodeParam
export const respondWithData = <T>({ response, data, statusCode = 200 }: RespondWithDataParams & { data: T }) => {
    const jsonResponse: OkApiResponse<T> = { type: 'OkApiResponse', data }
    response.status(statusCode)
    response.json(jsonResponse)
}
