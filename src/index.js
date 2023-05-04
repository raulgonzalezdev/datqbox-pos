import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import jwtDecode from "jwt-decode";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "graphql/client";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import PosLayout from "layouts/Pos.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

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
    return null;
  }

  return (
    <Router>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/auth/*" element={<AuthLayout onLogout={handleLogout} />} />
          <Route
            path="/admin/*"
            element={
              isAuthenticated ? (
                <AdminLayout onLogout={handleLogout} />
              ) : (
                <Navigate to="/auth/signin" />
              )
            }
          />
          <Route
            path="/pos/*"
            element={
              isAuthenticated ? (
                <PosLayout onLogout={handleLogout} />
              ) : (
                <Navigate to="/auth/signin" />
              )
            }
          />
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/auth/signin" : "/auth/signin"} />
            }
          />
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
