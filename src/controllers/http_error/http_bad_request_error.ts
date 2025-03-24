import { HttpStatusCode } from 'axios'

import { HttpError } from './http_error'

export class HttpBadRequestError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCode.BadRequest)
  }
}
