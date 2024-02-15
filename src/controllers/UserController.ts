import { NextFunction, Request, Response } from "express";

import User from "../models/userModel";
import { controller, get, use } from "../decorators";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { getAll, getOne } from "./handlerFactory";

@controller('/api/v1/users')
class UserController {
  @get('/')
  @use(isAuthenticated)
  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const handleGetAll = getAll(User)
    handleGetAll(req, res, next)
  }

  @get('/:id')
  @use(isAuthenticated)
  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const handleGetUser = getOne(User)
    handleGetUser(req, res, next)
  }
}