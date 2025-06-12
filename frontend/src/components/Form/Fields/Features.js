import React, { useState } from 'react';

import Checkbox from '../../shared/Checkbox';

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures);

  const handleFeatureChange = feature => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(pref => pref !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    onFeatureChange(updatedFeatures);
  };

  return (
    <div className='bg-white rounded-md shadow-md p-4 flex flex-col gap-4'>
      <h2 className='text-lg font-bold'>🧰 Funcionalidades:</h2>
      <ul>
        {features.map((feature, index) => (
          <li
            key={index}
            className='mb-2'
          >
            <Checkbox
              value={feature}
              checked={currentFeatures.includes(feature)}
              onChange={() => handleFeatureChange(feature)}
              className='text-green-500'
            >
              {feature}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Features;
