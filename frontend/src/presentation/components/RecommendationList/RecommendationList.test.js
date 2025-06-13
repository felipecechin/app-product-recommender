import { render, screen } from '@testing-library/react';

import { RecommendationList } from './RecommendationList.component';

describe('Componente: RecommendationList', () => {
  it('Não deve renderizar nada quando não há recomendações', () => {
    const { container } = render(<RecommendationList recommendations={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('Deve exibir o título singular quando há uma recomendação', () => {
    const recommendations = [{ name: 'Produto A' }];
    render(<RecommendationList recommendations={recommendations} />);

    expect(screen.getByText('✅ Recomendação:')).toBeInTheDocument();
    expect(screen.getByText('Produto A')).toBeInTheDocument();
  });

  it('Deve exibir o título plural quando há múltiplas recomendações', () => {
    const recommendations = [{ name: 'Produto A' }, { name: 'Produto B' }];
    render(<RecommendationList recommendations={recommendations} />);

    expect(screen.getByText('✅ Lista de Recomendações:')).toBeInTheDocument();
    expect(screen.getByText('Produto A')).toBeInTheDocument();
    expect(screen.getByText('Produto B')).toBeInTheDocument();
  });
});
