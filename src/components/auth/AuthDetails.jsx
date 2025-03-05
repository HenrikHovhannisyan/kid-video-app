import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";

const AuthDetails = () => {
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
    function userSignOut() {
        signOut(auth)
            .then(() => console.log("success"))
            .catch((e) => console.log(e));
    }
    return (
        <div>
            {authUser ? (
                <div>
                    <p>{`Signed in as ${authUser.email}`}</p>
                    <button onClick={userSignOut}>Sign Out</button>
                </div>
            ) : (
                <p>Signed Out</p>
            )}
        </div>
    );
};

export default AuthDetails;
