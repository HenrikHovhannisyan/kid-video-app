import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import "./style.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [copyPasswordError, setCopyPasswordError] = useState("");
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function register(e) {
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
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Password confirmation check
    if (!copyPassword) {
      setCopyPasswordError("Please confirm your password");
      isValid = false;
    } else if (copyPassword !== password) {
      setCopyPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setCopyPasswordError("");
    }

    if (!isValid) {
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setError("");
        setEmail("");
        setCopyPassword("");
        setPassword("");
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="form-box">
      <form onSubmit={register}>
        <fieldset>
          <legend>Registration</legend>
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
          <input
            placeholder="Confirm your password"
            value={copyPassword}
            onChange={(e) => setCopyPassword(e.target.value)}
            type="password"
            className={
              copyPasswordError ? "error" : copyPassword ? "success" : ""
            }
          />
          {copyPasswordError && (
            <p className="error-message">{copyPasswordError}</p>
          )}
          {error ? <p className="error-message">{error}</p> : ""}
          <button className="button button-primary">Create</button>
          <p>
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
