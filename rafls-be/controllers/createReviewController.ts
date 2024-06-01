import {NextFunction, Request, Response} from "express"
import {ApiError} from "../error/ApiError"
import {Review, User} from "../models/models"
import {UserRequest} from "../middleware/authMiddleware"

interface CreateReviewRequest extends Request {
  body: {
    text: string
    criteria: object
    movieId: number
    movieName: string
  }
}

export const createReview = async (req: CreateReviewRequest, res: Response, next: NextFunction) => {
  const typedReq = req as UserRequest
  const {text, criteria, movieId, movieName} = req.body
  const userId = typedReq.user.id

  if (!text || !criteria || !movieId) {
    return next(ApiError.badRequest('Не хватает обязательных полей'))
  }

  const candidate = await User.findOne({where: {id: userId}})
  if (!candidate) {
    return next(ApiError.internal('Пользователь с таким id не найден'))
  }

  const review = await Review.create({text, criteria, movieId, movieName, userId})

  return res.status(200).json(review)
}