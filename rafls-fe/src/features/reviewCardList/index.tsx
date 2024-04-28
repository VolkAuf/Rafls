import {FC} from "react"
import styles from './styles.module.scss'
import Typography from "@mui/material/Typography"
import {ReviewType} from "../../entities/review/model.ts";
import {ReviewCard} from "../../shared/ui/reviewCard";

type ReviewCardListProps = {
    data: ReviewType[]
}

export const ReviewCardList: FC<ReviewCardListProps> = ({data}) => {
  return (
    <div className={styles.reviewCardList}>
        <div className={styles.reviewCardList__title}>
          <Typography variant="h3" sx={{fontSize: '32px', lineHeight: '36px', fw: 400}}>
            Отзывы
          </Typography>
        </div>
      <div className={styles.list}>
        {data.map((item) => (<ReviewCard key={item.id} {...item}/>))}
      </div>
    </div>
  )
}