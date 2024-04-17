import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit"
import {deleteToken, setToken} from "shared/lib/axios"
import {useSelector} from "react-redux"
import {deleteUser, setUserLs} from "./user"
import {RootState} from "app/store"

export type User = {
  id: number
  login: string
  username: string
}

type InitialStateProps = User & {
  isAuthenticated: boolean,
}

const initialState: InitialStateProps = {
  id: 0,
  login: '',
  username: '',
  isAuthenticated: false,
}

export const userModel = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, {payload}: PayloadAction<User | InitialStateProps>) =>
      ({...state, ...payload, isAuthenticated: true}),
    clearUser: () => {
      deleteToken()
      deleteUser()
      return initialState
    }
  }
})

export const {setUser, clearUser} = userModel.actions

export const setAppUser = ({token, user, dispatch}: {token?: string, user: User, dispatch: Dispatch})=>{
  token && setToken(token)
  setUserLs(user)
  dispatch(setUser(user))
}

export const useIsAuthenticated = () => useSelector((state: RootState) => state.user.isAuthenticated)

export const useUser = () => useSelector((state: RootState) => state.user)