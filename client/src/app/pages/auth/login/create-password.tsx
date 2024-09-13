import logo from "./../../../../assets/images/care-sphere-transparent-logo.png";
import loginImg from "./../../../../assets/images/login.jpg";
import {
  Box,
  Paper,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { ContrastSharp, Visibility, VisibilityOff } from "@mui/icons-material";
import theme from "../../../shared/theme/theme";
import SnackBar from "../../../shared/components/snackbar/snackbar";
import {
  redirect,
  redirectDocument,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";

const createPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const apiRoute = `http://localhost:3000/api/v1/`;

  fetch(apiRoute + "verification" + "/" + token).then((res) =>
    res.json().then((result) => {
      // if (result.error) {
      //   window.location.href = "http://localhost:5173";
      // }
    })
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}\[\]|\\:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()\-_=+{}\[\]|\\:;"'<>,.?/~`]{6,}$/;
  const basicSchema = yup.object().shape({
    password: yup
      .string()
      .matches(passwordRegex, " ")
      .required("This is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password & confirm password must match")
      .required("This is required"),
  });
  //======== password visibility ========
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  //======== snackbar close ========
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  // ======== Login user integrating with api ========
  const createPassword = () => {
    console.log(formik.values);
    fetch(apiRoute + "createPassword" + "/" + token, {
      method: "PUT",
      body: JSON.stringify({
        password: formik.values.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setSnackbarMessage(result.message);
          setSnackbarType("error");
          setOpenSnackbar(true);
        } else {
          setSnackbarType("success");
          setOpenSnackbar(true);
          setSnackbarMessage("Password created successfully");
          formik.resetForm();
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //======== formik validating onsubmit ========
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: basicSchema,
    onSubmit: () => createPassword(),
  });

  //======== JSX ========
  return (
    <Container maxWidth={false} className="main-container">
      <Box className="animate">
        <div className="one"></div>
        <div className="two"></div>
        <div className="three"></div>
        <div className="four"></div>
        <div className="five"></div>
        <div className="six"></div>
        <div className="seven"></div>
        <div className="eight"></div>
        <div className="nine"></div>
        <div className="ten"></div>
        <div className="eleven"></div>
        <div className="twelve"></div>
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              minHeight: "100vh",
              justifyContent: "center",
              padding: {
                xs: "12px",
                md: "48px",
              },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: "12px",
                zIndex: "modal",
                padding: {
                  xs: "16px",
                  md: "48px",
                },
                marginY: [3],
                textAlign: "center",
                width: {
                  xs: "100%",
                  sm: "80%",
                  md: "auto",
                },
              }}
            >
              <Box component="div" marginBottom={3}>
                <img src={logo} alt="logo" width={300} />
              </Box>
              {/* ======== form ======== */}
              <Box
                component="form"
                overflow="visible"
                onSubmit={formik.handleSubmit}
              >
                <Grid container spacing={1}>
                  <Grid
                    display={{
                      xs: "none",
                      md: "block",
                    }}
                    size={{ xs: 12, md: 5 }}
                    paddingLeft="0px !important"
                    paddingTop="0px !important"
                  >
                    <img
                      src={loginImg}
                      alt="login image"
                      style={{
                        maxWidth: "500px",
                        height: "auto",
                        width: "100%",
                      }}
                    />
                  </Grid>
                  <Divider
                    sx={{
                      marginInline: "auto",
                      border: "0.1px solid #80808033",
                      display: {
                        xs: "none",
                        md: "block",
                      },
                    }}
                  />
                  <Grid
                    size={{ xs: 12, md: 5 }}
                    sx={{
                      alignSelf: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      marginBottom={1}
                      textAlign="start"
                    >
                      Create new password
                    </Typography>
                    <Divider
                      sx={{
                        borderBottomWidth: "thick",
                        mb: 1,
                        marginBottom: "40px",
                        width: "45px",
                        borderColor: "#4b99a5",
                        borderRadius: "50px",
                      }}
                    />
                    <FormControl
                      fullWidth
                      variant="outlined"
                      sx={{
                        overflow: "visible",
                        marginBottom: 3,
                        paddingTop: "0px !important",
                      }}
                    >
                      <OutlinedInput
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment
                            position="end"
                            sx={{ overflow: "visible" }}
                          >
                            <IconButton
                              disableRipple
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              disableFocusRipple
                              sx={{
                                padding: "12px",
                                color: "black",
                                marginRight: 1 / 2,
                              }}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        name="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        sx={{
                          borderRadius: "50px",
                          fontSize: "12px",
                          padding: 1 / 2,
                        }}
                        aria-describedby="password-error"
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                      />
                      {/* ======== error message ======== */}
                      <FormHelperText
                        id="password-error"
                        sx={{
                          fontSize: "11px",
                          color: theme.palette.error.main,
                          paddingX: "12px",
                        }}
                      >
                        {formik.errors.password && formik.touched.password && (
                          <Box component="span" sx={{ position: "absolute" }}>
                            {formik.errors.password}
                          </Box>
                        )}
                      </FormHelperText>
                      {/* ======== /error message ======== */}
                    </FormControl>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      sx={{
                        overflow: "visible",
                        marginBottom: 3,
                        paddingTop: "0px !important",
                      }}
                    >
                      <OutlinedInput
                        fullWidth
                        type={showConfirmPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment
                            position="end"
                            sx={{ overflow: "visible" }}
                          >
                            <IconButton
                              disableRipple
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              disableFocusRipple
                              sx={{
                                padding: "12px",
                                color: "black",
                                marginRight: 1 / 2,
                              }}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        onBlur={formik.handleBlur}
                        sx={{
                          borderRadius: "50px",
                          fontSize: "12px",
                          padding: 1 / 2,
                        }}
                        aria-describedby="confirm-password-error"
                        error={
                          formik.touched.confirmPassword &&
                          Boolean(formik.errors.confirmPassword)
                        }
                      />
                      {/* ======== error message ======== */}
                      <FormHelperText
                        id="confirmPassword-error"
                        sx={{
                          fontSize: "11px",
                          color: theme.palette.error.main,
                          paddingX: "12px",
                        }}
                      >
                        {formik.errors.confirmPassword &&
                          formik.touched.confirmPassword && (
                            <Box component="span" sx={{ position: "absolute" }}>
                              {formik.errors.confirmPassword}
                            </Box>
                          )}
                      </FormHelperText>
                      {/* ======== /error message ======== */}
                    </FormControl>

                    <Button
                      fullWidth
                      disableFocusRipple
                      type="submit"
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        fontSize: "16px",
                        paddingY: "14px",
                        marginBottom: 3,
                        borderRadius: "50px",
                      }}
                    >
                      Submit{" "}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              {/* ======== /form ======== */}
            </Paper>
          </Box>
        </Grid>
      </Grid>
      {/* snackbar component */}
      <SnackBar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        snackbarType={snackbarType === "success" ? "success" : "error"}
        severity={snackbarType === "success" ? "success" : "error"}
      />
      {/* /snackbar component */}
    </Container>
  );
};

export default createPassword;
