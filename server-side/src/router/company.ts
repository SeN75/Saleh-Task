import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {

 return   res.status(200).send('auth work fine')
})

export default router;