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
import Grid from "@mui/material/Grid";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import theme from "../../../shared/theme/theme";

const login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const basicSchema = yup.object().shape({
    emailAddress: yup
      .string()
      .email("You must enter a valid email address")
      .required("This is required"),
    password: yup.string().required("This is required"),
  });
  //======== password visibility ========
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // ======== Login user integrating with api ========
  const LoginUser = () => {
    console.log(formik.values);
  };

  //======== formik validating onsubmit ========
  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
    },
    validationSchema: basicSchema,
    onSubmit: () => LoginUser(),
  });

  //======== JSX ========
  return (
    <Container maxWidth={false}>
      <Box>
        <div className="animate one"></div>
        <div className="animate two"></div>
        <div className="animate three"></div>
        <div className="animate four"></div>
        <div className="animate five"></div>
        <div className="animate six"></div>
        <div className="animate seven"></div>
        <div className="animate eight"></div>
        <div className="animate nine"></div>
        <div className="animate ten"></div>
        <div className="animate eleven"></div>
        <div className="animate twelve"></div>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: "12px",
                zIndex: "modal",
                padding: "48px",
                marginY: [3],
                textAlign: "center",
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
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={5}
                    paddingLeft="0px !important"
                    paddingTop="0px !important"
                  >
                    <img src={loginImg} alt="login image" width={500} />
                  </Grid>
                  <Divider
                    sx={{
                      marginInline: "auto",
                      border: "0.1px solid #80808033",
                    }}
                  />
                  <Grid item xs={5}>
                    <Divider
                      sx={{
                        borderBottomWidth: "thick",
                        mb: 1,
                        width: "45px",
                        borderColor: "#4b99a5",
                        borderRadius: "50px",
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      marginBottom={4}
                      textAlign="start"
                    >
                      Login as an Admin
                    </Typography>
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
                      sx={{
                        overflow: "visible",
                        marginBottom: 3,
                        paddingTop: "0px !important",
                      }}
                    >
                      <OutlinedInput
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          formik.values.password && (
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
                          )
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
                      href="/forgot-password"
                      color="primary"
                      fontSize="12px"
                      sx={{ textDecoration: "none" }}
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
    </Container>
  );
};

export default login;
