import { Request, Response } from 'express';

export default class ProductController {
  static async create(req: Request, res: Response): Promise<void> {
    res.send('Ok');
  }
}
