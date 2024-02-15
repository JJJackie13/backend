import { InferSchemaType, Schema, model } from "mongoose";


const weeklyActivitySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    time: {
      type: String,
    },
    likes: {
      type: Number,
    },
    comments: {
      type: Number,
    },
    interactions: {
      type: Number,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

type WeeklyActivity = InferSchemaType<typeof weeklyActivitySchema>

export default model<WeeklyActivity>('WeeklyActivity', weeklyActivitySchema)