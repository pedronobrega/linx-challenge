import Product from '../models/Product.model';
import ProductDTO from '../utils/interfaces/product.dto';

export default class ProductService {
  static async create(product: ProductDTO): Promise<ProductDTO> {
    const createdProduct = await Product.create(product);
    const { images } = createdProduct;
    let { productId } = createdProduct;

    // Forcing productId to be a number
    productId = Number(productId);

    return {
      productId,
      images,
    };
  }
}
