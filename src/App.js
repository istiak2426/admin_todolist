import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import { HashRouter, Route, Link, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { firebaseApp } from "./Firebase";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [authed, setAuthed] = useState(false);
  const [userid, setUserid] = useState(null);
  const [email, setEmail] = useState(null);
  const removeFirebaseEvent = useRef(null);

  useEffect(() => {
    removeFirebaseEvent.current = firebaseApp
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          setAuthed(true);
          setUserid(user.uid);
          setEmail(user.email);
        } else {
          setAuthed(false);
        }
      });

    return () => {
      removeFirebaseEvent.current();
    };
  }, []);

  const logout = () => {
    firebaseApp.auth().signOut();
  };

  return (
    <HashRouter>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            React Firebase Authentication User Based Todo List (functional component)
          </h2>
        </div>

        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <ul className="nav navbar-nav pull-right">
              <li>
                <Link to="/dashboard" className="navbar-brand">
                  Dashboard
                </Link>
              </li>
              <li>
                {authed ? (
                  <button
                    style={{ border: "none", background: "transparent" }}
                    className="navbar-brand"
                    onClick={logout}
                  >
                    Logout
                  </button>
                ) : (
                  <span>
                    <Link to="/login" className="navbar-brand">
                      Login
                    </Link>
                    <Link to="/register" className="navbar-brand">
                      Register
                    </Link>
                  </span>
                )}
              </li>
            </ul>
          </div>
        </nav>
        {!authed ? (
          <div className="container">
            <h3>Please login if you are an existing user.</h3>
            <hr />
            <h3>Please register if you are not registered to use the app.</h3>
          </div>
        ) : (
          ""
        )}
        <div>
          <Route
            path="/"
            render={() => (authed ? <Redirect to="/dashboard" /> : <div></div>)}
          />
          <Route
            path="/login"
            render={() => (authed ? <Redirect to="/dashboard" /> : <Login />)}
          />
          <Route
            path="/dashboard"
            render={() =>
              authed ? (
                <Dashboard userid={userid} email={email} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route path="/register" component={Register} />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
