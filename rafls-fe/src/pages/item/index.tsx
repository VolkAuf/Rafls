import { useLocation, useNavigate, useParams } from "react-router"
import inceptionBG from './assets/inception.png'
import styles from './styles.module.scss'
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useEffect, useMemo, useRef, useState } from "react"
import { GetMovieById, GetRecSysMoviesByIds, GetRewatchMoviesByIds, GetSameListItems, GetSequelsMovies, GetSimilarMovies } from "entities/film/api"
import { CardList } from "features/cardList"
import { useIsAuthenticated } from "entities/user/model"
import { ReviewForm } from "./ui/reviewForm"
import { GetReviewsByMovieId, GetReviewsByUserId } from "entities/review/api"
import { ReviewCardList } from "../../features/reviewCardList";
import { getUserLs } from "../../entities/user/user.ts";
import { GetRecommendations } from "../../entities/review/recommendationSystem.ts";
import { MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";


function shuffle(array: MovieDtoV13[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

export const ItemPage = () => {
  const { id } = useParams()
  const ref = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [isShowReview, setIsShowReview] = useState(false)
  const isAuthenticated = useIsAuthenticated()
  const { data } = GetMovieById(Number(id))
  const { data: reviewsByMovie } = GetReviewsByMovieId(Number(id))
  const userId = getUserLs()?.id
  const { data: reviewbyUser } = GetReviewsByUserId(userId)
  const review = reviewsByMovie?.find(value => value.userId == userId)
  const { data: sameList } = GetSameListItems(data?.lists)

  const isSeries = useMemo(() => pathname.split('/')[1] === 'series', [pathname])

  const getSeriesDuration = useMemo(() => {
    if (!data?.seasonsInfo) return

    const info = data.seasonsInfo
      .reduce((acc, curr) => ({
        number: acc.number ? acc.number + 1 : 1,
        episodesCount: acc.episodesCount !== undefined && curr.episodesCount !== undefined ?
          acc.episodesCount + curr.episodesCount : 1
      }), { number: 0, episodesCount: 0 })

    return `Кол-во сезонов: ${info.number} | Кол-во эпизодов: ${info.episodesCount}`
  }, [data?.seasonsInfo])

  const showHandler = () => {
    if (!isAuthenticated)
      return navigate('/login')

    setIsShowReview(true)
    setTimeout(() => {
      console.log(ref.current)
      ref.current?.scrollIntoView()
    }, 100)
  }

  useEffect(() => {
    if (!review) return

    setIsShowReview(false)
  }, [review])


  const idsSimilar: number[] = []
  data?.similarMovies?.forEach(value => { if (value.id) idsSimilar.push(Number(value.id)) })
  const { data: similarList } = GetSimilarMovies(idsSimilar)

  const idsSequels: number[] = []
  data?.sequelsAndPrequels?.forEach(value => { if (value.id) idsSequels.push(Number(value.id)) })
  const { data: sequelsList } = GetSequelsMovies(idsSequels)

  const idsRewatched: number[] = []
  reviewbyUser?.forEach(element => { if (element.movieId && element.criteria.generalRate > 6 && element.movieId != Number(id)) idsRewatched.push(Number(element.movieId)) });
  const { data: rewatchedList } = GetRewatchMoviesByIds(idsRewatched)

  const recSysIds = GetRecommendations(userId)
  let recSysL: MovieDtoV13[] = []
  const { data: recSysList } = GetRecSysMoviesByIds(recSysIds)
  if (recSysList && recSysList.length)
    recSysL = recSysList
  shuffle(recSysL)

  if (!data) return <></>

  return (
    <>
      <div className={styles.slide}>
        <img className={styles.slide__bg} src={data.backdrop?.url || inceptionBG} alt={data.name} />
        <Typography
          sx={{ zIndex: 1, fontSize: '96px', fontWeight: 300 }}
          variant="h2"
          color="white"
        >
          {data.name}
        </Typography>
        <Typography
          sx={{ zIndex: 1, fontWeight: 500 }}
          variant="h5"
          color="#A7A7A7"
        >
          {!isSeries ? data.genres?.map((item) => item.name + ' | ') : null}
          {!isSeries ? data.year : null}
          {isSeries ? getSeriesDuration : null}
        </Typography>
        <Typography
          sx={{ zIndex: 1, fontWeight: 300, maxWidth: 605, fontSize: '32px', overflow: 'hidden' }}
          variant="h4"
          color="white"
        >
          {data.shortDescription || data.description}
        </Typography>
        <Button
          sx={{ borderRadius: '60px', p: '10px 34px', mt: '35px' }}
          color="warning"
          variant="contained"
          onClick={showHandler}
          disabled={isShowReview || Boolean(review)}
        >
          Оцени сейчас
        </Button>
      </div>
      <div className={styles.main}>
        {idsSimilar && idsSimilar.length && similarList && similarList.length ? <CardList data={similarList} title={"Похожие"} /> : null}
        {idsSequels && idsSequels.length && sequelsList && sequelsList.length && (!similarList || !similarList.length || JSON.stringify(similarList) !== JSON.stringify(sequelsList)) ? <CardList data={sequelsList} title={"Сиквелы/Приквелы"} /> : null}
        {recSysIds && recSysIds.length && recSysL && recSysL.length ? <CardList data={recSysL} title={"Вам понравится"} /> : null}
        {idsRewatched && idsRewatched.length && rewatchedList && rewatchedList.length ? <CardList data={rewatchedList} title={"Ваши любимые"} /> : null}
        <CardList data={sameList} title={"Популярное"} />
        {isShowReview && !review && data?.name ? <ReviewForm movieName={data.name} ref={ref} /> : null}
        {reviewsByMovie && reviewsByMovie.length > 0 ? <ReviewCardList data={reviewsByMovie} needMovieName={false} /> : null}
      </div>
    </>
  )
}