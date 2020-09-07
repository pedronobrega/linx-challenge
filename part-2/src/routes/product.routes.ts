import { Router, Request, Response } from 'express';
import ProductController from '../controllers/Product.controller';

const router = Router();

router.post('/', ProductController.create);

export default router;
