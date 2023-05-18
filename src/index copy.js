import React, { Component } from "react";
import { createRoot } from 'react-dom/client';

import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "graphql/client";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import PosLayout from "layouts/Pos.js";

class App extends Component {


  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    // forceUpdate: false,
  };




  handleLogoutEvent = (event) => {
    if (event.data === "logout") {
      this.setState({ isAuthenticated: false });
    }
  };
  
  

  componentDidMount() {
    const token = localStorage.getItem("authToken"); // Leer el token del localStorage
  
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTimestamp = Math.floor(Date.now() / 1000);
  
        if (decodedToken.exp < currentTimestamp) {
          console.log("remove toekn");
          localStorage.removeItem("authToken");
        } else {
          this.setState({
            isAuthenticated: true,
          });
        }
      } catch (err) {
        localStorage.removeItem("authToken");
      }
    }
  
 
  
    this.setState({
      isAuthenticating: false,
    });
  }
  

  componentWillUnmount() {
    // Limpiar datos de autenticación al desmontar
    this.setState({
      isAuthenticated: false,
    });
    

  }

  componentDidUpdate(prevProps, prevState) {
    // Verificar si se eliminó el token de autenticación
    const prevToken = prevState.isAuthenticated
      ? localStorage.getItem("authToken")
      : null;
    const currentToken = this.state.isAuthenticated
      ? localStorage.getItem("authToken")
      : null;
    if (prevToken && !currentToken) {
      localStorage.removeItem("authToken");
      this.setState({
        isAuthenticated: false,
      });
    }
  }

  handleLogout = () => {
    localStorage.removeItem("authToken");
    // this.logoutChannel.postMessage("logout");
    this.setState({ isAuthenticated: false });
  };
  
    
 

  render() {
    if (this.state.isAuthenticating) {
      return null; // Muestra un spinner de carga mientras se verifica la autenticación
    }
   
    return (
      <HashRouter>
        <ApolloProvider client={client}>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Route
              path={`/admin`}
              render={(props) =>
                this.state.isAuthenticated ? (
                  <AdminLayout {...props} onLogout={this.handleLogout} />
                ) : (
                  <Redirect to="/auth/signin" />
                )
              }
            />
            <Route
              path={`/pos`}
              render={(props) =>
                this.state.isAuthenticated ? (
                  <PosLayout {...props} onLogout={this.handleLogout} />
                ) : (
                  <Redirect to="/auth/signin" />
                )
              }
            />
            <Redirect
              from={`/`}
              to={this.state.isAuthenticated ? "/pos" : "/auth/signin"}
            />
          </Switch>
        </ApolloProvider>
      </HashRouter>
    );
  }
}

const root = createRoot(document.getElementById('root')); 
root.render(<App />);
