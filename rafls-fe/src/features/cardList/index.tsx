import {FC} from "react"
import styles from './styles.module.scss'
import Typography from "@mui/material/Typography"
import {Card, MovieInfo} from "shared/ui/card"

type CardListProps = {
  title?: string
  to?: string
  data?: MovieInfo[]
}

export const CardList: FC<CardListProps> = ({title, data}) => {
  return (
    <div className={styles.cardList}>
      {title ?
        <div className={styles.cardList__title}>
          <Typography variant="h3" sx={{fontSize: '32px', lineHeight: '36px', fw: 400}}>
            {title}
          </Typography>
        </div>
        : null}
      <div className={styles.list}>
        {data?.map((item) => (<Card key={item.kpInfo.id} {...item}/>))}
      </div>
    </div>
  )
}