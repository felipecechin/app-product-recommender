import React from 'react';

import Radio from '../../shared/Radio';

function RecommendationType({ onRecommendationTypeChange }) {
  return (
    <div className='bg-white rounded-md shadow-md p-4 flex flex-col gap-4'>
      <h2 className='text-lg font-bold'>🎯 Tipo de Recomendação:</h2>
      <div className='flex items-center gap-10'>
        <div className='flex items-center'>
          <Radio
            name='recommendationType'
            value='SingleProduct'
            onChange={() => onRecommendationTypeChange('SingleProduct')}
          >
            Produto Único
          </Radio>
        </div>
        <div className='flex items-center'>
          <Radio
            name='recommendationType'
            value='MultipleProducts'
            onChange={() => onRecommendationTypeChange('MultipleProducts')}
          >
            Múltiplos Produtos
          </Radio>
        </div>
      </div>
    </div>
  );
}

export default RecommendationType;
