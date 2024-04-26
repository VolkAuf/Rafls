import {FC} from "react"
import styles from "./styles.module.scss"
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client"
import {Link} from "react-router-dom"
import {GetReviewsByMovieId} from "entities/review/api"

export const Card: FC<MovieDtoV13> = (data) => {
    const {data: rev} = GetReviewsByMovieId(Number(data.id))
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
                <div
                    className={`${styles.card__rate} ${getColorClass(avg)}`}
                >
                    {avg ? avg.toFixed(1) : "N/O"}
                </div>
            </div>
        </Link>
    )

    function getColorClass(avg: number | undefined) {
        if(!avg) return 'rate-none';
        if (avg > 4) return 'rate-high';   // Зеленый
        if (avg > 2) return 'rate-medium'; // Желтый
        if (avg <= 2) return 'rate-low';   // Красный
    }
}