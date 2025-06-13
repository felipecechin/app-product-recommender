import api from '../../../config/api.config';

const getProducts = async () => {
  try {
    const response = await api.get(`/products`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter os produtos:', error);
    throw error;
  }
};

const productService = {
  getProducts
};

export default productService;
