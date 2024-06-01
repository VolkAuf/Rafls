import Router from "express"
import {
    createReview,
} from "../controllers/createReviewController"

const router = Router()

/**
 * @openapi
 * tags:
 *  name: CreateReview
 *  description: The review managing API
 */

/**
 * @openapi
 * /createReview/create:
 *   post:
 *     tags: [Review]
 *     description: Create review
 *     consumes:
 *          - json
 *     parameters:
 *          - in: string
 *            name: text
 *            type: string
 *            description: review text
 *          - in: json
 *            name: criteria
 *            type: object
 *            description: rating by criteria
 *          - in: number
 *            name: movieId
 *            type: number
 *            description: movie ID
 *          - in: string
 *            name: movieName
 *            type: string
 *            description: movie name
 *     responses:
 *       200:
 *         description: review created
 */
router.post('/create', createReview)


export default router