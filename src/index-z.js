import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "graphql/client";
import AdminLayout from "layouts/AdminLayout";
import PosLayout from "layouts/Pos";
import POSApp from "views/Pages/POSApp/POSApp.js";

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
import ProductsList from "views/Pages/Products/ProductsList.js";

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

  return (
    <Router>
      {isAuthenticating ? null : (
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/pos" : "/auth/signin"} />
            }
          />
          <Route path="/admin/*">
            <AdminLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/rtlpage" element={<RTLPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/stepperform" element={<StepperForm />} />
                <Route path="/userslist" element={<UsersList />} />
                <Route
                  path="/periodsaccounting"
                  element={<PeriodsAccounting />}
                />
                <Route path="/productslist" element={<ProductsList />} />
              </Routes>
            </AdminLayout>
          </Route>
          <PosLayout>
            <Routes>
              <Route path="/pos" element={<POSApp />} />
            </Routes>
          </PosLayout>
        </Routes>
      )}
    </Router>
  );
}

function RootComponent() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<RootComponent />);
