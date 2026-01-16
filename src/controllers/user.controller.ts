import { NextFunction, Request, Response } from 'express'
import { AuthRequest } from '../middlewares/auth.middleware'
import { signinSchema, signupSchema } from '../schemas/user.schema'
import userService from '../services/user.service'
import { HttpError } from '../utils/http-error'

async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = signupSchema.parse(req.body)

    const existingUser = await userService.getUserByEmail(validatedData.email)
    if (existingUser) {
      throw new HttpError(409, 'User with this email already exists')
    }

    const hashedPassword = await userService.hashPassword(validatedData.password)

    const newUser = await userService.createNewUser({
      ...validatedData,
      password: hashedPassword,
    })

    const token = userService.signToken({
      id: newUser.id,
      email: newUser.email,
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    })
  } catch (err) {
    next(err)
  }
}

async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = signinSchema.parse(req.body)

    const user = await userService.getUserByEmail(validatedData.email)
    if (!user) {
      throw new HttpError(401, 'Invalid email or password')
    }

    const isPasswordValid = await userService.verifyPassword(validatedData.password, user.password)
    if (!isPasswordValid) {
      throw new HttpError(401, 'Invalid email or password')
    }

    const token = userService.signToken({
      id: user.id,
      email: user.email,
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    const { password, ...userWithoutPassword } = user

    res.status(200).json({
      message: 'Signin successful',
      user: userWithoutPassword,
    })
  } catch (err) {
    next(err)
  }
}

async function me(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const email = req.user!.email

    const user = await userService.getUserByEmail(email)

    if (!user) {
      throw new HttpError(404, 'User not found')
    }

    const { password, ...userWithoutPassword } = user

    res.status(200).json({
      message: 'Me successful',
      user,
    })
  } catch (err) {
    next(err)
  }
}

async function logout(_req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    res.status(200).json({
      message: 'Logout successful',
    })
  } catch (err) {
    next(err)
  }
}

export default {
  signup,
  signin,
  me,
  logout,
}
