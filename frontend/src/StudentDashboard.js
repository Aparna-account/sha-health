// src/StudentDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./auth";

export default function StudentDashboard() {
  const { user, userRole } = useAuth();

  return (
    <div className="max-w-4xl mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Dashboard 📋</h2>
      <p className="text-gray-700 mb-6">
        Welcome {user?.email}! Your role: <strong>{userRole}</strong>
      </p>
      <div className="flex gap-4">
        <Link
          to="/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
        >
          Create New Entry ✍️
        </Link>
        <Link
          to="/role"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Change Role 🔄
        </Link>
      </div>
    </div>
  );
}
