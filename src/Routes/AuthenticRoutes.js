import React from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../modules/Auth/Login";

const AuthenticRoutes = () => {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/home");
    }
  }, [auth, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
};

export default AuthenticRoutes;
