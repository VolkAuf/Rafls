import {ReviewCriteriaType, ReviewType} from "./model.ts";
import {GetAllReviews, GetReviewsByUserId} from "./api.ts";

export const getRecommendations = (userId: number) => {
    const {data: reviews} = GetAllReviews();
    if(!reviews)
        return

    const similarities = getSimilaritiesUsers(userId, reviews);
    if (!similarities)
        return;

    const recommendedMovies: { [movieId: number]: number } = {}; // Объект для хранения рекомендаций
    for (const similarity of similarities) {
        const otherUserId = similarity.userId;
        const {data: otherUserReviews} = GetReviewsByUserId(otherUserId);

        if(!otherUserReviews)
            return

        for (const review of otherUserReviews) {
            const movieId = review.movieId;

            // Проверяем, оценил ли пользователь этот фильм
            if(reviews.find((value) => value.userId == userId && value.movieId == movieId)){
                recommendedMovies[movieId] = recommendedMovies[movieId] ? recommendedMovies[movieId] + similarity.similarity : similarity.similarity;
            }
        }
    }

    // Сортируем фильмы по суммарной сходности и возвращаем топ-N рекомендаций
    const sortedMovies = Object.entries(recommendedMovies)
        .sort((a, b) => b[1] - a[1])
        .map(([movieId, _]) => parseInt(movieId, 10))
        .slice(0, 5);

    return sortedMovies;
}


export const getSimilaritiesUsers = (userId: number, reviews: ReviewType[]) => {
    const userReviews = reviews.filter(r => r.userId === userId);
    const otherUserReviews = reviews.filter(r => r.userId !== userId);

    const similarities = otherUserReviews.map(other => ({
        userId: other.userId,
        similarity: distCosine(userReviews[0].criteria, other.criteria) // Сравнение только на основе одного обзора
    }));

    // Сортировка по сходству и возврат топ-N пользователей
    similarities.sort((a, b) => b.similarity - a.similarity);
    return similarities.slice(0, 5); // Вернуть топ-5 похожих пользователей
};


export const distCosine = (userRatings: ReviewCriteriaType, otherUserRatings: ReviewCriteriaType): number => {
    let dotProduct = 0;
    let normUser1 = 0;
    let normUser2 = 0;

    const keys = Object.keys(userRatings) as (keyof ReviewCriteriaType)[]; // Приводим тип ключей к типу ключей ReviewCriteriaType

    for (const key of keys) {
        if (otherUserRatings[key] !== undefined) {
            dotProduct += userRatings[key] * otherUserRatings[key];
        }
        normUser1 += userRatings[key] ** 2;
        normUser2 += (otherUserRatings[key] || 0) ** 2;
    }

    normUser1 = Math.sqrt(normUser1);
    normUser2 = Math.sqrt(normUser2);

    if (normUser1 === 0 || normUser2 === 0) {
        return 0; // Избегаем деления на ноль
    }

    return dotProduct / (normUser1 * normUser2);
}

/*
генерация данных для косинуса
export const calculateData(userRatings: ReviewType) {
    return userRatings.userId.toString(): {
        userRatings.movieId: { userRatings: 3, generalRate: 4, actorRate: 5, graphicsRate: 4, scriptRate: 5 },
        "movie2": { rewatchValue: 2, generalRate: 3, actorRate: 3, graphicsRate: 4, scriptRate: 2 }
    }
}*/
/*
кусок в косинусе
let dotProductRewatchValue = 0
    let dotProductGeneralRate = 0
    let dotProductActorRate = 0
    let dotProductGraphicsRate = 0
    let dotProductScriptRate = 0

    if (otherUserRatings.criteria.rewatchValue !== undefined) {
        dotProductRewatchValue += userRatings.criteria.rewatchValue * otherUserRatings.criteria.rewatchValue;
    }
    normUser1 += userRatings.criteria.rewatchValue ** 2;
    normUser2 += (otherUserRatings.criteria.rewatchValue || 0) ** 2;*/
