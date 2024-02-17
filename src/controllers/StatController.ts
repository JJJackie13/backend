// import { NextFunction, Request, Response } from "express";
// import { controller, get, post, use } from "../decorators";
// import { isAuthenticated } from "../middleware/isAuthenticated";
// import { getAll } from "./handlerFactory";
// import Stat from "../models/statModel";
// import { statAPI } from "../utils/StatisticsAPI";

// @controller('/api/v1/stats')
// class StatController {
//   @get('/:id')
// 	@use(isAuthenticated)
// 	async getStats(
// 		req: Request,
// 		res: Response,
// 		next: NextFunction
// 	): Promise<void> {
// 		const user = getOne(User)
// 		const handleGetAll = getAll(Stat)
// 		handleGetAll(req, res, next)
// 	}

// 	@post('/')
// 	@use(isAuthenticated)
// 	async addStat(
// 		req: Request,
// 		res: Response,
// 		next: NextFunction
// 	): Promise<void> {

// 		if (fetchData.cid) {

// 		}
// 	}
// }
