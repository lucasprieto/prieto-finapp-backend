import { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD } from '@/config'
import { ConnectOptions } from 'mongoose'

export const dbUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`
export const dbOptions: ConnectOptions = {}
