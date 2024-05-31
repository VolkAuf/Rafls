export type ReviewCriteriaType = {
  rewatchValue: number
  generalRate: number
  actorRate: number
  graphicsRate: number
  scriptRate: number
}


export type ReviewType = {
  id: number
  movieId: number
  movieName: String
  text: string
  criteria: ReviewCriteriaType
  userId: number
  createdAt: string
}