import {FC} from "react"
import styles from "./styles.module.scss"
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client"
import {Link} from "react-router-dom"
import {SetReviewsByMovieId} from "entities/review/api"

export const Card: FC<MovieDtoV13> = (data) => {
    const rating = data.rating?.kp || data.rating?.russianFilmCritics || data.rating?.filmCritics || data.rating?.imdb || data.rating?.tmdb || 5
    const {data: rev} = SetReviewsByMovieId(Number(data.id), rating)

    let avg
    if (rev && rev.length > 0)
    {
        const ar = rev
        const count = ar.length
        avg = (ar.reduce((prev, cur) => {
            prev.criteria.generalRate += cur.criteria.generalRate
            return prev
        }, {criteria: {generalRate: 0}}).criteria.generalRate / count)
    }
    return (
        <Link
            className={styles.card}
            to={`${data.isSeries ? '/series' : '/films'}/${data.id}`}
        >
            <div className={styles.card__img_container}>
                <img
                    className={styles.card__img}
                    src={data.poster?.previewUrl}
                    alt={data.name}
                >
                </img>
                {avg ?
                    <div className={styles.card__rate}>
                        <div className={`${getColorClass(avg)}`}> {avg.toFixed(1)} </div>
                    </div>
                    : null}
            </div>
        </Link>
    )

    function getColorClass(avg: number | undefined) {
        if(!avg) return styles.card__rate_none;
        if (avg > 4) return styles.card__rate_high;   // Зеленый
        if (avg > 2) return styles.card__rate_medium; // Желтый
        if (avg <= 2) return styles.card__rate_low;   // Красный
    }
}