import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  //using firebase we will signup - auth functions
  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  //using firebase we will login - auth functions
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  //using firebase we will logout - auth functions
  const logout = (email, password) => {
    return auth.signOut();
  };

  //using firebase we will reset pass - auth functions
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  //using firebase we will update email - auth functions
  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  //using firebase we will update pass - auth functions
  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
