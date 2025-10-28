import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const { setUser } = useAuth();
  const nav = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/users/login", form);
      setUser(res.data.user);
      if (res.data.user.role === "Teacher") nav("/dashboard");
      else nav("/student");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-sm sm:max-w-md mx-auto mt-8 px-4">
      <h2 className="text-2xl font-semibold mb-4">Log in</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Email"
          className="w-full p-3 rounded border"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Password"
          className="w-full p-3 rounded border"
        />
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button
          type="submit"
          className="w-full py-3 rounded bg-indigo-600 text-white cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
