import {
  Autocomplete,
  TextField,
  Chip,
  Box,
  Typography,
  Button,
} from "@mui/material";
import useThrottle from "../hooks/useThrottle";
import { useEffect } from "react";

const options = ["Option 1", "Option 2", "Option 3"];

function Dashboard() {
  const [tech, setTech] = useThrottle({ value: "", delay: 500 });

  useEffect(() => {
    // console.log(tech);
  }, [tech]);

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
        options={options}
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
        sx={{ width: "100%", marginTop: 2 }}
        disableCloseOnSelect
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {}}
      >
        Submit
      </Button>
    </Box>
  );
}

export default Dashboard;
