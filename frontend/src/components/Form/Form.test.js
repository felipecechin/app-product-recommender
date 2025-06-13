import { fireEvent, render, screen } from '@testing-library/react';

import { Form } from './Form.component';

jest.mock('../../hooks/useForm', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('../../data/modules/recommendations', () => ({
  __esModule: true,
  useRecommendations: jest.fn()
}));

jest.mock('../../data/modules/products', () => ({
  __esModule: true,
  useProducts: jest.fn()
}));

import { useProducts } from '../../data/modules/products';
import { useRecommendations } from '../../data/modules/recommendations';
import useForm from '../../hooks/useForm';

describe('Componente: Form', () => {
  const mockGetRecommendations = jest.fn();
  const mockHandleChange = jest.fn();
  const mockFormData = {
    selectedPreferences: ['Preference 1'],
    selectedFeatures: ['Feature 1'],
    selectedRecommendationType: 'SingleProduct'
  };

  beforeEach(() => {
    jest.clearAllMocks();

    useForm.mockReturnValue({
      formData: mockFormData,
      handleChange: mockHandleChange
    });

    useRecommendations.mockReturnValue({
      getRecommendations: mockGetRecommendations
    });

    useProducts.mockReturnValue({
      preferences: ['Preference 1'],
      features: ['Feature 1'],
      products: ['Product A'],
      isLoading: false,
      error: false
    });
  });

  it('deve exibir loading corretamente', () => {
    useProducts.mockReturnValueOnce({
      preferences: [],
      features: [],
      products: [],
      isLoading: true,
      error: false
    });

    render(<Form onUpdateRecommendations={jest.fn()} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando os dados falham ao carregar', () => {
    useProducts.mockReturnValueOnce({
      preferences: [],
      features: [],
      products: [],
      isLoading: false,
      error: true
    });

    render(<Form onUpdateRecommendations={jest.fn()} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Oops! Dados não carregados/i)).toBeInTheDocument();
  });

  it('deve enviar os dados corretamente quando o formulário for submetido', () => {
    const mockUpdateRecommendations = jest.fn();

    render(<Form onUpdateRecommendations={mockUpdateRecommendations} />);

    fireEvent.click(
      screen.getByRole('button', { name: /obter recomendação/i })
    );

    expect(mockGetRecommendations).toHaveBeenCalledWith(mockFormData);
    expect(mockUpdateRecommendations).toHaveBeenCalled();
  });
});
