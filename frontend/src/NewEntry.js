// src/NewEntry.js
import React, { useState } from "react";

export default function NewEntry() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Entry saved! ✅"); // Replace with real save logic
    setTitle("");
    setContent("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">New Diary Entry ✍️</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Write your entry..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded h-40"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
        >
          Save Entry 💾
        </button>
      </form>
    </div>
  );
}
