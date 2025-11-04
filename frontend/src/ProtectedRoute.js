// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

export default function ProtectedRoute({ children, requireRole = false }) {
  const { user, userRole } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />; // Not logged in
  }

  if (requireRole && !userRole) {
    return <Navigate to="/role" replace />; // Role not selected
  }

  return children; // Access granted
}
