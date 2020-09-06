import { Request, Response } from 'express';
import Cache from '../cache/Cache';
import ProductService from '../services/Product.service';

interface ProductDTO {
  id: number | string;
  name: string;
}

const cacheModel = new Cache();

export default {
  async create(req: Request, res: Response) {
    const body = req.body;

    if (body) {
      const stringfyiedBody = JSON.stringify(body);
      const cached = await cacheModel.get(stringfyiedBody);

      if (cached) {
        res.sendStatus(403);
      } else {
        cacheModel.set(stringfyiedBody, stringfyiedBody, 600);

        try {
          body.map((product: ProductDTO) => ({
            id: product.id,
            name: product.name,
          }));
        } catch (error) {
          console.log(error);
          res.sendStatus(400);
        }

        await ProductService.create(body);

        res.send('OK');
      }
    }
  },
};
