import "./App.css";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Reservation from "./components/Reservation";
import Login from "./components/Login";
import Admin from "./components/Admin";
import RouteProtector from './components/RouteProtector'

const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <RouteProtector>
        <Admin />
      </RouteProtector>
    ),
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/reservation",
    element: <Reservation />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
