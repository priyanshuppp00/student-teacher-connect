import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://student-teacher-connect-backend.onrender.com/api",
  withCredentials: true, // important to send/receive session cookie
});

export default api;
