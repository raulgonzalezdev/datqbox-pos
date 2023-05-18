import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "graphql/client";
import SignIn from "views/Pages/SignIn.js";
import POSApp from "views/Pages/POSApp/POSApp.js";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/themeAdmin.js";
import PosLayout from "layouts/Pos.js";

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

  if (isAuthenticating) {
    return null; // Muestra un spinner de carga mientras se verifica la autenticación
  }

  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/auth/signin" element={isAuthenticated ? <Navigate to="/pos" /> : <SignIn />} />
            {/* <Route path="/pos" element={isAuthenticated ? <POSApp /> : <Navigate to="/auth/signin" />} /> */}
            <Route path={`/pos/*`} element={isAuthenticated ? <PosLayout onLogout={handleLogout} /> : <Navigate to="/auth/signin" />} />
            <Route path="/" element={isAuthenticated ? <Navigate to="/pos" /> : <Navigate to="/auth/signin" />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </ChakraProvider>
  );
}



const root = createRoot(document.getElementById('root')); 
root.render(<App />);
