import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Preferences } from './Preferences.component';

describe('Componente: Preferences', () => {
  it('Deve adicionar uma nova preferência ao clicar', () => {
    const preferences = ['Preference 1', 'Preference 2', 'Preference 3'];
    const selectedPreferences = ['Preference 1'];
    const onPreferenceChange = jest.fn();

    render(
      <Preferences
        preferences={preferences}
        selectedPreferences={selectedPreferences}
        onPreferenceChange={onPreferenceChange}
      />
    );

    const checkbox = screen.getByLabelText('Preference 2');
    userEvent.click(checkbox);

    expect(onPreferenceChange).toHaveBeenCalledWith([
      'Preference 1',
      'Preference 2'
    ]);
  });

  it('Deve remover uma preferência existente ao desmarcar', () => {
    const preferences = ['Preference 1', 'Preference 2'];
    const selectedPreferences = ['Preference 1', 'Preference 2'];
    const onPreferenceChange = jest.fn();

    render(
      <Preferences
        preferences={preferences}
        selectedPreferences={selectedPreferences}
        onPreferenceChange={onPreferenceChange}
      />
    );

    const checkbox = screen.getByLabelText('Preference 2');
    userEvent.click(checkbox);

    expect(onPreferenceChange).toHaveBeenCalledWith(['Preference 1']);
  });
});
