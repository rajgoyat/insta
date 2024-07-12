
import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import PathTo from './Routes/Route';
// import { AuthContextProvider } from './context/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <AuthContextProvider> */}
   <PathTo/>
   {/* </AuthContextProvider> */}
  </React.StrictMode>
);
