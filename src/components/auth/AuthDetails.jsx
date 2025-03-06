import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import AddVideo from "../videos/AddVideo";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

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

  function userSignOut() {
    signOut(auth)
      .then(() => {
        console.log("success");
        navigate("/");
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className="user-info">
      {authUser ? (
        <>
          <div className="auth-details">
            <h2>User info</h2>
            <p>{`Signed in as ${authUser.email}`}</p>
            <button onClick={userSignOut} className="button button-primary">
              Sign Out
            </button>
          </div>
          <AddVideo />
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;
