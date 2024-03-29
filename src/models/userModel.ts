import bcrypt from 'bcryptjs'
import validator from 'validator'
import { type InferSchemaType, Schema, model, Query } from 'mongoose'
import { socialType } from '../utils/enum'

const accountsSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(socialType),
  },
  name: {
    type: String,
  },
  cid: {
    type: String,
  },
})

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please tell us your name!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phone: {
      type: Number,
    },
    role: {
      type: String,
      enum: ['Basic', 'Advanced', 'VIP', 'Admin'],
      default: 'Basic',
    },
    password: {
      type: String,
      select: false,
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (this: IUser, inputValue: string) {
          return inputValue === this.password
        },
        message: 'Passwords are not the same!',
      },
    },
    accounts: [accountsSchema],
    statId: [{ type: Schema.Types.ObjectId, ref: 'Stat' }],
    weeklyActivityId: [{ type: Schema.Types.ObjectId, ref: 'WeeklyActivity' }],
    monthlyStatId: [{ type: Schema.Types.ObjectId, ref: 'MonthlyStat' }],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next()

  this.password = await bcrypt.hash(this.password, 12)
  // @ts-ignore
  this.passwordConfirm = undefined
  next()
})

userSchema.pre<Query<IUser, IUser>>(/^find/, function (next) {
  this.populate({
    path: 'statId',
    model: 'Stat',
  })
  next()
})

userSchema.pre<Query<IUser, IUser>>(/^find/, function (next) {
  this.populate({
    path: 'weeklyActivityId',
    model: 'WeeklyActivity',
  })
  next()
})

// userSchema.pre<Query<IUser, IUser>>(/^find/, function(next) {
//   this.populate({
//     path: 'monthlyStatId',
//     model: 'MonthlyStat'
//   })
//   next()
// })

type User = InferSchemaType<typeof userSchema>

export default model<User>('User', userSchema)
