import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const Header = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          KidsVideo
        </Link>
        <nav>
          {authUser ? (
            <Link to="/user-info" className="nav-link">
              Profile
            </Link>
          ) : (
            <Link to="/sign-in" className="nav-link">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
