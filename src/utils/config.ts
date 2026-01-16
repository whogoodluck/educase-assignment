import { config } from 'dotenv'

config()

const PORT = process.env.PORT || 3001

const DATABASE_URL = process.env.DATABASE_URL
const DEV_DATABASE_URL = process.env.DEV_DATABASE_URL

export default {
  PORT,
  DATABASE_URL,
  DEV_DATABASE_URL,
}
