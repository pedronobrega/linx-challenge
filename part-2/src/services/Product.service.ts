import Product from '../models/Product.model';
import ProductDTO from '../utils/interfaces/product.dto';

export default class ProductService {
  static async create(product: ProductDTO): Promise<ProductDTO> {
    const { productId, images } = await Product.create(product);
    return {
      productId,
      images,
    };
  }
}
