import ProductDTO from '../interfaces/product.dto';

export default {
  parserCreation(payload: string): ProductDTO[] {
    const parsedPayload = JSON.parse(payload);
    return parsedPayload;
  },
};
