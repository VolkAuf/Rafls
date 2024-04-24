import {useQuery} from "@tanstack/react-query"
import {axiosKP, axiosKPList} from "shared/lib/axios.ts"
import {AxiosResponse} from "axios"
import {MovieDocsResponseDtoV13, MovieDtoV13, ShortImage} from "@openmoviedb/kinopoiskdev_client"

export type MovieType = MovieDtoV13 & { lists: string[] }
export type ListType = {
  category: string
  name: string
  slug: string
  moviesCount: number
  cover: {
    url: string,
    previewUrl: string
  },
  createdAt: string,
  updatedAt: string,
  id: string
}

const staleTime = 1000 * 60 * 60 //1hr cache

export const GetItemById = (id?: number) => useQuery({
  queryKey: ['getById', id],
  queryFn: () => axiosKP.get(`/${id}`)
    .then(({data}: AxiosResponse<MovieType>) => data),
  refetchOnWindowFocus: false,
  staleTime
})

export const GetItemByName = (name: string) => useQuery({
  queryKey: ['getByName', name],
  queryFn: ({signal}) => axiosKP.get('search', {
    params: {
      page: '1',
      limit: '20',
      query: name
    }, signal
  }).then(({data}: AxiosResponse<MovieDocsResponseDtoV13>) => data.docs),
  refetchOnWindowFocus: false,
  enabled: false,
})

export const GetPopularSeries = () => useQuery({
  queryKey: ['getPopularSeries'],
  queryFn: ({signal}) => axiosKP.get('', {
    params: {
      page: '1',
      limit: '20',
      type: 'tv-series',
      lists: 'popular-series'
    }, signal
  }).then(({data}: AxiosResponse<MovieDocsResponseDtoV13>) => data.docs),
  refetchOnWindowFocus: false,
  staleTime
})

export const GetNewMovies = () => useQuery({
  queryKey: ['getNewMovies'],
  queryFn: ({signal}) => axiosKP.get('', {
    params: {
      page: '1',
      limit: '20',
      type: 'movie',
      year: '2024'
    }, signal
  }).then(({data}: AxiosResponse<MovieDocsResponseDtoV13>) => data.docs),
  refetchOnWindowFocus: false,
  staleTime
})

export const GetSameListItems = (lists?: string[]) => useQuery({
  queryKey: ['getSameListItems', lists],
  queryFn: ({signal}) => axiosKP.get('', {
    params: {
      page: '1',
      limit: '20',
      lists: lists ? lists[1] || lists[0] : 'popular-films'
    }, signal
  }).then(({data}: AxiosResponse<MovieDocsResponseDtoV13>) => data.docs),
  refetchOnWindowFocus: false,
  staleTime
})


export const GetMoviesByLists = (category: 'Сериалы' | 'Фильмы') => useQuery({
  queryKey: ['moviesByLists', category],
  queryFn: async ({signal}) => {
    const {data: lists}: AxiosResponse<{ docs: ListType[] }> = await axiosKPList.get('', {
      params: {
        page: '1',
        limit: '25',
        category,
        selectFields: ['name', 'slug']
      }, signal
    })

    const objectList = lists.docs.reduce((previousValue, currentValue) => ({
      ...previousValue,
      [currentValue.slug]: currentValue.name
    }), {} as Record<string, string>)

    const {data}: AxiosResponse<{ docs: MovieType[] }> = await axiosKP.get('', {
      params: {
        page: '1',
        limit: '250',
        lists: Object.keys(objectList),
        selectFields: ['lists', 'id', 'poster']
      },
    })

    const formattedList = data.docs.reduce((previousValue, currentValue) => {
      for (const list of currentValue.lists) {
        if (previousValue[list]) {
          previousValue[list].push({
            id: currentValue.id,
            poster: currentValue.poster,
          })
        } else {
          previousValue[list] = [{id: currentValue.id, poster: currentValue.poster}]
        }
      }

      return previousValue
    }, {} as Record<string, { id: number, poster: ShortImage | undefined }[]>)

    return ({list: formattedList, keys: objectList})
  },
  refetchOnWindowFocus: false,
  staleTime
})