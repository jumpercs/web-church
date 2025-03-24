import { HttpStatusCode } from 'axios'

import { HttpError } from './http_error'

export class HttpNotFoundError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCode.NotFound)
  }
}
