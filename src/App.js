import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Test from "./pages/Home";
import { NextUIProvider } from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Profile from "./pages/Profile";

const App = () => {
  const navigate = useNavigate();

  return (
    <AuthProvider>
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Test />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </NextUIProvider>
    </AuthProvider>
  );
};

export default App;
