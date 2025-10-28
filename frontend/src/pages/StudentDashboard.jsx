import React, { useEffect, useState } from "react";
import api from "../api";
import AssignmentCard from "../components/AssignmentCard";
import Spinner from "../components/Spinner";

const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      const res = await api.get("/assignments");
      setAssignments(res.data);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      alert("Failed to load assignments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="px-4">
      <h2 className="text-2xl font-semibold mb-4">All Assignments</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assignments.length === 0 && (
            <div className="text-gray-500 col-span-full">
              No assignments yet.
            </div>
          )}
          {assignments.map((a) => (
            <AssignmentCard key={a._id} assignment={a} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
