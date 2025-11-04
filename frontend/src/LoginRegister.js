// src/LoginRegister.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

export default function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate("/role"); // Redirect to role selection after login
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Login / Register 🔑</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
        >
          Login / Register
        </button>
      </form>
    </div>
  );
}
