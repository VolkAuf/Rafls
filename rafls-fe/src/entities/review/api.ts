import {axiosDefault} from "shared/lib/axios"
import {AxiosResponse} from "axios"
import {ReviewType} from "./model"
import {useQuery} from "@tanstack/react-query"
import {getUserLs} from "../user/user.ts";

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

export const GetReviewsByUserId = (userId?: number) => useQuery({
  queryKey: ['getReviewsByUserId', userId],
  queryFn: () => axiosDefault.get(`review/all/byUId/${userId}`)
    .then(({data}: AxiosResponse<ReviewType[]>) => data),
  refetchOnWindowFocus: false,
  retry: false
})

export const GetReviewsByMovieId = (movieId?: number) => useQuery({
  queryKey: ['getReviewsByMovieId', movieId],
  queryFn: () => axiosDefault.get(`review/all/byMId/${movieId}`)
    .then(({data}: AxiosResponse<ReviewType[]>) => data.sort(Comparer)),
  refetchOnWindowFocus: false,
  retry: false
})

export const SetReviewsByMovieId = (movieId?: number, rate?: number) => useQuery({
  queryKey: ['setReviewsByMovieId', movieId, rate],
  queryFn: () => axiosDefault.get(`review/all/setByMId/${movieId},${rate}`)
      .then(({data}: AxiosResponse<ReviewType[]>) => data.sort(Comparer)),
  refetchOnWindowFocus: false,
  retry: false
})

function Comparer(first : ReviewType, second : ReviewType)
{
  const userId = getUserLs()?.id
  if (userId == first.userId)
    return -1
  if (userId == second.userId)
    return 1
  if (first.createdAt > second.createdAt)
    return -1
  return 1
}