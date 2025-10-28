import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import ErrorMessage from "./components/ErrorMessage";
import Spinner from "./components/Spinner";

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const TeacherDashboard = React.lazy(() => import("./pages/AddPost"));
const StudentDashboard = React.lazy(() => import("./pages/StudentDashboard"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
function App() {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading app…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-4 md:px-6 lg:px-8">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    user
                      ? user.role === "Teacher"
                        ? "/teacher"
                        : "/student"
                      : "/login"
                  }
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/addpost"
              element={
                user && user.role === "Teacher" ? (
                  <TeacherDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/student"
              element={
                user && user.role === "Student" ? (
                  <StudentDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                user && user.role === "Teacher" ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<ErrorMessage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
