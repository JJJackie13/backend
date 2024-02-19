import { NextFunction, Request, Response } from 'express'
import { controller, del, get, post, use } from '../decorators'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { getAll, getOne } from './handlerFactory'
import Stat from '../models/statModel'
import { statAPI, weeklyActivityAPI } from '../rapidAPI/StatisticsAPI'
import User from '../models/userModel'

@controller('/api/v1/stats')
class StatController {
  @get('/:id')
  @use(isAuthenticated)
  async getStats(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {}

  @post('/:id')
  @use(isAuthenticated)
  async addStat(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    weeklyActivityAPI(req, res)
  }

  @del('/:id')
  @use(isAuthenticated)
  async deleteSocialMedia(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {}
}
