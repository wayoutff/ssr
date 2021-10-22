import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { connectModel, BaseSchema, IBase } from './BaseModel'

interface IUser extends IBase {
  text: string;
  description: string;
}

let newsSchema = new BaseSchema({
  text: String,
  description: String
})

let User = connectModel<IUser>('testing', newsSchema)

export default User
