import { forwardRef } from 'react';

export const RecommendationList = forwardRef(({ recommendations }, ref) => {
  if (recommendations.length === 0) {
    return null;
  }

  const isSingle = recommendations.length === 1;

  return (
    <div
      ref={ref}
      className='bg-green-100 rounded-md shadow-md p-4 flex flex-col gap-4 animate-fade-in'
    >
      <h2 className='text-lg font-bold'>
        ✅ {isSingle ? 'Recomendação:' : 'Lista de Recomendações:'}
      </h2>

      <ul className='space-y-2'>
        {recommendations.map((recommendation, index) => (
          <li
            key={index}
            tabIndex={0}
            className='bg-white rounded border border-gray-200 shadow-sm p-3 flex items-center gap-2'
          >
            <span className='text-green-600 text-lg'>✔</span>
            <p className='font-medium text-gray-800'>{recommendation.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
});
