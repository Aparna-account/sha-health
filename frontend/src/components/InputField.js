import React from "react";

export default function InputField({ name, type="text", placeholder, value, onChange }) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 mb-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
    />
  );
}
