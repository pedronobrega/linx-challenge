import Product from '../models/Product.model';

interface ProductDTO {
  id: number | string;
  name: string;
}

export default {
  async create(productArray: ProductDTO[]): Promise<ProductDTO[] | null> {
    await Promise.all(
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
      }),
    );

    return productArray;
  },

  async get(productId: number): Promise<ProductDTO | undefined> {
    const product = await Product.findOne({ where: { id: productId } });
    const filteredProduct =
      (product && { id: Number(product.id), name: product.name }) || undefined;
    return filteredProduct;
  },
};
