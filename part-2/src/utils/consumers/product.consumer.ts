import ProductService from '../../services/Product.service';
import productParser from '../parsers/product.parser';
import ProductDTO from '../interfaces/product.dto';

export default {
  async consumeCreation(payload: any): Promise<ProductDTO | null> {
    try {
      const parsedProduct = JSON.parse(payload);
      const { productId, images } = parsedProduct;
      const createdProduct = await ProductService.create({ productId, images });
      return createdProduct;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
