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

    // Optional: Validate date
    if (new Date(form.deadline) < new Date()) {
      alert("Deadline must be a future date");
      setLoading(false);
      return;
    }

    try {
      const payload = { ...form }; // Session identifies teacher
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
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <Spinner />
        </div>
      )}

      <div className="flex flex-col items-center space-y-4 min-h-screen pt-20">
        <div className="bg-gray-100 border w-full max-w-md p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4">
            Post New Assignment
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Title"
              className="w-full px-4 py-2 border rounded-md"
              disabled={loading}
            />
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              placeholder="Subject"
              className="w-full px-4 py-2 border rounded-md"
              disabled={loading}
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              required
              placeholder="Description"
              className="w-full px-4 py-2 border rounded-md"
              disabled={loading}
            />
            <input
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              disabled={loading}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-700"
                }`}
              >
                {loading ? "Posting..." : "Post Assignment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
