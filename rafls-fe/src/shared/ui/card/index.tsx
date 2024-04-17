import {FC} from "react"
import styles from "./styles.module.scss"
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client"
import {Link} from "react-router-dom"

export const Card: FC<MovieDtoV13> = ({id, poster, name, isSeries}) => {
  return (
    <Link
      className={styles.card}
      to={`${isSeries ? '/series' : '/films'}/${id}`}
    >
      <img
        className={styles.card__img}
        src={poster?.previewUrl}
        alt={name}
      />
    </Link>
  )
}