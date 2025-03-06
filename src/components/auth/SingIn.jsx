import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import "./style.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function logIn(e) {
    e.preventDefault();
    let isValid = true;
    // Email validation
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }
    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }
    if (!isValid) {
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setError("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        setError("Sorry, couldn't find your account 😔");
      });
  }
  return (
    <div className="form-box">
      <form>
        <fieldset>
          <legend>Login</legend>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={emailError ? "error" : email ? "success" : ""}
          />
          {emailError && <p className="error-message">{emailError}</p>}
          <input
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={passwordError ? "error" : password ? "success" : ""}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
          {error ? <p className="error-message">{error}</p> : ""}
          <button onClick={logIn} className="button button-primary">
            Login
          </button>
          <p>
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default SignIn;
