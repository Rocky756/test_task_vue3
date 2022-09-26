import ProductModel from './ProductModel';

export default interface StateProductsModel {
  products: Array<ProductModel>;
  currentProduct: ProductModel;
};
