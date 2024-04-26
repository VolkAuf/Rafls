import {axiosDefault} from "shared/lib/axios"
import {AxiosResponse} from "axios"
import {ReviewType} from "./model"
import {useQuery} from "@tanstack/react-query"

type CreateReviewProps = {
  movieId: number
  text: string
  criteria: object
}

export const CreateReview = (body: CreateReviewProps): Promise<AxiosResponse<ReviewType>> =>
  axiosDefault.post('review/create', body)

export const GetReviews = (movieId?: number) => useQuery({
  queryKey: ['getReviews', movieId],
  queryFn: () => axiosDefault.get(`review/all`)
    .then(({data: list}: AxiosResponse<ReviewType[]>) => list),
  refetchOnWindowFocus: false,
  retry: false
})

export const GetAllReviews = () => useQuery({
  queryKey: ['getAllReviews'],
  queryFn: () => axiosDefault.get(`review/all`)
    .then(({data}: AxiosResponse<ReviewType[]>) => data),
  refetchOnWindowFocus: false,
  retry: false
})

export const GetReviewsByUnitId = () => useQuery({
  queryKey: ['getReviewsByUnitId'],
  queryFn: () => axiosDefault.get(`review/all/byUId`)
    .then(({data}: AxiosResponse<ReviewType[]>) => data),
  refetchOnWindowFocus: false,
  retry: false
})

export const GetReviewsByMovieId = (movieId?: number) => useQuery({
  queryKey: ['getReviewsByMovieId', movieId],
  queryFn: () => axiosDefault.get(`review/all/byMId/${movieId}`)
    .then(({data}: AxiosResponse<ReviewType[]>) => data),
  refetchOnWindowFocus: false,
  retry: false
})