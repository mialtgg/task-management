import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route } from 'react-router-dom'; // Eksik import
import Login from './components/Login';
import Home from './components/Home'; 

function App() {
  
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
