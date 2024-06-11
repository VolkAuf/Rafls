import { ReviewCriteriaType, ReviewType } from "./model.ts";
import { GetAllReviews } from "./api.ts";

export enum CriteriaType {
    rewatchValue = 1,
    generalRate = 2,
    actorRate = 3,
    graphicsRate = 4,
    scriptRate = 6,
}

// Функция для получения рекомендаций
export const GetRecommendations = (userId?: number) => {
    const { data: reviews } = GetAllReviews();
    if (!reviews || !userId) return [];

    const similarities = getSimilaritiesUsers(userId, reviews);
    return CalculateBySimilarities(reviews, userId, similarities);
}

// Функция для получения сходств с другими пользователями
export const getSimilaritiesUsers = (userId: number, reviews: ReviewType[]) => {
    const userReviews = reviews.filter(r => r.userId === userId);
    const otherUserReviews = reviews.filter(r => r.userId !== userId);

    if (!userReviews.length || !otherUserReviews.length) return [];

    const sim: { [key: number]: number } = {}; // Словарь для хранения сходств

    otherUserReviews.forEach(other => {
        sim[other.userId] = 0; // Инициализация словаря
    });

    const similarities = otherUserReviews.map(other => {
        const userReview = userReviews.find(value => value.movieId === other.movieId);
        if (!userReview) return { userId: other.userId, similarity: 0 }; // Если нет совпадения по фильму, сходство 0

        return {
            userId: other.userId,
            similarity: distСosinus(userReview.criteria, other.criteria)
        };
    });

    // Сортировка по сходству и возврат топ-N пользователей
    similarities.sort((a, b) => b.similarity - a.similarity);
    return similarities.slice(0, 5); // Вернуть топ-5 похожих пользователей
};

// Функция для вычисления косинусного сходства
export const distСosinus = (userRatings: ReviewCriteriaType, otherUserRatings: ReviewCriteriaType): number => {
    let dotProduct = 0;
    let normUser1 = 0;
    let normUser2 = 0;

    const keys = Object.keys(userRatings) as (keyof ReviewCriteriaType)[];

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

// Функция для вычисления рекомендаций по сходствам
export const CalculateBySimilarities = (reviews: ReviewType[], userId: number, similarities?: { userId: number, similarity: number }[]) => {
    if (!similarities) return [];

    const recommendedMovies: { [movieId: number]: number } = {};
    for (const similarity of similarities) {
        const otherUserId = similarity.userId;
        const otherUserReviews = reviews.filter(r => r.userId === otherUserId);

        if (!otherUserReviews.length) continue; // Переходим к следующему элементу в цикле

        for (const review of otherUserReviews) {
            const movieId = review.movieId;

            // Проверяем, оценил ли пользователь этот фильм
            if (!reviews.some(value => value.userId === userId && value.movieId === movieId)) {
                // Если пользователь не оценивал этот фильм, суммируем сходство
                recommendedMovies[movieId] = (recommendedMovies[movieId] || 0) + similarity.similarity;
            }
        }
    }

    // Сортируем фильмы по суммарной сходности и возвращаем топ-N рекомендаций
    const sortedMovies = Object.entries(recommendedMovies)
        .sort((a, b) => b[1] - a[1])
        .map(([movieId, _]) => parseInt(movieId, 10))
        .slice(0, 50);

    return sortedMovies;
}

export const GetRecommendationsByCriteria = (criteriaType: CriteriaType, userId?: number) => {
    const { data: reviews } = GetAllReviews();
    if (!reviews || !userId) return [];

    const similarities = getSimilaritiesUsersByCriteria(userId, reviews, criteriaType);
    return CalculateBySimilarities(reviews, userId, similarities);
}

export const getSimilaritiesUsersByCriteria = (userId: number, reviews: ReviewType[], criteriaType: CriteriaType) => {
    const userReviews = reviews.filter(r => r.userId === userId);
    const otherUserReviews = reviews.filter(r => r.userId !== userId);

    if (!userReviews.length || !otherUserReviews.length) return [];

    let similarities: { userId: number, similarity: number }[] = [];
    switch (criteriaType) {
        case CriteriaType.rewatchValue:
            similarities = otherUserReviews.map(other => ({
                userId: other.userId,
                similarity: distCosineByInt(userReviews[0].criteria.rewatchValue, other.criteria.rewatchValue) // Сравнение только на основе одного обзора
            }));
            break;
        case CriteriaType.generalRate:
            similarities = otherUserReviews.map(other => ({
                userId: other.userId,
                similarity: distCosineByInt(userReviews[0].criteria.generalRate, other.criteria.generalRate) // Сравнение только на основе одного обзора
            }));
            break;
        case CriteriaType.actorRate:
            similarities = otherUserReviews.map(other => ({
                userId: other.userId,
                similarity: distCosineByInt(userReviews[0].criteria.actorRate, other.criteria.actorRate) // Сравнение только на основе одного обзора
            }));
            break;
        case CriteriaType.graphicsRate:
            similarities = otherUserReviews.map(other => ({
                userId: other.userId,
                similarity: distCosineByInt(userReviews[0].criteria.graphicsRate, other.criteria.graphicsRate) // Сравнение только на основе одного обзора
            }));
            break;
        case CriteriaType.scriptRate:
            similarities = otherUserReviews.map(other => ({
                userId: other.userId,
                similarity: distCosineByInt(userReviews[0].criteria.scriptRate, other.criteria.scriptRate) // Сравнение только на основе одного обзора
            }));
            break;
    }

    // Сортировка по сходству и возврат топ-N пользователей
    similarities.sort((a, b) => b.similarity - a.similarity);
    return similarities.slice(0, 5); // Вернуть топ-5 похожих пользователей
};

export const distCosineByInt = (userRatings: number, otherUserRatings: number): number => {
    let dotProduct = 0;
    if (otherUserRatings !== undefined) {
        dotProduct += userRatings * otherUserRatings;
    }

    const normUser1 = userRatings;
    const normUser2 = (otherUserRatings || 0);
    if (normUser1 === 0 || normUser2 === 0) {
        return 0; // Избегаем деления на ноль
    }

    return dotProduct / (normUser1 * normUser2);
}