import { useEffect, useState } from "react";
import { User } from "../types";
import { getUsers } from "../api";
import { Box, Chip, Typography } from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
      width="50%"
      margin="0 auto"
      mt={4}
      gap={4}
    >
      <Typography>Users: </Typography>
      <Box display="flex" gap={2}>
        {users.map((user) => (
          <Chip
            key={user.username}
            label={`${user.username}: ${user.techs
              .slice(0, 3)
              .map((tech) => tech.name)
              .join(", ")}${user.techs.length > 3 ? "..." : ""} (${
              user.techs.length
            } tech${user.techs.length === 1 ? "" : "s"})`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Users;
