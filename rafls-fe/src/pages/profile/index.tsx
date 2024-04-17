import Box from "@mui/material/Box"
import {setAppUser, useUser} from "entities/user/model.tsx"
import PersonIcon from '@mui/icons-material/Person'
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import {ChangeEvent, FormEvent, useState} from "react"
import {ChangeUserData} from "entities/user/api.ts"
import LoadingButton from "@mui/lab/LoadingButton"
import {useDispatch} from "react-redux"

export const ProfilePage = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const user = useUser()
  const [fields, setFields] = useState({login: user.login, username: user.username})

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return

    setFields((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isLoading) return
    setIsLoading(true)

    ChangeUserData(fields)
      .then(({data}) => setAppUser({dispatch, user: {...user, login: data.login, username: data.username}}))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  return (
    <Box
      bgcolor="#121212"
      display="flex"
      flexDirection="column"
      gap="30px"
      padding="70px"
      height="70vh"
    >
      <Box display="flex" gap="20px" alignItems="center">
        <PersonIcon sx={{color: 'white'}} fontSize="large"/>
        <Typography variant="h3" color="white" fontWeight={700}>
          Profile
        </Typography>
      </Box>
      <Box
        component="form"
        display="flex"
        gap="10px"
        flexDirection="column"
        onSubmit={onSubmitHandler}
        width="500px"
      >
        <TextField
          required
          type="email"
          name="login"
          focused
          color="warning"
          label="Почта"
          sx={{'.MuiOutlinedInput-input': {color: 'white'}}}
          value={fields.login}
          onChange={onChangeHandler}
        />
        <TextField
          required
          type="text"
          name="username"
          focused
          color="warning"
          label="Имя"
          sx={{'.MuiOutlinedInput-input': {color: 'white'}}}
          value={fields.username}
          onChange={onChangeHandler}
          inputProps={{maxLength: 64, minLength: 2}}
        />
        <LoadingButton
          disabled={fields.login === user.login && fields.username === user.username}
          type="submit"
          sx={{borderRadius: '60px', p: '10px 34px', mt: '35px'}}
          color="warning"
          variant="contained"
          loading={isLoading}
        >
          Сохранить изменения
        </LoadingButton>
      </Box>
    </Box>
  )
}