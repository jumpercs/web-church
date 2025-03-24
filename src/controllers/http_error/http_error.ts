export class HttpError extends Error {
  constructor(message: string, statusCode: number, body: unknown = undefined) {
    super(message)
    this.statusCode = statusCode
    this.body = body
  }

  statusCode: number
  body?: any
}
