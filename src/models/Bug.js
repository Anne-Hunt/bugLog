import { Schema } from "mongoose";

export const BugSchema = new Schema({

}, { toJSON: { virtuals: true } })