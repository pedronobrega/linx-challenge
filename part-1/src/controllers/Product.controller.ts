import { Request, Response } from 'express';
import { isArray } from 'util';
import Cache from '../cache/Cache';
import ProductService from '../services/Product.service';

interface ProductDTO {
  id: number | string;
  name: string;
}

export default {
  async create(req: Request, res: Response) {
    const body = req.body;

    if (body) {
      const stringfyiedBody = JSON.stringify(body);
      const cached = await Cache.get(stringfyiedBody);

      if (cached) {
        res.sendStatus(403);
      } else {
        Cache.set(stringfyiedBody, stringfyiedBody);

        await ProductService.create(body);

        res.send('OK');
      }
    }
  },
};
