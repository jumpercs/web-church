import { HttpStatusCode } from 'axios'
import { ZodError } from 'zod'

import { HttpError } from './http_error'

export class QueryParseZodHttpError extends HttpError {
  constructor(error: ZodError) {
    const errorMessage = 'Error validating query parameters'

    super(errorMessage, HttpStatusCode.BadRequest, {
      message: errorMessage,
      errors: error.errors.map((zodError) => {
        return {
          path: zodError.path.join('.'),
          error: zodError.message
        }
      })
    })
  }
}
