import {FC} from "react"
import styles from "./styles.module.scss"
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client"
import {Link} from "react-router-dom"
import {GetReviewsByMovieId} from "entities/review/api"
import {ReviewType} from "entities/review/model.ts";

export type MovieInfo = {
    rate: number
    kpInfo: MovieDtoV13
}

export const Card: FC<MovieDtoV13> = (data) => {
    const {data: rev} = GetReviewsByMovieId(Number(data.id))
    let avg = "N/O"
    if (rev)
    {
        const ar = rev as ReviewType[]
        const count = ar.length
        avg = (ar.reduce(function (prev, cur) {
            prev.criteria.generalRate += cur.criteria.generalRate
            return prev
        }).criteria.generalRate / count).toString()
    }
    return (
    <div>
        <Link
            className={styles.card}
            to={`${data.isSeries ? '/series' : '/films'}/${data.id}`}
        >
          <img
            className={styles.card__img}
            src={data.poster?.previewUrl}
            alt={data.name}
          />
            <div className={styles.card__rate}>
                {avg}
            </div>
        </Link>
    </div>
    )
}