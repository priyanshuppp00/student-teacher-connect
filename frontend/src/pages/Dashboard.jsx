import React, { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import AssignmentCard from "../components/AssignmentCard";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      const res = await api.get("/assignments");
      // Filter to show only the teacher's own assignments
      setAssignments(res.data.filter((a) => a.teacher?._id === user?._id));
    } catch (err) {
      console.error("Error fetching assignments:", err);
      alert("Failed to load assignments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchAll();
  }, [user]);

  return (
    <div className="px-4">
      <h2 className="text-2xl font-semibold mb-4">Your Assignments</h2>
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
            <AssignmentCard
              key={a._id}
              assignment={a}
              onUpdate={(updated) => {
                setAssignments((prev) =>
                  prev.map((item) =>
                    item._id === updated._id ? updated : item
                  )
                );
              }}
              onDelete={(id) => {
                setAssignments((prev) =>
                  prev.filter((item) => item._id !== id)
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
