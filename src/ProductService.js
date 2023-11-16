// src/ProductService.js
import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

const ProductService = {
  getProducts: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data.products; 
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
};

export default ProductService;