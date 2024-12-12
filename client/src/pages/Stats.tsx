import { useEffect, useState } from "react";
import { getTechs } from "../api";
import { Box, Chip, Typography } from "@mui/material";
import { Tech } from "../types";

const Stats = () => {
  const [techs, setTechs] = useState<Tech[]>([]);

  useEffect(() => {
    getTechs().then((data) => {
      setTechs(data);
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
      <Typography>Tech stats: </Typography>
      <Box display="flex" gap={2}>
        {techs.map((tech) => (
          <Chip
            key={tech.name}
            label={`${tech.name} - ${tech.users.length} users`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Stats;
