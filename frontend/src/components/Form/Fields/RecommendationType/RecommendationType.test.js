import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RecommendationType } from './RecommendationType.component';

jest.mock('../../../shared/Radio', () => ({
  __esModule: true,
  default: ({ children, value, onChange }) => (
    <label>
      <input
        type='radio'
        name='recommendationType'
        value={value}
        onChange={onChange}
      />
      {children}
    </label>
  )
}));

describe('Componente: RecommendationType', () => {
  it('Deve chamar a função de callback com "SingleProduct" ao clicar na primeira opção', () => {
    const onRecommendationTypeChange = jest.fn();

    render(
      <RecommendationType
        onRecommendationTypeChange={onRecommendationTypeChange}
      />
    );

    const radio = screen.getByLabelText('Produto Único');
    userEvent.click(radio);

    expect(onRecommendationTypeChange).toHaveBeenCalledWith('SingleProduct');
  });

  it('Deve chamar a função de callback com "MultipleProducts" ao clicar na segunda opção', () => {
    const onRecommendationTypeChange = jest.fn();

    render(
      <RecommendationType
        onRecommendationTypeChange={onRecommendationTypeChange}
      />
    );

    const radio = screen.getByLabelText('Múltiplos Produtos');
    userEvent.click(radio);

    expect(onRecommendationTypeChange).toHaveBeenCalledWith('MultipleProducts');
  });

  it('Deve renderizar as duas opções corretamente', () => {
    render(<RecommendationType onRecommendationTypeChange={() => {}} />);

    expect(screen.getByLabelText('Produto Único')).toBeInTheDocument();
    expect(screen.getByLabelText('Múltiplos Produtos')).toBeInTheDocument();
  });
});
