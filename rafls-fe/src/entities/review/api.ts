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
  axiosDefault.post('createReview/create', body)

export const GetReviews = (movieId?: number) => useQuery({
  queryKey: ['getReviews', movieId],
  queryFn: () => axiosDefault.get(`getReview/all`)
    .then(({data: list}: AxiosResponse<ReviewType[]>) => list),
  refetchOnWindowFocus: false,
  retry: false
})

export const GetAllReviews = () => useQuery({
  queryKey: ['getAllReviews'],
  queryFn: () => axiosDefault.get(`getReview/all`)
    .then(({data}: AxiosResponse<ReviewType[]>) => data),
  refetchOnWindowFocus: false,
  retry: false
})

export const GetReviewsByUserId = (userId?: number) => useQuery({
  queryKey: ['getReviewsByUserId', userId],
  queryFn: () => axiosDefault.get(`getReview/all/byUId/${userId}`)
    .then(({data}: AxiosResponse<ReviewType[]>) => data),
  refetchOnWindowFocus: false,
  retry: false
})

export const GetReviewsByMovieId = (movieId?: number) => useQuery({
  queryKey: ['getReviewsByMovieId', movieId],
  queryFn: () => axiosDefault.get(`getReview/all/byMId/${movieId}`)
    .then(({data}: AxiosResponse<ReviewType[]>) => data.sort(Comparer)),
  refetchOnWindowFocus: false,
  retry: false
})

export const SetReviewsByMovieId = (movieId?: number, rate?: number) => useQuery({
  queryKey: ['setReviewsByMovieId', movieId, rate],
  queryFn: () => axiosDefault.get(`getReview/all/setByMId/${movieId},${rate}`)
      .then(({data}: AxiosResponse<ReviewType[]>) => data.sort(Comparer)),
  refetchOnWindowFocus: false,
  retry: false
})

// move rec sys here

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