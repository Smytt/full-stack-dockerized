import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { AuthPayload } from "../api/types";

type Props = {
  title: string;
  onSubmit: (data: AuthPayload) => void;
  secondaryButtonHandler?: () => void;
  secondaryButtonText?: string;
  loading?: boolean;
};

const UserForm = ({
  title,
  onSubmit,
  secondaryButtonHandler,
  secondaryButtonText,
  loading,
}: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ width: "500px", margin: "0 auto", marginTop: "200px" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {title}
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={secondaryButtonHandler}
          >
            {secondaryButtonText}
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onSubmit({ username, password })}
            disabled={!username || !password || loading}
          >
            {title}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default UserForm;
