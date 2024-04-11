import { Schema } from "mongoose";

export const TrackedBugSchema = new Schema({

}, { toJSON: { virtuals: true } })