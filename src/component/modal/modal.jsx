import * as React from 'react';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Modal(props) {
  console.log('open',props.open)
  return (
    <Snackbar 
      open={props.open} autoHideDuration={6000} onClose={props.onClose}>
      <Alert variant="filled" onClose={props.onClose} severity={props.severity?props.severity:'error'} >
        {props.message}
      </Alert>
    </Snackbar>
  )
}