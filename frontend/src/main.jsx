import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useState } from "react";
import "aos/dist/aos.js";
import "aos/dist/aos.css";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Registro from "./components/Registro.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Principal from "./components/Principal.jsx";

const App = () => {
  const [loggedUser, setLoggedUser] = useState("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setLoggedUser={setLoggedUser} />,
    },
    {
      path: "/registro",
      element: <Registro />,
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/main",
          element: <Principal loggedUser={loggedUser} />,
        },
      ],
    },
  ]);

  return (
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
