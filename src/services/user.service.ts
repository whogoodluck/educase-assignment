import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma'
import { JWTPayload } from '../middlewares/auth.middleware'
import { SignupInput } from '../schemas/user.schema'
import config from '../utils/config'

async function hashPassword(password: string) {
  const saltRounds = 10

  return await bcrypt.hash(password, saltRounds)
}

async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}

function signToken(data: JWTPayload) {
  const token = jwt.sign(data, config.JWT_SECRET!, {
    expiresIn: '7d',
  })

  return token
}

function verifyToken(token: string) {
  const decoded = jwt.verify(token, config.JWT_SECRET!) as JWTPayload

  return decoded
}

async function createNewUser(data: SignupInput) {
  return await prisma.user.create({
    data: data,
    omit: {
      password: true,
    },
  })
}

async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
}

export default {
  hashPassword,
  verifyPassword,
  signToken,
  verifyToken,
  createNewUser,
  getUserByEmail,
}
