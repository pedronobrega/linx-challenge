import { Router, Request, Response } from 'express';
import productRoutes from './product.routes';

const router = Router();

router.get('/ping', (req: Request, res: Response) => res.send('pong'));
router.use('/products', productRoutes);

export default router;
