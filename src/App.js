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

const App = () => {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/home" element={<Test />} />
      </Routes>
    </NextUIProvider>
  );
};

export default App;
