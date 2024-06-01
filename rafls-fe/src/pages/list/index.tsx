import { useLocation } from "react-router"
import { useMemo } from "react"
import { Box } from "@mui/material"
import { GetMoviesByLists } from "entities/film/api"
import { CardList } from "features/cardList"
import { MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client"

export const ListPage = () => {
  const { pathname } = useLocation()
  const isSeries = useMemo(() => pathname.split('/')[1] === 'series', [pathname])
  const {data} = GetMoviesByLists(isSeries ? 'Сериалы' : 'Фильмы')

  return (
    <Box padding='50px 0' minHeight='100vh' display="flex" flexDirection="column" gap="40px" bgcolor="#191919">
      {data && data.keys ?
        Object.keys(data.keys).filter(key => data.list[key]?.length).map(key =>
          <CardList
            key={key}
            title={data.keys[key]}
            data={data.list[key] as MovieDtoV13[]}
          />)
        : null}
    </Box>
  )
}