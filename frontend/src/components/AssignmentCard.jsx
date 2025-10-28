import React, { useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const AssignmentCard = ({ assignment, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: assignment.title,
    subject: assignment.subject,
    description: assignment.description,
    deadline: assignment.deadline ? assignment.deadline.split("T")[0] : "",
  });
  const [loading, setLoading] = useState(false);

  const deadlineStr = assignment.deadline
    ? new Date(assignment.deadline).toLocaleDateString()
    : "No deadline";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put(`/assignments/${assignment._id}`, form);
      onUpdate(res.data);
      setIsEditing(false);
      alert("Assignment updated successfully!");
    } catch (err) {
      console.error("Error updating assignment:", err);
      alert(err?.response?.data?.message || "Failed to update assignment");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this assignment?"))
      return;
    setLoading(true);
    try {
      await api.delete(`/assignments/${assignment._id}`);
      onDelete(assignment._id);
      alert("Assignment deleted successfully!");
    } catch (err) {
      console.error("Error deleting assignment:", err);
      alert(err?.response?.data?.message || "Failed to delete assignment");
    } finally {
      setLoading(false);
    }
  };

  const isTeacher =
    user?.role === "Teacher" && assignment.teacher?._id === user._id;

  return (
    <div className="bg-white p-4 rounded shadow">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Title"
            className="w-full p-2 rounded border"
          />
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            placeholder="Subject"
            className="w-full p-2 rounded border"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="Description"
            className="w-full p-2 rounded border"
          />
          <input
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
            className="w-full p-2 rounded border"
          />
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="mb-2 sm:mb-0">
              <h3 className="font-semibold text-lg">{assignment.title}</h3>
              <p className="text-sm text-gray-500">
                {assignment.subject} • by{" "}
                {assignment.teacher?.name || "Teacher"}
              </p>
            </div>
            <div className="text-sm text-gray-500">{deadlineStr}</div>
          </div>
          <p className="mt-3 text-gray-700">{assignment.description}</p>
          {isTeacher && (
            <div className="mt-3 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AssignmentCard;
