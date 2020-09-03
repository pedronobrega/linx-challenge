interface ProductDTO {
  id: number | string;
  name: string;
}

export default {
  create(productArray: ProductDTO[]): ProductDTO[] {
    return productArray;
  }
}
