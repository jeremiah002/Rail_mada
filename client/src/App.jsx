import './App.css';
import React, { useState } from 'react';
import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Reservation from './components/Reservation';
import Login from './components/Login';
import Signup from './components/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/home',
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