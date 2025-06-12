// useRecommendations.js

import { useState } from 'react';

import recommendationService from '../services/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = formData => {
    const recommendProducts = recommendationService.getRecommendations(
      formData,
      products
    );
    setRecommendations(recommendProducts);
    return recommendProducts;
  };

  return { recommendations, getRecommendations, setRecommendations };
}

export default useRecommendations;
