export function SubmitButton({
  text,
  hasSelectedRecommendationType,
  hasSelectedAnyPreferenceOrFeature
}) {
  return (
    <div className='bg-white rounded-md shadow-md p-4 flex flex-col gap-4'>
      <p className='text-sm font-light'>
        {!hasSelectedAnyPreferenceOrFeature
          ? 'Selecione pelo menos uma preferência ou funcionalidade.'
          : !hasSelectedRecommendationType
            ? 'Selecione o tipo de recomendação.'
            : 'Pronto! Você já pode receber recomendações de produtos.'}
      </p>
      <button
        type='submit'
        disabled={
          !hasSelectedRecommendationType || !hasSelectedAnyPreferenceOrFeature
        }
        className='bg-blue-500 hover:enabled:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-60 my-auto'
      >
        {text}
      </button>
    </div>
  );
}
