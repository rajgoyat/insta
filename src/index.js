// require('dotenv').config();
import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App'; // Unused import, can be removed if not needed
import PathTo from './Routes/Route'; // Ensure this file exports a valid component
// import { AuthContextProvider } from './context/AuthContext'; // Unused import
import { FirebaseProvider } from './Firebase'; // Ensure FirebaseProvider is correctly implemented
import DataProvider from './Context/DataContext'; // Ensure DataProvider is correctly implemented
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseProvider> 
        <DataProvider>
          <PathTo />
        </DataProvider>
      </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
