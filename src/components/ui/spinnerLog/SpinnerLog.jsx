import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";

export const SpinnerLog = ({ open }) => {
  const blinkingStyle = {
    animation: "blink 1s infinite",
  };

  return (
    <Backdrop
      sx={(theme) => ({
        color: "#fff",
        zIndex: theme.zIndex.drawer + 1,
        // "@keyframes blink": {
        //   "0%": { opacity: 1 },
        //   "50%": { opacity: 0.3 },
        //   "100%": { opacity: 1 },
        // },
      })}
      open={open}
    >
      <CircularProgress color="info" />
    </Backdrop>
  );
};
