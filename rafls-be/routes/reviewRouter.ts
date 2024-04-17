import Router from "express"
import {createReview, getReview} from "../controllers/reviewController"

const router = Router()

/**
 * @openapi
 * tags:
 *  name: Review
 *  description: The review managing API
 */

/**
 * @openapi
 * /review/create:
 *   post:
 *     tags: [Review]
 *     description: Create review
 *     consumes:
 *          - json
 *     parameters:
 *          - in: number
 *            name: movieId
 *            type: number
 *            description: movie ID
 *          - in: string
 *            name: text
 *            type: string
 *            description: review text
 *          - in: json
 *            name: criteria
 *            type: object
 *            description: rating by criteria
 *     responses:
 *       200:
 *         description: review created
 */
router.post('/create', createReview)

/**
 * @openapi
 * /review/{movieId}:
 *   get:
 *     tags: [Review]
 *     description: Get review by movie id
 *     responses:
 *       200:
 *         description: review
 */
router.get('/:id', getReview)

export default router