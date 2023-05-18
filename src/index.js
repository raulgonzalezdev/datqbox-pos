import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "graphql/client";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import PosLayout from "layouts/Pos.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  if (isAuthenticating) {
    return null; // Muestra un spinner de carga mientras se verifica la autenticación
  }

  return (
    <Router>
      <ApolloProvider client={client}>
        <Routes>
          <Route path={`/auth/*`} element={<AuthLayout />} />
          <Route path={`/admin/*`} element={isAuthenticated ? <AdminLayout onLogout={handleLogout} /> : <Navigate to="/auth/signin" />} />
          <Route path={`/pos/*`} element={isAuthenticated ? <PosLayout onLogout={handleLogout} /> : <Navigate to="/auth/signin" />} />
          <Route path={`/`} element={<Navigate to={isAuthenticated ? "/pos" : "/auth/signin"} />} />
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

const root = createRoot(document.getElementById('root')); 
root.render(<App />);
