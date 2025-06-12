// Preferences.js

import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange
}) {
  const [currentPreferences, setCurrentPreferences] =
    useState(selectedPreferences);

  const handlePreferenceChange = preference => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter(pref => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

  return (
    <div className='bg-white rounded-md shadow-md p-4 flex flex-col gap-4'>
      <h2 className='text-lg font-bold'>⚙ Preferências:</h2>
      <ul>
        {preferences.map((preference, index) => (
          <li
            key={index}
            className='mb-2'
          >
            <Checkbox
              value={preference}
              checked={currentPreferences.includes(preference)}
              onChange={() => handlePreferenceChange(preference)}
              className='text-blue-500'
            >
              {preference}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Preferences;
