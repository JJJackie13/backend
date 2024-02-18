import { InferSchemaType, Schema, model } from 'mongoose'

const monthlyStatSchema = new Schema(
  {
    cid: {
      type: String,
    },
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

type MonthlyStat = InferSchemaType<typeof monthlyStatSchema>

export default model<MonthlyStat>('MonthlyStat', monthlyStatSchema)
