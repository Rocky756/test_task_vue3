import { createStore } from 'vuex';
import ProductModel from '@/models/ProductModel';
import StateProductsModel from '@/models/StateProductsModel';
import FieldsModel from '@/models/FieldsModel';

const initialValue = [
  {
    name: 'Watermelons',
    maxSupply: 100,
    category: 'Fruits, berries',
    visibility: true,
    fragile: false,
    perishable: true,
    heavyWeight: true,
    id: '1',
  },
  {
    name: 'Coca-Cola',
    maxSupply: 1000,
    category: 'Soft drinks',
    visibility: true,
    fragile: false,
    perishable: false,
    heavyWeight: false,
    id: '2',
  },
  {
    name: 'Bread',
    maxSupply: 300,
    category: 'bakery',
    visibility: true,
    fragile: false,
    perishable: true,
    heavyWeight: false,
    id: '3',
  },
  {
    name: 'Milk',
    maxSupply: 200,
    category: 'Dairy',
    visibility: true,
    fragile: false,
    perishable: true,
    heavyWeight: false,
    id: '4',
  },
];

export default createStore({
  state: {
    products: initialValue,
    currentProduct: {
      name: '',
      maxSupply: 0,
      category: '',
      visibility: false,
      fragile: false,
      perishable: false,
      heavyWeight: false,
      id: '',
    },
  },
  getters: {
    getNewProductId: (state) => String(state.products.length + 1),
    getCurrentProductById: (state: StateProductsModel) => (id: string) => {
      const current = state.products.find((product) => id === product.id);
      if (current) return current;
      return state.currentProduct;
    },
  },
  mutations: {
    addProduct(state: StateProductsModel, product: ProductModel) {
      state.products = [product, ...state.products];
    },
    deleteProduct(state: StateProductsModel, id: string) {
      state.products = state.products.filter((product) => product.id !== id);
    },
    updateProduct(state: StateProductsModel, payload: any) {
      const index = state.products.findIndex((item) => item.id === payload.id);
      state.products[index] = payload.product;
    },
  },
  actions: {
  },
  modules: {
  },
});
