import Router from "express"
import {
    getReview,
    getAllReviews,
    getReviewsByMovieId,
    getReviewsByUserId,
    setReviewsByMovieId
} from "../controllers/getReviewController"

const router = Router()

/**
 * @openapi
 * tags:
 *  name: GetReview
 *  description: The review managing API
 */



/**
 * @openapi
 * /getReview/all:
 *   get:
 *     tags: [Review]
 *     description: Get reviews
 *     responses:
 *       200:
 *         description: reviews
 */
router.get('/all', getAllReviews)



/**
 * @openapi
 * /getReview/all/byUId/{userId}:
 *   get:
 *     tags: [Review]
 *     description: Get reviews by userId
 *     responses:
 *       200:
 *         description: reviews
 */
router.get('/all/byUId', getReviewsByUserId)



/**
 * @openapi
 * /getReview/all/byMId/{movieId}:
 *   get:
 *     tags: [Review]
 *     description: Get reviews by movieId
 *     responses:
 *       200:
 *         description: reviews
 */
router.get('/all/byMId/:id', getReviewsByMovieId)


/**
 * @openapi
 * /getReview/all/byMId/{movieId},{rate}:
 *   get:
 *     tags: [Review]
 *     description: Get reviews by movieId, and set rate from kp if reviews are empty
 *     responses:
 *       200:
 *         description: reviews
 */
router.get('/all/setByMId/:id', setReviewsByMovieId)


export default router