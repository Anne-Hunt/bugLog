import { Schema } from "mongoose";

export const NoteSchema = new Schema({

}, { toJSON: { virtuals: true } })