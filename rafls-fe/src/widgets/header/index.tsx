import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import {Logo} from 'shared/ui/logo'
import {FC, useEffect, useState} from "react"
import {useNavigate} from "react-router"
import {useDispatch} from "react-redux"
import {clearUser, useIsAuthenticated} from 'entities/user/model'
import {styled, alpha} from '@mui/material/styles'
import {Backdrop, InputBase} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import {useDebounce} from "shared/hooks/debounce"
import {GetItemByName} from "entities/film/api"
import {Link} from "react-router-dom"
import styles from './styles.module.scss'

const buttonSX = {color: 'white', display: 'block'}

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 300,
  },
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}))


export const Header = () => {
  const dispatch = useDispatch()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [searchValue, setSearchValue] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const debounce = useDebounce(searchValue, 1000)
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()
  const {refetch, data} = GetItemByName(debounce)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget)

  const handleCloseUserMenu = () => setAnchorElUser(null)

  const logoutHandler = () => dispatch(clearUser())

  const dropFocus = () => setIsFocus(false)

  useEffect(() => {
    if (!debounce) return

    refetch().catch(console.error)
  }, [debounce, refetch])

  return (
    <>
      <AppBar sx={{bgcolor: '#121212'}} position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo/>
            <Box sx={{flexGrow: 1, display: 'flex', gap: '50px', ml: '50px'}}>
              <Button
                onClick={() => navigate('/films')}
                sx={buttonSX}
              >
                Фильмы
              </Button>
              <Button
                onClick={() => navigate('/series')}
                sx={buttonSX}
              >
                Сериалы
              </Button>
            </Box>
            <Box sx={{display: 'flex', gap: '50px'}}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{'aria-label': 'search'}}
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  onFocus={() => setIsFocus(true)}
                />
                {isFocus && data?.length ?
                  <Box
                    position="absolute"
                    width="100%"
                    bgcolor="rgba(0, 0, 0, 1)"
                    maxHeight="70vh"
                    overflow="auto"
                    borderRadius="4px"
                    marginTop="4px"
                  >
                    {data.map((item) => (
                      <SearchItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        poster={item.poster?.previewUrl || item.poster?.url}
                        isSeries={item.isSeries}
                        rating={item.rating?.kp || item.rating?.russianFilmCritics || item.rating?.filmCritics || item.rating?.imdb || item.rating?.tmdb}
                        year={item.year}
                        onClick={()=> {
                          dropFocus()
                          setSearchValue('')
                        }}
                      />))}
                  </Box> : null}
              </Search>
              {isAuthenticated ? <Box sx={{flexGrow: 0}}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                      <Avatar alt="Remy Sharp"/>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{mt: '45px'}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={() => navigate('/profile')}>
                      <Typography textAlign="center">Профиль</Typography>
                    </MenuItem>
                    <MenuItem onClick={logoutHandler}>
                      <Typography textAlign="center">Выйти</Typography>
                    </MenuItem>
                  </Menu>
                </Box> :
                <Button
                  onClick={() => navigate('/login')}
                  sx={buttonSX}
                >
                  Войти
                </Button>
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Backdrop sx={{zIndex: 1}} open={isFocus} onClick={dropFocus}/>
    </>
  )
}

type SearchItemProps = {
  id: number,
  name?: string,
  poster?: string,
  isSeries: boolean
  rating?: number
  year?: number
  onClick: () => void
}

const SearchItem: FC<SearchItemProps> = ({id, name, poster, isSeries, rating, year, onClick}) => {
  return (
    <Link to={`${isSeries ? 'series' : 'films'}/${id}`} className={styles.searchItem} onClick={onClick}>
      {poster ?
        <img src={poster} alt={name} className={styles.searchItem__poster}/> :
        <Typography variant="caption">photo</Typography>
      }
      <div className={styles.searchItem__wrapper}>
        <Typography fontWeight={900} variant="body1">{name}</Typography>
        <Box display="inline-flex" gap={1} alignItems="center">
          {rating ? <Typography
            fontWeight={800}
            display="inline-block"
            color={rating > 7 ? 'green' : rating > 5 ? 'orange' : 'red'}
            variant="body2"
          >
            {rating?.toFixed(1)}
          </Typography> : null}
          <Typography variant="body2">{isSeries ? 'сериал,' : ''} {year}</Typography>
        </Box>
      </div>
    </Link>
  )
}