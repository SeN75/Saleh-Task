import { Router } from "express";
import AuthRouter from './auth'
import CompanyRouter from './company'

const router = Router();

router.use('/api/auth', AuthRouter)
router.use('/api/company', CompanyRouter)

export default router;