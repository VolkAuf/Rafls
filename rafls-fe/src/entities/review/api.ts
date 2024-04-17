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

export const GetReview = (movieId?: number) => useQuery({
  queryKey: ['getReview', movieId],
  queryFn: () => axiosDefault.get(`review/${movieId}`)
    .then(({data}: AxiosResponse<ReviewType>) => data),
  refetchOnWindowFocus: false,
  retry: false
})