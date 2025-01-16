import { deleteProduct, getProductById, getProducts, postProduct, putProduct } from "./products.js";
import { getChatRooms, getOrders, getStatistics } from "./other.js";

export const api = {
  products: {
    getProducts,
    getProductById,
    putProduct,
    postProduct,
    deleteProduct
  },
  other: {
    getStatistics,
    getOrders,
    getChatRooms
  }
};