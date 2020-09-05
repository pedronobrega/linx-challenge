import Product from '../models/Product.model';

interface ProductDTO {
  id: number | string;
  name: string;
}

export default {
  create(productArray: ProductDTO[]): ProductDTO[] | null {
    productArray.map(async product => {
      const { id, name } = product;
      if (id && name) {
        const createdProduct = await Product.create({ id: Number(id), name });
        return {
          id: createdProduct.id,
          name: createdProduct.name,
        };
      }

      return null;
    });

    return productArray;
  },
};
