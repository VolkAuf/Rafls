import {useParams} from "react-router"
import {ChangeEvent, Ref, forwardRef, MutableRefObject, SyntheticEvent, useState} from "react"
import {ReviewCriteriaType} from "entities/review/model.ts"
import {CreateReview} from "entities/review/api.ts"
import styles from "./styles.module.scss"
import Typography from "@mui/material/Typography"
import Rating from "@mui/material/Rating"
import TextField from "@mui/material/TextField"
import LoadingButton from "@mui/lab/LoadingButton"


type ReviewFormProps = {
  movieName: string,
}


export const ReviewForm = forwardRef<HTMLDivElement, ReviewFormProps>(({movieName}, ref: Ref<HTMLDivElement>) => {
  const {id} = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [criteria, setCriteria] = useState<ReviewCriteriaType>({
    actorRate: 0,
    generalRate: 0,
    graphicsRate: 0,
    rewatchValue: 0,
    scriptRate: 0
  })

  const onChangeCriteria = (event: SyntheticEvent, value: number | null) => {
    const typedEvent = event as ChangeEvent<HTMLInputElement>
    setCriteria((prevState) => ({...prevState, [typedEvent.target.name]: value}))
  }


  const onSubmitHandler = () => {
    if (!id || !text.trim()) return
    setIsLoading(true)

    CreateReview({movieName: movieName, movieId: Number(id), text: text.trim(), criteria})
      .catch(console.error)
      .finally(() => location.reload())
  }

  return (
    <div className={styles.reviewWrapper} ref={ref as unknown as MutableRefObject<HTMLDivElement>}>
      <Typography
        variant="h5"
        color="white"
      >
        Рецензия
      </Typography>
      <div className={styles.review}>
        <div className={styles.review__rating}>
          <div className={styles.review__ratingItem}>
            <Typography variant="h5" color="white" fontWeight={500}>
              Актерская игра
            </Typography>
            <Rating
                name="actorRate"
                onChange={onChangeCriteria}
                sx={{'.MuiRating-icon': {color: 'unset'}}}
                max={10}
                precision={0.5}
                size={"large"}
            />
          </div>
          <div className={styles.review__ratingItem}>
            <Typography variant="h5" color="white" fontWeight={500}>
              Спецэффекты
            </Typography>
            <Rating
                name="graphicsRate"
                onChange={onChangeCriteria}
                sx={{'.MuiRating-icon': {color: 'unset'}}}
                max={10}
                precision={0.5}
                size={"large"}
            />
          </div>
          <div className={styles.review__ratingItem}>
            <Typography variant="h5" color="white" fontWeight={500}>
              Сюжет
            </Typography>
            <Rating
                name="scriptRate"
                onChange={onChangeCriteria}
                sx={{'.MuiRating-icon': {color: 'unset'}}}
                max={10}
                precision={0.5}
                size={"large"}
            />
          </div>
          <div className={styles.review__ratingItem}>
            <Typography variant="h5" color="white" fontWeight={500}>
              Вероятность пересмотра
            </Typography>
            <Rating
                sx={{'.MuiRating-icon': {color: 'unset'}}}
                name="rewatchValue"
                onChange={onChangeCriteria}
                max={10}
                precision={0.5}
                size={"large"}
            />
          </div>
          <div className={styles.review__ratingItem}>
            <Typography variant="h5" color="white" fontWeight={500}>
              Общая оценка
            </Typography>
            <Rating
                name="generalRate"
                onChange={onChangeCriteria}
                sx={{'.MuiRating-icon': {color: 'unset'}}}
                max={10}
                precision={0.5}
                size={"large"}
            />
          </div>
          <LoadingButton
              sx={{borderRadius: '60px', p: '10px 34px'}}
              loadingPosition="start"
              color="warning"
              variant="contained"
              onClick={onSubmitHandler}
              loading={isLoading}
          >
            Отправить отзыв
          </LoadingButton>
        </div>
        <TextField
            label="Рецензия"
            multiline
            rows={6}
            color="warning"
            sx={{width: '45%', '.MuiOutlinedInput-input': {color: 'white'}}}
            focused
            value={text}
            onChange={(e) => setText(e.target.value)}
            inputProps={{ maxLength: 255 }}
        />
      </div>
    </div>
  )
})