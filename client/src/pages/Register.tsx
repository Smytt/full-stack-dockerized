import { useNavigate } from "react-router";
import UserForm from "../components/UserForm";
import { register } from "../api";
import { Snackbar } from "@mui/material";
import { useAuthRequest } from "../hooks/useAuthRequest";

const Register = () => {
  const navigate = useNavigate();

  const { message, loading, hitEndpoint } = useAuthRequest({
    endpoint: register,
    redirectPath: "/",
  });

  return (
    <>
      <UserForm
        title="Register"
        onSubmit={hitEndpoint}
        secondaryButtonHandler={() => navigate("/login")}
        secondaryButtonText="Login"
        loading={loading}
      />
      <Snackbar open={!!message} autoHideDuration={5000} message={message} />
    </>
  );
};

export default Register;
