import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const loggedIn = localStorage.getItem("adminLoggedIn");

  if (loggedIn !== "true") {
    return <Navigate to="/login" replace />;
  }

  return children;
}