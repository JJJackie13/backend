import { InferSchemaType, Schema, model } from "mongoose";


const statByDailySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
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
  }
)

type StatByDaily = InferSchemaType<typeof statByDailySchema>

export default model<StatByDaily>('StatByDaily', statByDailySchema)