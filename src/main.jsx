import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SkeletonTheme>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </SkeletonTheme>
    </Provider>
  </StrictMode>
);
