import * as React from "react";
import { Snackbar, Alert, SnackbarProps } from "@mui/material";
import Slide, { SlideProps } from "@mui/material/Slide";

type TransitionProps = Omit<SlideProps, "direction">;

function Transition(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

const SnackBarSuccess: React.FC<SnackbarProps> = (props): JSX.Element => (
  <Snackbar
    {...props}
    TransitionComponent={props.TransitionComponent || Transition}
  >
    <Alert onClose={props.onClose as () => void} severity="success">
      {props.message}
    </Alert>
  </Snackbar>
);

export default SnackBarSuccess;
