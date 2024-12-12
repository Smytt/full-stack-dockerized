import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Default = () => {
  const { user, loading } = useAuth();

  return loading ? (
    "Loading..."
  ) : user ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" />
  );
};
export default Default;
