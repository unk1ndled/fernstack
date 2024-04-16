import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Treasure from "./pages/Treasure";
import Landing from "./pages/Landing";
import ProfileModal from "./componenets/ProfileModal";

const App = () => {
  const navigate = useNavigate();
  const user = useAuth();

  return (
    <AuthProvider>
      <NextUIProvider navigate={navigate}>
        <Routes>
          {/* landing */}
          <Route path="/" element={<Landing />} />

          {/* auth */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* treasure */}
          <Route path="/treasure" element={<Treasure />} />
          <Route path="/treasure/:treasureid" element={<Treasure />} />

          {/* profile */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </NextUIProvider>
    </AuthProvider>
  );
};

export default App;
