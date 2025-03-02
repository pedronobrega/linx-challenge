import { Router, Request, Response } from 'express';
import productRoutes from './product.routes';

const routes = Router();

routes.use('/products', productRoutes);
routes.get('/ping', (req: Request, res: Response) => {
  const message = `Worker ${process.pid}`;
  console.log(message);
  res.end('pong');
});

export default routes;
