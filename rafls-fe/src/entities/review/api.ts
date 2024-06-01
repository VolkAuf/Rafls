import {axiosDefault} from "shared/lib/axios";
import {AxiosResponse} from "axios";
import {ReviewType} from "./model";
import {useQuery} from "@tanstack/react-query";
import {getUserLs} from "../user/user.ts";

type CreateReviewProps = {
  text: string;
  criteria: object;
  movieId: number;
  movieName: string;
}

export const CreateReview = (body: CreateReviewProps): Promise<AxiosResponse<ReviewType>> =>
  axiosDefault.post('createReview/create', body);

export const GetReviews = () => useQuery({
  queryKey: ['getReviews'],
  queryFn: () => axiosDefault.get('getReview/all')
    .then(({data: list}: AxiosResponse<ReviewType[]>) => list)
    .catch(error => {
      console.error('Failed to fetch reviews', error);
      throw new Error('Failed to fetch reviews');
    }),
  refetchOnWindowFocus: false,
  retry: false
});

export const GetAllReviews = () => useQuery({
  queryKey: ['getAllReviews'],
  queryFn: () => axiosDefault.get('getReview/all')
    .then(({data}: AxiosResponse<ReviewType[]>) => data)
    .catch(error => {
      console.error('Failed to fetch all reviews', error);
      throw new Error('Failed to fetch all reviews');
    }),
  refetchOnWindowFocus: false,
  retry: false
});

export const GetReviewsByUserId = (userId?: number) => {
  return useQuery({
    queryKey: ['getReviewsByUserId', userId],
    queryFn: () => axiosDefault.get(`getReview/all/byUId/${userId}`)
      .then(({data}: AxiosResponse<ReviewType[]>) => data)
      .catch(error => {
        console.error(`Failed to fetch reviews by user ID ${userId}`, error);
        throw new Error(`Failed to fetch reviews by user ID ${userId}`);
      }),
    enabled: !!userId,
    refetchOnWindowFocus: false,
    retry: false
  });
};

export const GetReviewsByMovieId = (movieId?: number) => {
  return useQuery({
    queryKey: ['getReviewsByMovieId', movieId],
    queryFn: () => axiosDefault.get(`getReview/all/byMId/${movieId}`)
      .then(({data}: AxiosResponse<ReviewType[]>) => data.sort(Comparer))
      .catch(error => {
        console.error(`Failed to fetch reviews by movie ID ${movieId}`, error);
        throw new Error(`Failed to fetch reviews by movie ID ${movieId}`);
      }),
    enabled: !!movieId,
    refetchOnWindowFocus: false,
    retry: false
  });
};

export const SetReviewsByMovieId = (movieName?: string, movieId?: number, rate?: number) => {
  return useQuery({
    queryKey: ['setReviewsByMovieId', movieName, movieId, rate],
    queryFn: () => axiosDefault.get(`getReview/all/setByMId/${encodeURIComponent(movieName)}|${movieId}|${rate}`)
      .then(({data}: AxiosResponse<ReviewType[]>) => data.sort(Comparer))
      .catch(error => {
        console.error('Failed to set reviews by movie ID', error);
        throw new Error('Failed to set reviews by movie ID');
      }),
    enabled: !!movieName && !!movieId,
    refetchOnWindowFocus: false,
    retry: false
  });
};

function Comparer(first: ReviewType, second: ReviewType) {
  const userId = getUserLs()?.id;
  if (userId === first.userId) return -1;
  if (userId === second.userId) return 1;
  return first.createdAt > second.createdAt ? -1 : 1;
}
