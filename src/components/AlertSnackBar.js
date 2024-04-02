import { Alert, Snackbar, Typography, Zoom } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export function AlertSnackBar({ error, severity, open, handleClose }) {

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        TransitionComponent={Zoom}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity={severity} variant="filled">
          {error}
        </Alert>
      </Snackbar>
      {severity === "error" && (
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "2rem",
          }}
          variant="body1"
          color="error"
        >
          <ErrorOutlineIcon fontSize="medium" />
          {error}
        </Typography>
      )}
    </>
  );
}
export default AlertSnackBar;
