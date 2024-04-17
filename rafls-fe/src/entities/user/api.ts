import {axiosDefault} from "shared/lib/axios"
import {AxiosResponse} from "axios"
import {User} from "./model.tsx"


type RegisterUserProps = {
  username: string
  login: string
  password: string
}

type LoginProps = {
  login: string
  password: string
}

type ChangeUserDataProps = {
  login: string
  username: string
}

type AuthResponse = { token: string, user: User }

export const RegisterUser = (params: RegisterUserProps): Promise<AxiosResponse<AuthResponse>> =>
  axiosDefault.post('/user/registration', params)


export const Login = (params: LoginProps): Promise<AxiosResponse<AuthResponse>> =>
  axiosDefault.post('/user/login', params)

export const ChangeUserData = (params: ChangeUserDataProps): Promise<AxiosResponse<User>> =>
  axiosDefault.post('/user/change', params)