import { Router } from 'express';
import ProductController from '../controllers/Product.controller';

const routes = Router();

routes.post('/', ProductController.create);

export default routes;
