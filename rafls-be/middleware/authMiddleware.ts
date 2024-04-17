import jwt from 'jsonwebtoken'
import {NextFunction, Request, Response} from 'express'
import {UserModel} from '../models/models'

export type UserRequest = Request & {
  user: UserModel
}

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') next()
  if (!req.headers?.authorization) return res.status(401).json({message: 'Пользователь не авторизован'})
  const typedReq = req as UserRequest

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).json({message: 'Пользователь не авторизован'})

    typedReq.user = jwt.verify(token, process.env.SECRET_KEY || '') as UserModel
    next()
  } catch (e) {
    return res.status(401).json({message: 'Пользователь не авторизован'})
  }
}