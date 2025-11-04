
// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth";
import ProtectedRoute from "./ProtectedRoute";

import WelcomePage from "./WelcomePage";
import LoginRegister from "./LoginRegister";
import RoleSelection from "./RoleSelection";
import StudentDashboard from "./StudentDashboard";
import NewEntry from "./NewEntry";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow p-6">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={<LoginRegister />} />

              {/* Protected Routes */}
              <Route
                path="/role"
                element={
                  <ProtectedRoute>
                    <RoleSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requireRole={true}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/new"
                element={
                  <ProtectedRoute requireRole={true}>
                    <NewEntry />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t p-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Secure E-Diary 📘
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Navbar Component
function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600">📘 E-Diary</Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
        {user && <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600">Dashboard</Link>}
        {user && <Link to="/new" className="text-gray-600 hover:text-indigo-600">New Entry</Link>}
        {user ? (
          <button
            onClick={logout}
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
        )}
      </div>
    </nav>
  );
}
