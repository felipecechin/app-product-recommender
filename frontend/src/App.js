import React, { useRef, useState } from 'react';

import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import LogoRdStation from './components/shared/LogoRdStation';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const recommendationListRef = useRef(null);

  function handleUpdateRecommendations(newRecommendations) {
    setRecommendations(newRecommendations);

    // espera um pouco para garantir que a lista de recomendações seja atualizada antes de rolar
    setTimeout(() => {
      recommendationListRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col items-center pt-10 pb-10 pl-2 pr-2'>
      <h1 className='text-3xl font-bold mb-8 flex items-center justify-center gap-4 px-4 w-full md:w-5/6 lg:w-4/6 xl:w-1/2'>
        <LogoRdStation className='w-8 h-8 flex-shrink-0' />
        <span>Recomendador de Produtos RD Station</span>
      </h1>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full md:w-5/6 lg:w-4/6 xl:w-1/2 flex flex-col gap-8'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <p className='text-lg'>
              Bem-vindo ao Recomendador de Produtos RD Station! Aqui, você pode
              encontrar uma variedade de produtos da RD Station, cada um
              projetado para atender às necessidades específicas do seu negócio.
              De CRM a Marketing, de Conversas a Inteligência Artificial, temos
              uma solução para ajudar você a alcançar seus objetivos.
            </p>
            <p className='text-base font-semibold'>
              Use o formulário abaixo para selecionar suas preferências e
              funcionalidades desejadas e receba recomendações personalizadas de
              produtos que melhor atendam às suas necessidades.
            </p>
            <p className='text-sm text-gray-600'>
              Selecione pelo menos uma preferência ou uma funcionalidade para
              obter recomendações e escolha o tipo de recomendação que deseja
              receber.
            </p>
          </div>
          <Form onUpdateRecommendations={handleUpdateRecommendations} />
        </div>
        <RecommendationList
          ref={recommendationListRef}
          recommendations={recommendations}
        />
      </div>

      <footer className='mt-8 text-gray-600 text-sm'>
        <p>
          Desenvolvido por{' '}
          <a
            href='https://www.linkedin.com/in/felipe-cechin/'
            target='_blank'
            rel='noreferrer'
            className='text-blue-500 hover:underline'
          >
            Felipe Cechin
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
