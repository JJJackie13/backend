import { InferSchemaType, Schema, model } from 'mongoose'

const statByDailySchema = new Schema(
  {
    date: {
      type: String,
    },
    usersCount: {
      type: Number,
    },
    deltaUsersCount: {
      type: Number,
    },
    deltaLikes: {
      type: Number,
    },
    deltaComments: {
      type: Number,
    },
    deltaInteractions: {
      type: Number,
    },
    deltaViews: {
      type: Number,
    },
    deltaPosts: {
      type: Number,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

type StatByDaily = InferSchemaType<typeof statByDailySchema>

export default model<StatByDaily>('StatByDaily', statByDailySchema)
