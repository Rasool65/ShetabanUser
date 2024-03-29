import React, { StrictMode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import { AbilityContext } from './utility/context/Can';
import ability from './configs/acl/ability';
import { ThemeContext } from './utility/context/ThemeColors';
import { ToastContainer } from 'react-toastify';
import './assets/fonts/feather/iconfont.css';
// import './scss/core.scss';
import './scss/react/app-loader.scss';
import Spinner from './components/spinner/Fallback-spinner';
import './configs/i18n';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '@styles/react/libs/toastify/toastify.scss';

// ** i18n
import './configs/i18n';

const LazyApp = lazy(() => import('./App'));

ReactDOM.render(
  <Provider store={Store}>
    {/* <Suspense fallback={<Spinner />}> */}
    <Suspense fallback={<></>}>
      <AbilityContext.Provider value={ability}>
        <ThemeContext>
          <LazyApp />
          <ToastContainer newestOnTop />
        </ThemeContext>
      </AbilityContext.Provider>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
