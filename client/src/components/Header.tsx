import { Box, Button, Typography } from "@mui/material";
import HeaderItem from "./HeaderItem";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { logout, user } = useAuth();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Box
        component="ul"
        display="flex"
        gap={2}
        sx={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <HeaderItem path="/" label="Dashboard" />
        <HeaderItem path="/users" label="Users" />
        <HeaderItem path="/tech-stats" label="Tech Stats" />
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography>Welcome, {user?.username}</Typography>
        <Button variant="outlined" onClick={logout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
