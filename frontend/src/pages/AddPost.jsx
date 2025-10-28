import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const AddPost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    subject: "",
    description: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form }; // session identifies teacher
      await api.post("/assignments", payload);
      setForm({ title: "", subject: "", description: "", deadline: "" });
      alert("Assignment posted successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 relative px-4">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <Spinner />
        </div>
      )}
      <div className="bg-white p-4 sm:p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Post New Assignment</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Title"
            className="w-full p-3 rounded border"
            disabled={loading}
          />
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            placeholder="Subject"
            className="w-full p-3 rounded border"
            disabled={loading}
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="Description"
            className="w-full p-3 rounded border"
            disabled={loading}
          />
          <input
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
            className="w-full p-3 rounded border"
            disabled={loading}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer"
            >
              {loading ? "Posting..." : "Post Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
