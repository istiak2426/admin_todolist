import React, { useState } from "react";
import { firebaseApp, users } from "../Firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ message: "" });

  const register = () => {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const thisUser = users.child(user.uid);
        const userdetail = thisUser.child("userdetail");
        const dataToInsert = { email: user.email, userid: user.uid };
        userdetail.set(dataToInsert);
      })
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
          onClick={register}
        >
          Register
        </button>

        <div>{error.message}</div>
      </div>
    </div>
  );
};

export default Register;
