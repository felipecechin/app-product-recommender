import { render, screen } from '@testing-library/react';

import { SubmitButton } from './SubmitButton.component';

describe('Componente: SubmitButton', () => {
  it('Deve mostrar aviso para selecionar uma preferência ou funcionalidade', () => {
    render(
      <SubmitButton
        text='Enviar'
        hasSelectedRecommendationType={false}
        hasSelectedAnyPreferenceOrFeature={false}
      />
    );

    expect(
      screen.getByText(
        'Selecione pelo menos uma preferência ou funcionalidade.'
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeDisabled();
  });

  it('Deve mostrar aviso para selecionar o tipo de recomendação', () => {
    render(
      <SubmitButton
        text='Enviar'
        hasSelectedRecommendationType={false}
        hasSelectedAnyPreferenceOrFeature={true}
      />
    );

    expect(
      screen.getByText('Selecione o tipo de recomendação.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeDisabled();
  });

  it('Deve mostrar mensagem final e habilitar o botão quando tudo estiver selecionado', () => {
    render(
      <SubmitButton
        text='Enviar'
        hasSelectedRecommendationType={true}
        hasSelectedAnyPreferenceOrFeature={true}
      />
    );

    expect(
      screen.getByText(
        'Pronto! Você já pode receber recomendações de produtos.'
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeEnabled();
  });

  it('Deve desabilitar o botão se apenas recomendação estiver selecionada, mas não preferências', () => {
    render(
      <SubmitButton
        text='Enviar'
        hasSelectedRecommendationType={true}
        hasSelectedAnyPreferenceOrFeature={false}
      />
    );

    expect(screen.getByRole('button', { name: 'Enviar' })).toBeDisabled();
  });
});
