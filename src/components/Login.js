import React, { useState } from "react";
import { firebaseApp } from "../Firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ message: "" });

  const login = () => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => setError(error));
  };

  return (
    <div className="container" style={{ margin: "5%" }}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter Email"
          className="form-control"
          style={{ margin: "10px" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="form-control"
          style={{ margin: "10px" }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary"
          style={{ margin: "10px" }}
          onClick={login}
        >
          Login
        </button>
        <div>{error.message}</div>
      </div>
    </div>
  );
};

export default Login;
