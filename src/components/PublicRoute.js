import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  if (localStorage.getItem("token")) {
    // If the user is logged in (token present), redirect to home ("/")
    return <Navigate to="/" />;
  } else {
    // If the user is not logged in, render the children components
    return <>{children}</>;
  }
};

export default PublicRoute;
