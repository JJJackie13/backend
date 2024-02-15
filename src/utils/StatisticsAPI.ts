import axios from "axios";
import { Request, Response } from "express";

export const statAPI = async (req: Request, res: Response, ) => {
	const options = {
		method: 'GET',
		url: 'https://instagram-statistics-api.p.rapidapi.com/community',
	  params: {
	    cid: req.body.cid
	  },
	  headers: {
	    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
	    'X-RapidAPI-Host': 'instagram-statistics-api.p.rapidapi.com'
	  }
	};

	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

export const weeklyActivityAPI = async (req: Request, res: Response, ) => {
	const options = {
		method: 'GET',
		url: 'https://instagram-statistics-api.p.rapidapi.com/statistics/activity',
	  params: {
	    cid: req.body.cid
	  },
	  headers: {
	    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
	    'X-RapidAPI-Host': 'instagram-statistics-api.p.rapidapi.com'
	  }
	};

	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

export const statByDailyAPI = async (req: Request, res: Response, ) => {
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
	    'X-RapidAPI-Host': 'instagram-statistics-api.p.rapidapi.com'
	  }
	};

	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

export const postStatAPI = async (req: Request, res: Response, ) => {
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
	    'X-RapidAPI-Host': 'instagram-statistics-api.p.rapidapi.com'
	  }
	};

	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}