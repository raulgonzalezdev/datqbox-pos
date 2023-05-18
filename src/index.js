import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate, useRoutes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "graphql/client";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/AdminLayout.js";
import RTLLayout from "layouts/RTL.js";
import PosLayout from "layouts/Pos.js";

import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import StepperForm from "views/Pages/StepperForm/StepperForm.js";
import UsersList from "views/Pages/Users/UsersList";
import PeriodsAccounting from "views/Pages/PeriodsAccounting/PeriodsAccounting.js";
import POSApp from "views/Pages/POSApp/POSApp.js";
import ProductsList from "views/Pages/Products/ProductsList.js"
import dashRoutes from "./routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const handleLogoutEvent = (event) => {
    if (event.data === "logout") {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Leer el token del localStorage

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTimestamp) {
          console.log("remove token");
          localStorage.removeItem("authToken");
        } else {
          setIsAuthenticated(true);
        }
      } catch (err) {
        localStorage.removeItem("authToken");
      }
    }

    setIsAuthenticating(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  const adminRoutes = dashRoutes.filter(route => route.layout === "/admin");
  const posRoutes = dashRoutes.filter(route => route.layout === "/pos");

  let routes = [
    {
      path: "/admin/*",
      element: <AdminLayout />,
      children: adminRoutes.map((route, key) => (
        { path: route.path, element: route.element, key }
      )),
    },
    {
      path: "/pos/*",
      element: <PosLayout />,
      children: posRoutes.map((route, key) => (
        { path: route.path, element: route.element, key }
      )),
    },
    {
      path: '/',
      element: <Navigate to={isAuthenticated ? "/pos" : "/auth/signin"} />
    }
  ];

  let element = useRoutes(routes);

  if (isAuthenticating) {
    return null; // Muestra un spinner de carga mientras se verifica la autenticación
  }

  return element;
}

function RootComponent() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  );
}

const root = createRoot(document.getElementById('root')); 
root.render(<RootComponent />);