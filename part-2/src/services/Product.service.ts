import axios from 'axios';

import Product from '../models/Product.model';
import ProductDTO from '../utils/interfaces/product.dto';
import Cache from '../cache/Cache';

export default class ProductService {
  static async create(product: ProductDTO): Promise<ProductDTO | null> {
    const validImages = await this.validateCreation(product);
    if (validImages) {
      const createdProduct = await Product.create(product);
      let { productId } = createdProduct;

      // Forcing productId to be a number
      productId = Number(productId);

      return {
        productId,
        images: validImages,
      };
    }

    return null;
  }

  static async validateCreation(product: ProductDTO): Promise<string[]> {
    const cache = new Cache();
    const { images } = product;
    const filteredImages = images.filter(async image => {
      let isValid = false;
      try {
        const urlIsValid = await cache.get(`valid-image-url:${image}`);
        if (urlIsValid === 'false') {
          const array = image.split('/');
          const imageName = array[array.length - 1];
          const response = await axios.get(
            `http://localhost:4567/images/${imageName}`,
          );
          isValid = response.status === 200 || response.status === 404;
          console.log(image);
        } else {
          isValid = true;
        }
      } catch (error) {
        console.error(error);
        isValid = false;
      }

      if (isValid) {
        cache.set(`valid-image-url:${image}`, String(isValid), 600);
      }

      return isValid;
    });

    return filteredImages;
  }
}
