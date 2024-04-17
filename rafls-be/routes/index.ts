import Router from 'express'
import userRouter from './userRouter'
import reviewRouter from "./reviewRouter"
import authMiddleware from "../middleware/authMiddleware"

const router = Router()

router.use('/user', userRouter)
router.use('/review', authMiddleware, reviewRouter)

export default router