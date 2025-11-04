// src/WelcomePage.js
import React from "react";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-8 rounded-lg text-center">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">Welcome to Secure E-Diary 📘</h1>
      <p className="text-gray-700 mb-6">
        Keep your personal diary entries safe and secure. Login or register to continue.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/login"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition"
        >
          Login / Register 🔑
        </Link>
        <Link
          to="/role"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Select Role 🎓
        </Link>
      </div>
    </div>
  );
}
