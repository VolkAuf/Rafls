import Typography from "@mui/material/Typography"
import Rating from "@mui/material/Rating"
import {ReviewCriteriaType} from "entities/review/model.ts"
import {FC} from "react"
import styles from './styles.module.scss'

type ReviewProps = {
  text: string
  criteria: ReviewCriteriaType,
  dateCreated: string
}

export const Review: FC<ReviewProps> = ({text, criteria, dateCreated}) => {
  return (
    <div className={styles.reviewWrapper}>
      <Typography
        variant="h5"
        color="white"
      >
        Ваша рецензия
      </Typography>
      <div className={styles.review}>
        <div className={styles.review__rating}>
          <div className={styles.review__ratingItem}>
            <Typography variant="h5" color="white" fontWeight={500}>
              Актерская игра
            </Typography>
            <Rating
              readOnly
              name="actorRate"
              sx={{'.MuiRating-icon': {color: 'unset'}}}
              value={criteria.actorRate}
            />
          </div>
          <div className={styles.review__ratingItem}>
            <Typography variant="h5" color="white" fontWeight={500}>
              Визуал
            </Typography>
            <Rating
              readOnly
              name="graphicsRate"
              sx={{'.MuiRating-icon': {color: 'unset'}}}
              value={criteria.graphicsRate}
            />
          </div>
          <div className={styles.review__ratingItem}>
            <Typography variant="h5" color="white" fontWeight={500}>
              Сюжет
            </Typography>
            <Rating
              readOnly
              name="scriptRate"
              sx={{'.MuiRating-icon': {color: 'unset'}}}
              value={criteria.scriptRate}
            />
          </div>
          <div className={styles.review__ratingItem}>
            <Typography variant="h5" color="white" fontWeight={500}>
              Вероятность пересмотра
            </Typography>
            <Rating
              readOnly
              sx={{'.MuiRating-icon': {color: 'unset'}}}
              name="rewatchValue"
              value={criteria.rewatchValue}
            />
          </div>
          <div className={styles.review__ratingItem}>
            <Typography variant="h5" color="white" fontWeight={500}>
              Общее впечатление
            </Typography>
            <Rating
              readOnly
              name="generalRate"
              sx={{'.MuiRating-icon': {color: 'unset'}}}
              value={criteria.generalRate}
            />
          </div>
          <div className={styles.review__ratingItem}>
            <Typography variant="h5" color="white" fontWeight={500}>
              Дата создания рецензии:
            </Typography>
            <Typography variant="body2" color="white" fontWeight={400}>
              {new Date(dateCreated).toLocaleString()}
            </Typography>
          </div>
        </div>
        <div className={styles.review__text}>
          <Typography variant="body1">{text}</Typography>
        </div>
      </div>
    </div>
  )
}