import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const Schema = mongoose.Schema

const defaultDocumentFields = {
  _id: {
    type: String,
    default: function genUUID () {
      return uuidv4()
    }
  },
  updatedAt: Date
}

export interface IBase extends mongoose.Document {
  _id: string;
  updatedAt: any;
  getTestMessage?: () => any;
}

export interface IBaseModel extends mongoose.Model<IBase> {
  customMethod?: () => any;
}

export function connectModel<T> (path, masterSchema) {
  masterSchema.methods.getTestMessage = () => {
    console.log('Test Custom Method')
  }

  // hooks
  masterSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
  })

  return mongoose.model<T>(path, masterSchema)
}

export class BaseSchema extends Schema {
  constructor (schema) {
    const mergeSchema = Object.assign(defaultDocumentFields, schema)
    super(mergeSchema)
  }
}
