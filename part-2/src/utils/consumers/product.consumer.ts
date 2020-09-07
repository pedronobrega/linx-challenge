import ProductService from '../../services/Product.service';
import productParser from '../parsers/product.parser';
import ProductDTO from '../interfaces/product.dto';

export default {
  async consumeCreation(payload: any): Promise<ProductDTO | null> {
    try {
      const parsedProduct = JSON.parse(payload);
      const { productId, images, image } = parsedProduct;
      const parsedImage = images || [image];

      const product = { productId, images: parsedImage };
      const createdProduct = await ProductService.create(product);
      return createdProduct;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
