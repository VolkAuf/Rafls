export type ReviewCriteriaType = {
  moodWhen: number
  moodAfter: number
  rewatchValue: number
  generalRate: number
  actorRate: number
  graphicsRate: number
  scriptRate: number
}


export type ReviewType = {
  id: number
  movieId: number
  text: string
  criteria: ReviewCriteriaType
  userId: number
  createdAt: string
}