import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../modules/Dashboard";

const ProtectedRoutes = () => {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);
  return (
    <>
      <Dashboard />
    </>
  );
};

export default ProtectedRoutes;
