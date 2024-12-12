import { useNavigate } from "react-router";
import UserForm from "../components/UserForm";
import { login } from "../api";
import { Snackbar } from "@mui/material";
import { useAuthRequest } from "../hooks/useAuthRequest";

const Login = () => {
  const navigate = useNavigate();

  const { message, loading, hitEndpoint } = useAuthRequest({
    endpoint: login,
    redirectPath: "/",
  });

  return (
    <>
      <UserForm
        title="Login"
        onSubmit={hitEndpoint}
        secondaryButtonHandler={() => navigate("/register")}
        secondaryButtonText="Register"
        loading={loading}
      />
      <Snackbar open={!!message} autoHideDuration={5000} message={message} />
    </>
  );
};

export default Login;
