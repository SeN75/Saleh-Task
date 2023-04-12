import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
    res.send('work fine')
})

export default router;