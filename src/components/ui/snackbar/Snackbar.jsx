import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Title } from "../title/Title";

export const SnackbarDefault = ({
  open,
  setOpen,
  message,
  severity,
  position,
  mt,
  duration
}) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={duration ? duration  : 5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: position?.vertical || "bottom",
          horizontal: position?.horizontal || "center",
        }}
        sx={{ mt: `${mt}` }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "bottom",
            alignItems: "center",
          }}
        >
          <h1 className="md:text-lg" style={{fontSize: "24px"}}> {message}</h1>
        </Alert>
      </Snackbar>
    </div>
  );
};
