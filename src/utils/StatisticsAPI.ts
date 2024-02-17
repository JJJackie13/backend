import axios from 'axios'
import { Request, Response } from 'express'
import { socialMediaLink } from './socialMediaLink'
import { createOne, updateOne } from '../controllers/handlerFactory'
import User from '../models/userModel'
import { AccountsType } from '../types/accountType'
import Stat from '../models/statModel'

export const statAPI = async (req: Request, res: Response) => {
  const socialMediaAccounts = req.body.accounts
  const { id } = req.params
  console.log(id)
  console.log('Social Media Accounts', socialMediaAccounts)

  socialMediaAccounts.map(
    async (obj: AccountsType) => {
      const link = socialMediaLink(obj.type)
      console.log('Social Media Link', link)

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
        console.log('data data: ', data)
        const userUpdate = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              accounts: {
                type: obj.type,
                name: obj.name,
                cid: data.cid,
              },
            },
          },
          { new: true },
        )
        console.log('userUpdate: ', userUpdate)

        const statUpdate = await Stat.create({
          usersCount: data.usersCount,
          avgLikes: data.avgLikes,
          avgComments: data.avgComments,
          avgInteractions: data.avgInteractions,
          avgVideoLikes: data.avgVideoLikes,
          avgVideoComments: data.avgVideoComments,
          avgVideoViews: data.avgVideoViews,
          membersCities: data.membersCities,
          membersCountries: data.membersCountries,
          membersGendersAges: {
            data: data?.membersGendersAges?.data,
          },
        })

        console.log('statUpdate: ', statUpdate)
      } catch (error) {
        console.error('ERROR IN STAT', error)
      }
    },
    res.status(200).json({
      data: 'HEEY',
    }),
  )
}

export const weeklyActivityAPI = async (req: Request, res: Response) => {
  const options = {
    method: 'GET',
    url: 'https://instagram-statistics-api.p.rapidapi.com/statistics/activity',
    params: {
      cid: req.body.cid,
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

export const statByDailyAPI = async (req: Request, res: Response) => {
  const options = {
    method: 'GET',
    url: 'https://instagram-statistics-api.p.rapidapi.com/statistics/retrospective',
    params: {
      cid: req.body.cid,
      from: req.body.from,
      to: req.body.to,
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
