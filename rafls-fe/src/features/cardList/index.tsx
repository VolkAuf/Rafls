import {FC} from "react"
import styles from './styles.module.scss'
import Typography from "@mui/material/Typography"
import {Card} from "shared/ui/card"
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client"

type CardListProps = {
  title?: string
  to?: string
  data?: MovieDtoV13[]
}

export const CardList: FC<CardListProps> = ({title, data}) => {
  /*const navigate = useNavigate()

  const onClick = useCallback(() => {
    if (!to) return

    navigate(to)

  }, [navigate, to])*/

  return (
    <div className={styles.cardList}>
      {title ?
        <div className={styles.cardList__title}>
          <Typography variant="h3" sx={{fontSize: '32px', lineHeight: '36px', fw: 400}}>
            {title}
          </Typography>
          {/*<div className={styles.cardList__viewAll} onClick={onClick}>
            Смотреть все <ChevronRight/>
          </div>*/}
        </div>
        : null}
      <div className={styles.list}>
        {data?.map((item) => (<Card key={item.id} {...item}/>))}
      </div>
    </div>
  )
}