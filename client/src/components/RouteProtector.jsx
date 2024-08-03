import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const TOKEN = localStorage.getItem("authToken");
  return !TOKEN ? <Navigate to="/admin/login" /> : children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
