import { Request, Response } from 'express';
import { isArray } from 'util';

interface ProductDTO {
  id: number | string;
  name: string;
}

export default {
  create(req: Request, res: Response): void {
    const body = req.body;
    const products: ProductDTO[] = [];

    if (isArray(body)) {
      body.forEach((mappedBody: ProductDTO) => {
        const { id, name } = mappedBody;
        products.push({ id, name });
      });
    }

    res.json(products);
  },
};
