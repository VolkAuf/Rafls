import { FC, useMemo } from "react";
import styles from "./styles.module.scss";
import { MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";
import { Link } from "react-router-dom";
import { SetReviewsByMovieId } from "entities/review/api";

export const Card: FC<MovieDtoV13> = (data) => {
    if (!data || !data.name) return null; // Проверка на undefined

    const rating = data.rating?.kp || data.rating?.russianFilmCritics || data.rating?.filmCritics || data.rating?.imdb || data.rating?.tmdb || 5;
    const { data: rev } = SetReviewsByMovieId(data.name, Number(data.id), rating);

    const avg = useMemo(() => {
        if (rev && rev.length > 0) {
            const total = rev.reduce((sum, review) => sum + review.criteria.generalRate, 0);
            return total / rev.length;
        }
        return undefined;
    }, [rev]);

    const getColorClass = (avg: number | undefined) => {
        if (!avg) return styles.card__rate_none;
        if (avg > 4) return styles.card__rate_high;   // Зеленый
        if (avg > 2) return styles.card__rate_medium; // Желтый
        return styles.card__rate_low;   // Красный
    };

    return (
        <Link className={styles.card} to={`${data.isSeries ? '/series' : '/films'}/${data.id}`}>
            <div className={styles.card__img_container}>
                <img className={styles.card__img} src={data.poster?.previewUrl} alt={data.name} />
                {avg !== undefined && (
                    <div className={styles.card__rate}>
                        <div className={getColorClass(avg)}> {avg.toFixed(1)} </div>
                    </div>
                )}
            </div>
        </Link>
    );
};
