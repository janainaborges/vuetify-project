// services/ShopService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getProducts() {
    return apiClient.get('/products');
  },
  getProduct(id) {
    return apiClient.get('/products/' + id);
  },
  postOrder(order) {
    return apiClient.post('/orders', order);
  },
};
