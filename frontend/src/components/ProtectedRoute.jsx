import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  return children;
}

export default ProtectedRoute;