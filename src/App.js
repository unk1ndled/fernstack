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
import Profile from "./pages/Profile";

const App = () => {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/home" element={<Test />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </NextUIProvider>
  );
};

export default App;
