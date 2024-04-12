import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
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
          {/* auth */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* treasure */}
          <Route path="/treasure" element={<Home />} />
          <Route path="/treasure/:treasureid" element={<Home />} />

          {/* profile */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </NextUIProvider>
    </AuthProvider>
  );
};

export default App;
