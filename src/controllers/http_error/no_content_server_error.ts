import { HttpStatusCode } from 'axios'

import { HttpError } from './http_error'

export class NoContentServerError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCode.NoContent)
  }
}
