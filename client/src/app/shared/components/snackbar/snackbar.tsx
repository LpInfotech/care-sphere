import { Alert, AlertTitle, IconButton, Snackbar } from "@mui/material";
import { Info, Warning, CheckCircle, Close, Error } from "@mui/icons-material";

//======== interface for snackbar props ========
interface SnackBarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  snackbarType: "success" | "error" | "warning" | "info";
}

const SnackBar: React.FC<SnackBarProps> = ({
  open,
  onClose,
  message,
  severity,
  snackbarType,
}) => {
  //======== handle close function ========
  const handleClose = () => {
    onClose();
  };

  return (
    <Snackbar
      sx={{ top: "8px !important", right: "8px !important", minWidth: "400px" }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={10000}
    >
      <Alert
        icon={
          snackbarType === "success" ? (
            <CheckCircle />
          ) : snackbarType === "error" ? (
            <Error />
          ) : snackbarType === "warning" ? (
            <Warning />
          ) : (
            <Info />
          )
        }
        severity={severity}
        sx={{ width: "100%", backgroundColor: "white" }}
        action={
          <IconButton
            color="inherit"
            size="small"
            disableRipple
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        }
      >
        <AlertTitle textAlign="left" color={severity} marginBottom={0}>
          {snackbarType === "success"
            ? "Success"
            : snackbarType === "error"
            ? "Error"
            : snackbarType === "warning"
            ? "Warning"
            : "Info"}
        </AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
