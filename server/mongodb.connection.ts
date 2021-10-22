import * as Mongoose from "mongoose";
import { colorLog } from './utils'

let database: Mongoose.Connection;

colorLog('Start init MongoDB Connection', 'blue')

export const connectMongoDB = () => {
  if (database) return;

  Mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/testingTS2');

  database = Mongoose.connection;
  database.once("open", async () => {
    colorLog("Connected to database.", 'blue')
  });

  database.on("error", () => {
    colorLog("Error connecting to database.", 'red')
  });
};

export const disconnect = () => {
  if (!database) return;

  Mongoose.disconnect();
};