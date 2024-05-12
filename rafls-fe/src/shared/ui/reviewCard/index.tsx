import {FC, useState} from "react"
import styles from "./styles.module.scss"
import {ReviewType} from "../../../entities/review/model.ts";
import Rating from "@mui/material/Rating";
import {GetUserName} from "../../../entities/user/api.ts";
import {getUserLs} from "../../../entities/user/user.ts";
import {NewModal} from "./reviewModal.tsx";
import {Typography} from "@mui/material"



export const ReviewCard: FC<ReviewType> = (data) => {
    const {data: name} = GetUserName(Number(data.userId))
    const isSelfReview = getUserLs()?.id === data.userId
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <div>
            <NewModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} text={data.text}/>
            <button
                className={`${getColorClass(isSelfReview)}`}
                onClick={() => setIsOpenModal(true)}
            >
                <Typography
                    variant="h4"
                    color="white"
                >
                    {name}
                </Typography>
                <div className={styles.reviewCard}>
                    <div className={styles.reviewCard__rating}>
                        <div className={styles.reviewCard__ratingItem}>
                            <Typography variant="h5" color="white" fontWeight={500}>
                                Актерская игра
                            </Typography>
                            <Rating
                                readOnly
                                name="actorRate"
                                sx={{'.MuiRating-icon': {color: 'unset'}}}
                                max={10}
                                precision={0.5}
                                value={data.criteria.actorRate}
                            />
                        </div>
                        <div className={styles.reviewCard__ratingItem}>
                            <Typography variant="h5" color="white" fontWeight={500}>
                                Визуал
                            </Typography>
                            <Rating
                                readOnly
                                name="graphicsRate"
                                sx={{'.MuiRating-icon': {color: 'unset'}}}
                                max={10}
                                precision={0.5}
                                value={data.criteria.graphicsRate}
                            />
                        </div>
                        <div className={styles.reviewCard__ratingItem}>
                            <Typography variant="h5" color="white" fontWeight={500}>
                                Сюжет
                            </Typography>
                            <Rating
                                readOnly
                                name="scriptRate"
                                sx={{'.MuiRating-icon': {color: 'unset'}}}
                                max={10}
                                precision={0.5}
                                value={data.criteria.scriptRate}
                            />
                        </div>
                        <div className={styles.reviewCard__ratingItem}>
                            <Typography variant="h5" color="white" fontWeight={500}>
                                Вероятность пересмотра
                            </Typography>
                            <Rating
                                readOnly
                                sx={{'.MuiRating-icon': {color: 'unset'}}}
                                name="rewatchValue"
                                max={10}
                                precision={0.5}
                                value={data.criteria.rewatchValue}
                            />
                        </div>
                        <div className={styles.reviewCard__ratingItem}>
                            <Typography variant="h5" color="white" fontWeight={500}>
                                Общее впечатление
                            </Typography>
                            <Rating
                                readOnly
                                name="generalRate"
                                sx={{'.MuiRating-icon': {color: 'unset'}}}
                                max={10}
                                precision={0.5}
                                value={data.criteria.generalRate}
                            />
                        </div>
                        <div className={styles.review__ratingItem}>
                            <Typography variant="h5" color="white" fontWeight={500}>
                                Дата создания рецензии:
                            </Typography>
                            <Typography variant="body2" color="white" fontWeight={400}>
                                {new Date(data.createdAt).toLocaleString()}
                            </Typography>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    )

    function getColorClass(isSelfReview: boolean | undefined) {
        return isSelfReview ? styles.reviewWrapper_self : styles.reviewWrapper
    }
}