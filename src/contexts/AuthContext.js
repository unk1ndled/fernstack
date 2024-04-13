import React, { Children, useContext, useEffect, useState } from "react";
import { auth, database, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

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
      return userCredential.user;
    } catch (error) {
      console.log(error);
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  async function signInWithGoogle() {
    await signInWithPopup(auth, googleProvider);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const { uid, displayName, email, photoURL, storageUsage } = currentUser || {};

  const value = {
    currentUser: { uid, displayName, email, photoURL, storageUsage },
    signup,
    signInWithGoogle,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
