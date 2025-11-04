// src/RoleSelection.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

export default function RoleSelection() {
  const [role, setRole] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const { setUserRole } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role!");
      return;
    }

    setUserRole(role); // Save role in auth context

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Select Your Role 🎓</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">-- Select Role --</option>
          <option value="student">Student 👩‍🎓</option>
          <option value="teacher">Teacher 👨‍🏫</option>
          <option value="custom">Custom ✨</option>
        </select>

        {role === "custom" && (
          <input
            type="text"
            placeholder="Enter custom purpose"
            value={customPurpose}
            onChange={(e) => setCustomPurpose(e.target.value)}
            className="border p-2 rounded"
            required
          />
        )}

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
        >
          Continue ➡️
        </button>
      </form>
    </div>
  );
}
