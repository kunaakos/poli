/**
 * Instead of adhering to a spec like JSON:API, API responses can be designed in
 * a simple and efficient way, and declared as seen in the union type below.
 * A valid API response is a combination of the return type of the body
 * and an appropriate http status code.
 * A set of utility functions can be declared to ensure correct responses,
 * as seen in `expressResponders.ts` - but those don't belong here.
 *
 * TODO: zod schemas, not writing them to save time, but they would be very
 * useful on the client side and in tests.
 */

export type ApiResponse<PayloadType> = OkApiResponse<PayloadType> | ClientErrorApiResponse | ServerErrorApiResponse

export type OkApiResponse<PayloadType> = {
    type: 'OkApiResponse'
    data: PayloadType
}

export type ClientErrorApiResponse = {
    type: 'ClientErrorApiResponse'
    message: string
}

export type ServerErrorApiResponse = {
    type: 'ServerErrorApiResponse'
    message: string
}
