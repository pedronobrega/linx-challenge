import axios from 'axios';

import Product from '../models/Product.model';
import ProductDTO from '../utils/interfaces/product.dto';
import Cache from '../cache/Cache';

export default class ProductService {
  static async create(product: ProductDTO): Promise<ProductDTO | null> {
    const validImages = await this.validateCreation(product);
    if (validImages.length > 0) {
      const createdProduct = await Product.create({
        productId: product.productId,
        images: validImages,
      });
      let { productId } = createdProduct;

      // Forcing productId to be a number
      productId = Number(productId);

      return {
        productId,
        images: createdProduct.images,
      };
    }

    return null;
  }

  static async validateCreation(product: ProductDTO): Promise<string[]> {
    const cache = new Cache();
    const { images } = product;

    // eslint-disable-next-line prefer-const
    let filteredImages: string[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const image of images) {
      let isValid = false;

      const array = image.split('/');
      const imageName = array[array.length - 1];

      // eslint-disable-next-line no-await-in-loop
      const cachedUrl = await cache.get(`valid-image-url:${imageName}`);
      try {
        if (cachedUrl.length > 0 && !(cachedUrl === '1')) {
          // eslint-disable-next-line no-await-in-loop
          const response = await axios.get(image);
          isValid = (response && response.status === 200) || false;
        } else {
          isValid = true;
        }
      } catch (error) {
        console.error(error);
        isValid = false;
      }

      const cacheValue = String((isValid && 1) || 0);

      // eslint-disable-next-line no-await-in-loop
      await cache.set(`valid-image-url:${imageName}`, cacheValue, 600);

      if (isValid) {
        filteredImages.push(image);
      }
    }

    return filteredImages;
  }
}
