import { HttpStatusCode } from 'axios'

import { HttpError } from './http_error'

export class HttpUnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCode.Unauthorized)
  }
}
