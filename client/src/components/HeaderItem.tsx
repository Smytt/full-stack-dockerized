import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

type Props = {
  path: string;
  label: string;
};

const HeaderItem = ({ path, label }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCurrentPath = (path: string) => location.pathname === path;
  return (
    <Box component="li">
      <Button
        variant={isCurrentPath(path) ? "contained" : "outlined"}
        onClick={() => navigate(path)}
      >
        {label}
      </Button>
    </Box>
  );
};

export default HeaderItem;
