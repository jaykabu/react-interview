import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "antd/dist/reset.css";
import Signup from "./modules/Auth/Signup";
import AuthenticRoutes from "./Routes/AuthenticRoutes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<AuthenticRoutes />} />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
}

export default App;
