import React, { Children, useContext, useEffect, useState } from "react";
import { auth, database, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDoc, getDocs, query, where } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const init = async (id) => {
  database.initialiseRoot(id);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  async function signup(email, password, username) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: username,
      });

      await database.initUserDoc(userCredential.user.uid);

      return userCredential.user;
    } catch (error) {
      console.log(error);
    }
  }

  function updateUsername(newUsername) {
    updateProfile(auth.currentUser, { displayName: newUsername }).catch((e) =>
      console.log("profile uesrname not updated")
    );
  }

  function updatePhotoUrl(url) {
    updateProfile(auth.currentUser, { photoURL: url }).catch((e) =>
      console.log("profile pic not updated")
    );
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  async function signInWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user) {
      const user = result.user;
      const q = query(database.users, where("userId", "==", user.uid));
      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          database.initUserDoc(user.uid);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const { uid, displayName, email, photoURL } = currentUser || {};

  const value = {
    currentUser: { uid, displayName, email, photoURL },
    signup,
    signInWithGoogle,
    login,
    logout,
    updateUsername,
    updatePhotoUrl,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
