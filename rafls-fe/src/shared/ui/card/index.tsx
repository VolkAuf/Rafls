import {FC} from "react"
import styles from "./styles.module.scss"
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client"
import {Link} from "react-router-dom"
import Rating from "@mui/material/Rating"

export type MovieInfo = {
    rate: number
    kpInfo: MovieDtoV13
}

export const Card: FC<MovieInfo> = (data) => {
  return (
    <div>
    <Link
      className={styles.card}
      to={`${data.kpInfo.isSeries ? '/series' : '/films'}/${data.kpInfo.id}`}
    >
      <img
        className={styles.card__img}
        src={data.kpInfo.poster?.previewUrl}
        alt={data.kpInfo.name}
      />
    </Link>
    <Rating
      readOnly
      sx={{'.MuiRating-icon': {color: 'unset'}}}
      value={data.rate}
    />
  </div>
  )
}