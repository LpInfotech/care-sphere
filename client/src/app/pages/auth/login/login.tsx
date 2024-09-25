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
  Link,
  OutlinedInput,
  Typography,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import theme from "../../../shared/theme/theme";
import SnackBar from "../../../shared/components/snackbar/snackbar";
import { useNavigate } from "react-router-dom";

const login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const basicSchema = yup.object().shape({
    emailAddress: yup
      .string()
      .email("You must enter a valid email address")
      .required("This is required"),
    password: yup.string().required("This is required"),
  });

  function test() {
    fetch("http://localhost:3000/api/v1/forgotPassword", {
      method: "POST",
      body: JSON.stringify({
        email: formik.values.emailAddress,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setSnackbarMessage("Email doesn't exist");
          setSnackbarType("error");
          setOpenSnackbar(true);
        } else {
          setSnackbarType("success");
          setOpenSnackbar(true);
          setSnackbarMessage(result.message);
          formik.resetForm();
        }
      })
      .catch((err) => {
        console.log(err.message);
        setSnackbarMessage("Request failed");
        setSnackbarType("error");
        setOpenSnackbar(true);
      });
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  //======== password visibility ========
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //======== snackbar close ========
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // ======== Login user integrating with api ========
  const LoginUser = () => {
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      body: JSON.stringify({
        email: formik.values.emailAddress,
        password: formik.values.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setSnackbarMessage("Email and Password combination doesn't match");
          setSnackbarType("error");
          setOpenSnackbar(true);
        } else {
          setSnackbarType("success");
          setOpenSnackbar(true);
          setSnackbarMessage("You have successfully logged in");
          formik.resetForm();
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setSnackbarMessage("Request failed");
        setSnackbarType("error");
        setOpenSnackbar(true);
      });
  };

  // console.log(formik.values);
  // if (
  //   formik.values.emailAddress === "admin@caresphere.com" &&
  //   formik.values.password === "Admin@123"
  // ) {
  //   console.log("You have successfully logged in");
  //   setSnackbarType("success");
  //   setOpenSnackbar(true);
  //   setSnackbarMessage("You have successfully logged in");
  //   formik.resetForm();
  // } else {
  //   console.warn("Incorrect email and password combination");
  //   setSnackbarMessage("Email and Password combination doesn't match");
  //   setSnackbarType("error");
  //   setOpenSnackbar(true);
  // }
  // };

  //======== formik validating onsubmit ========
  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
    },
    validationSchema: basicSchema,
    onSubmit: () => LoginUser(),
  });

  const isDisabled =
    formik.values.emailAddress && !formik.errors.emailAddress ? false : true;

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
                      Login
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
                      sx={{
                        overflow: "visible",
                        marginBottom: 3,
                        paddingTop: "0px !important",
                      }}
                    >
                      <OutlinedInput
                        type="email"
                        name="emailAddress"
                        value={formik.values.emailAddress}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Email Address"
                        aria-describedby="emailAddress-error"
                        fullWidth
                        error={
                          formik.touched.emailAddress &&
                          Boolean(formik.errors.emailAddress)
                        }
                        sx={{
                          borderRadius: "50px",
                          fontSize: "12px",
                          padding: 1 / 2,
                        }}
                      />
                      {/* ======== error message ======== */}
                      <FormHelperText
                        id="emailAddress-error"
                        sx={{
                          fontSize: "11px",
                          color: theme.palette.error.main,
                          paddingX: "12px",
                        }}
                      >
                        {formik.errors.emailAddress &&
                          formik.touched.emailAddress && (
                            <Box component="span" sx={{ position: "absolute" }}>
                              {formik.errors.emailAddress}
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
                      Sign In
                    </Button>
                    <Link
                      color={isDisabled ? "inherit" : "primary"}
                      fontSize="12px"
                      sx={{
                        textDecoration: "none",
                        cursor: isDisabled ? "default" : "pointer",
                      }}
                      onClick={(e) => {
                        if (isDisabled) {
                          e.preventDefault(); // Prevent the link from working if disabled
                        } else {
                          test();
                        }
                      }}
                    >
                      Forgot Password?
                    </Link>
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

export default login;
