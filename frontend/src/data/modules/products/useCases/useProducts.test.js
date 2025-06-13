import { renderHook, waitFor } from '@testing-library/react';

import useProducts from './useProducts';

jest.mock('../services/product.service', () => ({
  __esModule: true,
  default: {
    getProducts: jest.fn()
  }
}));

import productService from '../services/product.service';

describe('Hook: useProducts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve buscar produtos e preencher corretamente', async () => {
    const mockProducts = [
      {
        id: 1,
        preferences: ['pref1', 'pref2', 'pref3'],
        features: ['feat1', 'feat2', 'feat3']
      },
      {
        id: 2,
        preferences: ['pref4', 'pref5'],
        features: ['feat4', 'feat5']
      }
    ];

    productService.getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.preferences.length).toBeGreaterThan(0);
    expect(result.current.features.length).toBeGreaterThan(0);
    expect(result.current.error).toBe(null);
  });

  it('Deve lidar com erro na requisição', async () => {
    const mockError = new Error('Erro ao buscar produtos');

    productService.getProducts.mockRejectedValue(mockError);

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toEqual(mockError);
    expect(result.current.products).toEqual([]);
    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);

    consoleErrorSpy.mockRestore();
  });
});
