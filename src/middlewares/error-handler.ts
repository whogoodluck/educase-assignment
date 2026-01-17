import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { Prisma } from '../generated/prisma/client'
import { HttpError } from '../utils/http-error'

interface ErrorResponse {
  message: string
  errors?: any
  stack?: string
}

function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error('Error:', err)

  // Handle custom HttpError
  if (err instanceof HttpError) {
    const response: ErrorResponse = {
      message: err.message,
    }

    if (process.env.NODE_ENV === 'development') {
      response.stack = err.stack
    }

    return res.status(err.statusCode).json(response)
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const errors = err.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message,
    }))

    return res.status(400).json({
      message: 'Validation error',
      errors,
    })
  }

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (err.code === 'P2002') {
      const field = (err.meta?.target as string[])?.join(', ') || 'field'
      return res.status(409).json({
        message: `A record with this ${field} already exists`,
      })
    }

    // Record not found
    if (err.code === 'P2025') {
      return res.status(404).json({
        message: 'Record not found',
      })
    }

    // Foreign key constraint failed
    if (err.code === 'P2003') {
      return res.status(400).json({
        message: 'Invalid reference in request',
      })
    }
  }

  // Handle Prisma validation errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      message: 'Invalid data provided',
    })
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token',
    })
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expired',
    })
  }

  // Default error response
  const response: ErrorResponse = {
    message: 'Internal server error',
  }

  if (process.env.NODE_ENV === 'development') {
    response.message = err.message
    response.stack = err.stack
  }

  return res.status(500).json(response)
}

export default errorHandler
