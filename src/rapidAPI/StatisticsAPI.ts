import axios from 'axios'
import { Request, Response } from 'express'
import { socialMediaLink } from '../utils/socialMediaLink'
import { createOne, updateOne } from '../controllers/handlerFactory'
import User from '../models/userModel'
import { AccountsType } from '../types/accountType'
import Stat from '../models/statModel'
import WeeklyActivity from '../models/weeklyActivityModel'
import getPreviousMonthDates from '../utils/prevMonthDate'
import statFilterUniqueObjectsByKey, {
  weeklyDataFilterUniqueObjectsByKey,
} from '../utils/filterUniqueObjectsByKey'

export const statAPI = async (req: Request, res: Response) => {
  const socialMediaAccounts = req.body.accounts
  const { id } = req.params

  const results = await Promise.all(
    socialMediaAccounts.map(async (obj: AccountsType) => {
      const link = socialMediaLink(obj.type)

      const options = {
        method: 'GET',
        url: 'https://instagram-statistics-api.p.rapidapi.com/community',
        params: {
          url: link + obj.name,
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'instagram-statistics-api.p.rapidapi.com',
        },
      }

      try {
        const data = (await axios.request(options)).data.data
        // console.log('data data: ', data)

        const statUpdate = await Stat.create({
          cid: data.cid,
          usersCount: data.usersCount,
          socialType: data.socialType,
          name: data.name,
          screenName: data.screenName,
          avgLikes: data.avgLikes,
          avgComments: data.avgComments,
          avgInteractions: data.avgInteractions,
          avgVideoLikes: data.avgVideoLikes,
          avgVideoComments: data.avgVideoComments,
          avgVideoViews: data.avgVideoViews,
          timeStatistics: data.timeStatistics,
          tags: data.tags,
          membersCities: data.membersCities,
          membersCountries: data.membersCountries,
          membersGendersAges: {
            data: data?.membersGendersAges?.data,
          },
        })

        // console.log('statUpdate: ', statUpdate)

        const userUpdate = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              accounts: {
                type: obj.type,
                name: obj.name,
                cid: data.cid,
              },
              statId: statUpdate._id,
            },
          },
          { new: true },
        )
        // console.log('userUpdate: ', userUpdate)

        return userUpdate
      } catch (error) {
        console.error('ERROR IN STAT', error)
      }
    }),
  )

  console.log('results: ', results)

  const updatedUsers = results.filter((result) => result && !result.error)

  console.log('updatedUsers: ', updatedUsers)

  const userResult = statFilterUniqueObjectsByKey(updatedUsers, '_id')

  console.log('userResult: ', userResult)

  res.status(200).json({
    data: userResult,
  })
}

export const weeklyActivityAPI = async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await User.findById(id)

  if (user?.accounts.length !== 0) {
    user?.accounts.map(
      async (account: any) => {
        const options = {
          method: 'GET',
          url: 'https://instagram-statistics-api.p.rapidapi.com/statistics/activity',
          params: {
            cid: account.cid,
          },
          headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'instagram-statistics-api.p.rapidapi.com',
          },
        }

        try {
          const data = (await axios.request(options)).data.data
          // console.log('weeklyActivityAPI data', data)

          data.map(async (item: any) => {
            const weeklyStat = await WeeklyActivity.create({
              cid: account.cid,
              timeStatistics: new Date().toISOString(),
              time: item.time,
              likes: item.likes,
              comments: item.comments,
              interactions: item.interactions,
            })

            console.log('weeklyStat: ', weeklyStat)

            const userUpdate = await User.findByIdAndUpdate(
              id,
              {
                $push: {
                  weeklyActivityId: weeklyStat._id,
                },
              },
              { new: true },
            )
            console.log('userUpdate: ', userUpdate)
          })
        } catch (error) {
          console.error(error)
        }
      },
      res.status(200).json({
        data: 'WeeklyActivity',
      }),
    )
  } else {
    return res.status(400).json({
      status: 'error',
      message: 'Please add social media accounts!',
    })
  }
}

export const monthlyStatAPI = async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await User.findById(id)

  const previousMonthDates = getPreviousMonthDates()

  user?.accounts.map(
    async (account) => {
      const options = {
        method: 'GET',
        url: 'https://instagram-statistics-api.p.rapidapi.com/statistics/retrospective',
        params: {
          cid: account.cid,
          from: previousMonthDates.firstDay,
          to: previousMonthDates.lastDay,
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'instagram-statistics-api.p.rapidapi.com',
        },
      }

      try {
        const data = (await axios.request(options)).data.data
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    },
    res.status(200).json({
      data: 'WeeklyActivity',
    }),
  )
}

export const postsStatAPI = async (req: Request, res: Response) => {
  const options = {
    method: 'GET',
    url: 'https://instagram-statistics-api.p.rapidapi.com/posts',
    params: {
      cid: req.body.cid,
      from: req.body.from,
      to: req.body.to,
      sort: 'date',
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'instagram-statistics-api.p.rapidapi.com',
    },
  }

  try {
    const response = await axios.request(options)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
