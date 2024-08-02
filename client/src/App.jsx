import './App.css';
import React, { useState } from 'react';
import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Reservation from './components/Reservation';
import Login from './components/Login';
import Admin from './components/Admin';

const router = createBrowserRouter([
  {
    path: '/admin/login',
    element: <Login/>
  },
  {
    path: '/admin',
    element: <Admin/>
  },
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/reservation',
    element: <Reservation/>
  },
]);


function App() {
  return (
    <>
        <RouterProvider router={router}/>
    </>
  );
}

export default App;