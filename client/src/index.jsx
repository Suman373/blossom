import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Toaster } from 'react-hot-toast';
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster position="top-center"
      reverseOrder={false} />
    <SkeletonTheme baseColor="#0000000e" highlightColor="#ececee">
      <App />
    </SkeletonTheme>
  </React.StrictMode>
);

