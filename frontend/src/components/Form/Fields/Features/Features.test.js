import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Features } from './Features.component';

describe('Componente: Features', () => {
  it('Deve chamar a função de callback ao clicar em uma opção', () => {
    const features = ['Feature 1', 'Feature 2', 'Feature 3'];
    const selectedFeatures = ['Feature 1'];
    const onFeatureChange = jest.fn();

    render(
      <Features
        features={features}
        selectedFeatures={selectedFeatures}
        onFeatureChange={onFeatureChange}
      />
    );

    const checkbox = screen.getByLabelText('Feature 2');
    userEvent.click(checkbox);

    expect(onFeatureChange).toHaveBeenCalledWith(['Feature 1', 'Feature 2']);
  });

  it('Deve remover uma feature existente ao desmarcar', () => {
    const features = ['Feature 1', 'Feature 2'];
    const selectedFeatures = ['Feature 1', 'Feature 2'];
    const onFeatureChange = jest.fn();

    render(
      <Features
        features={features}
        selectedFeatures={selectedFeatures}
        onFeatureChange={onFeatureChange}
      />
    );

    const checkbox = screen.getByLabelText('Feature 2');
    userEvent.click(checkbox);

    expect(onFeatureChange).toHaveBeenCalledWith(['Feature 1']);
  });
});
