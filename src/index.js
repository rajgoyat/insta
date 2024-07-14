
import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import PathTo from './Routes/Route';
// import { AuthContextProvider } from './context/AuthContext';
import { FirebaseProvider } from './Firebase'
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <FirebaseProvider> 

   <PathTo/></FirebaseProvider>
   </BrowserRouter>
  </React.StrictMode>
);
