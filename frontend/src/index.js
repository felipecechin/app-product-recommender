import './index.css';
import './tailwind.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './presentation/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
