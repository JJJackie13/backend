import { InferSchemaType, Schema, model } from 'mongoose'

const membersCitiesSchema = new Schema({
  category: {
    type: String,
  },
  name: {
    type: String,
  },
  value: {
    type: Number,
  },
})

const membersCountriesSchema = new Schema({
  category: {
    type: String,
  },
  name: {
    type: String,
  },
  value: {
    type: Number,
  },
})

const membersGendersAgesSchema = new Schema({
  category: {
    type: String,
  },
  m: {
    type: Number,
  },
  f: {
    type: Number,
  },
})

const statSchema = new Schema(
  {
    cid: {
      type: String,
    },
    usersCount: {
      type: Number,
    },
    socialType: {
      type: String,
    },
    name: {
      type: String,
    },
    screenName: {
      type: String,
    },
    avgLikes: {
      type: Number,
    },
    avgComments: {
      type: Number,
    },
    avgInteractions: {
      type: Number,
    },
    avgVideoLikes: {
      type: Number,
    },
    avgVideoComments: {
      type: Number,
    },
    avgVideoViews: {
      type: Number,
    },
    timeStatistics: {
      type: String,
    },
    tags: [String],
    membersCities: [membersCitiesSchema],
    membersCountries: [membersCountriesSchema],
    membersGendersAges: {
      data: [membersGendersAgesSchema],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

type Stat = InferSchemaType<typeof statSchema>

export default model<Stat>('Stat', statSchema)
