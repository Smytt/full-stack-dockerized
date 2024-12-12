import {
  Autocomplete,
  TextField,
  Chip,
  Box,
  Typography,
  Button,
} from "@mui/material";
import useThrottle from "../hooks/useThrottle";
import { useEffect, useState } from "react";
import { getMe, getTechs, submitTechs } from "../api";
import { Tech } from "../types";

function Dashboard() {
  const [tech, setTech] = useThrottle({ value: "", delay: 150 });
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [techs, setTechs] = useState<Tech[]>([]);

  useEffect(() => {
    getMe().then((myTechs) => {
      setSelectedTechs(myTechs.map((tech) => tech.name));
    });
  }, []);

  useEffect(() => {
    if (tech)
      getTechs(tech).then((data) => {
        setTechs(data);
      });
    else setTechs([]);
  }, [tech]);

  const handleSubmit = () => {
    submitTechs(selectedTechs).then((user) => {
      setSelectedTechs(user.techs.map((tech) => tech.name));
    });
  };

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
      width="50%"
      margin="0 auto"
      mt={4}
      gap={2}
    >
      <Typography>Your tech: </Typography>
      <Autocomplete
        multiple
        freeSolo
        value={selectedTechs}
        options={techs.map((option) => option.name)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip key={key} variant="outlined" label={option} {...tagProps} />
            );
          })
        }
        renderInput={(params) => (
          <TextField {...params} label="Select Option" variant="outlined" />
        )}
        onInputChange={(event, newInputValue) => {
          setTech(newInputValue);
        }}
        onChange={(event, value) => {
          setSelectedTechs(value);
        }}
        sx={{ width: "100%", marginTop: 2 }}
        disableCloseOnSelect
      />
      <Button
        disabled={!!tech}
        variant="contained"
        color="primary"
        size="small"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
}

export default Dashboard;
