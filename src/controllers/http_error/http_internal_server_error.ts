import { HttpStatusCode } from 'axios'

import { HttpError } from './http_error'

export class HttpInternalServerError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCode.InternalServerError)
  }
}
