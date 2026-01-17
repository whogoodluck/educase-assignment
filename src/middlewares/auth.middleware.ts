import { NextFunction, Request, Response } from 'express'
import userService from '../services/user.service'
import { HttpError } from '../utils/http-error'

export interface JWTPayload {
  id: string
  email: string
}

export interface AuthRequest extends Request {
  user?: JWTPayload
}

export async function authenticate(req: AuthRequest, _res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token

    if (!token) {
      throw new HttpError(401, 'Authentication required')
    }

    const decoded = userService.verifyToken(token)
    req.user = decoded

    next()
  } catch (err) {
    next(err)
  }
}
