import { Routes, Route } from "react-router";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import useAuth from "../hooks/useAuth";
import Default from "../pages/Default";
import Layout from "./Layout";
import Users from "../pages/Users";
import Stats from "../pages/Stats";
import Tech from "../pages/Tech";
import User from "../pages/User";

const Routing = () => {
  const { user, loading } = useAuth();
  return (
    <Routes>
      {user && (
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<User />} />
          <Route path="tech-stats" element={<Stats />} />
          <Route path="tech-stats/:id" element={<Tech />} />
        </Route>
      )}
      {!user && !loading && (
        <>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </>
      )}
      <Route path="*" element={<Default />} />
    </Routes>
  );
};

export default Routing;
