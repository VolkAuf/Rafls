import Router from 'express'
import userRouter from './userRouter'
import getReviewRouter from "./getReviewRouter"
import createReviewRouter from "./createReviewRouter"
import authMiddleware from "../middleware/authMiddleware"

const router = Router()

router.use('/user', userRouter)
router.use('/getReview', getReviewRouter)
router.use('/createReview', authMiddleware, createReviewRouter)

export default router