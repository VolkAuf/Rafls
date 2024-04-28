import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {ApiError} from '../error/ApiError'
import {User} from '../models/models'
import {NextFunction, Request, Response} from 'express'
import dotenv from 'dotenv'
import {UserRequest} from "../middleware/authMiddleware"

dotenv.config()

interface UserAuthRequest extends Request {
  body: {
    login: string,
    password: string,
    username: string
  }
}

const generateJWT = (id: number, login: string) =>
  jwt.sign({id, login}, process.env.SECRET_KEY || '', {expiresIn: '365d'})

export const registration = async (req: UserAuthRequest, res: Response, next: NextFunction) => {
  const {login, password, username} = req.body
  if (!login || !password || !username) {
    return next(ApiError.badRequest(('Некорректный email или password')))
  }

  const candidate = await User.findOne({where: {login}})
  if (candidate) {
    return next(ApiError.badRequest('Пользователь с таким email уже существует'))
  }

  const hashPassword = await bcrypt.hash(password, 5)
  const user = await User.create({login, password: hashPassword, username})
  const token = generateJWT(user.id, user.login)

  return res.json({token, user})
}

export const login = async (req: UserAuthRequest, res: Response, next: NextFunction) => {
  const {login, password} = req.body
  if (!login || !password) {
    return next(ApiError.badRequest(('Некорректный email или password')))
  }

  const user = await User.findOne({where: {login}})

  if (!user) {
    return next(ApiError.internal(('Пользователь с таким email не найден')))
  }

  const comparePassword = bcrypt.compareSync(password, user.password)
  if (!comparePassword) {
    return next(ApiError.internal(('Неверный пароль')))
  }

  const token = generateJWT(user.id, user.login)

  const userData = {id: user.id, login: user.login, username: user.username}
  return res.json({token, user: userData})
}


export const changeUser = async (req: UserAuthRequest, res: Response, next: NextFunction) => {
  const typedReq = req as UserRequest
  const {login, username} = req.body
  if (!login || !username) {
    return next(ApiError.badRequest(('Некорректный email или username')))
  }

  const user = await User.findOne({where: {id: typedReq.user.id}})

  if (!user) {
    return next(ApiError.internal(('Пользователь с таким id не найден')))
  }

  const newUser = await user.update({username, login})

  return res.status(200).json(newUser)
}

export const getUserNameById = async (req: Request, res: Response) => {
  const user = await User.findOne({where: {id: req.params.id}})
  return res.status(200).json(user?.username)
}