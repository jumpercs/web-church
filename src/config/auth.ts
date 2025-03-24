 
 



import { HttpRequest } from '@/controllers/base/http_request'
import { HttpUnauthorizedError } from '@/controllers/http_error'


export const expressAuthentication = async (
  request: HttpRequest
): Promise<void> => {
  const token = request.headers.authorization

  if (!token) {
    throw new HttpUnauthorizedError('Authorization header is required')
  }
}
