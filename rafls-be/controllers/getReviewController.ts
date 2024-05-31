import {NextFunction, Request, Response} from "express"
import {ApiError} from "../error/ApiError"
import {Review, User} from "../models/models"
import {UserRequest} from "../middleware/authMiddleware"

interface GetReviewRequest extends Request {
  body: {
    userId: number
    movieId: number
  }
}

export type ReviewCriteriaType = {
  rewatchValue: number
  generalRate: number
  actorRate: number
  graphicsRate: number
  scriptRate: number
}

export const getReview = async (req: GetReviewRequest, res: Response) => {
  const typedReq = req as UserRequest
  const movieId = req.params.id

  if (!movieId) return res.status(400).json({
    status: 'failed',
    code: '400',
    message: 'No query params'
  })

  const review = await Review.findOne({where: {userId: typedReq.user.id, movieId}})

  return res.status(200).json(review)
}

export const getAllReviews = async (req: Request, res: Response) => {
    const review = await Review.findAll()
    return res.status(200).json(review)
}

export const getReviewsByMovieId = async (req: Request, res: Response) => {
  const movieId = req.params.id

  if (!movieId) return res.status(400).json({
    status: 'failed',
    code: '400',
    message: 'No query params'
  })

  const reviews = await Review.findAll({where: {movieId}})

  return res.status(200).json(reviews)
}

export const getReviewsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.id
  const reviews = await Review.findAll({where: {userId: userId}})

  return res.status(200).json(reviews)
}


export const setReviewsByMovieId = async (req: Request, res: Response) => {
  const id = req.params.id
  const s = id.split('|')
  const movieName = s[0]
  const movieId = Number.parseInt(s[1])
  const rate = Number.parseInt(s[2])
  const userId = 4

  if (!movieId) return res.status(400).json({
    status: 'failed',
    code: '400',
    message: 'No query params'
  })

  const reviews = await Review.findAll({where: {movieId}})

  if (!reviews.find(rec => rec.userId === userId))
  {
    const criteria: ReviewCriteriaType = ({
      actorRate: rate,
      graphicsRate: rate,
      scriptRate: rate,
      rewatchValue: rate,
      generalRate: rate,
    })
    const text = "kp rate"
    const review = await Review.create({text, criteria, movieId, movieName, userId})
    reviews.push(review)
  }

  return res.status(200).json(reviews)
}

let getRateValue = (rate: number) => {
  let randomMinus = Math.random() < 0.5
  let randomValue = Math.random() * rate / 10
  return Math.max(10, randomMinus ? rate - randomValue : rate + randomValue)
}