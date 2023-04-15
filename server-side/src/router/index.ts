import { Router } from "express";
import AuthRouter from './auth'
import CompanyRouter from './company'

const router = Router();

router.use('/api/auth', AuthRouter)
router.use('/api/companies', CompanyRouter)

export default router;