import express from 'express'
import {products,deleted} from '../controller/user.controller.js'
const router=express.Router();
router.post("/products",products)
router.post("/delete/:id",deleted)
export default router;