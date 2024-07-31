import './App.css';
import React, { useState } from 'react';
import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Reservation from './components/Reservation';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/resa',
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