import { useState } from "react";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { Close } from "@mui/icons-material";
import theme from "../../../shared/theme/theme";
import SnackBar from "../../../shared/components/snackbar/snackbar";
import Grid from "@mui/material/Grid2";
function UserInfo() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage] = useState("");
  const [snackbarType] = useState("");

  //======== snackbar close function ========
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  //======== reset field on close click ========
  const resetField = (field: string) => {
    formik.setFieldValue(field, "");
  };

  //======== validation schema ========
  const basicSchema = yup.object().shape({
    email: yup
      .string()
      .email("You must enter a valid email address")
      .required("This is required"),
    firstName: yup.string().required("This is required"),
    lastName: yup.string().required("This is required"),
    mobileNumber: yup
      .string()
      .required("This is required")
      .min(11, "Mobile number must contain 10 digits"),
    postCode: yup.string().required("This is required"),
    address: yup.string().required("This is required"),
    city: yup.string().required("This is required"),
    state: yup.string().required("This is required"),
    country: yup.string().required("This is required"),
  });

  // ======== put data to API to update user data ========
  const UpdateUser = () => {};

  //======== formik validating onsubmit ========
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      postCode: "",
      address: "",
      city: "",
      state: "",
      country: "",
    },
    validationSchema: basicSchema,
    onSubmit: UpdateUser,
  });

  //======== logout function ========
  const handleLogout = () => {};

  //======== jsx ========
  return (
    <Container maxWidth={false} sx={{ backgroundColor: "#4b99a5" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              minHeight: "100vh",
              justifyContent: "center",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                zIndex: "modal",
                padding: "48px",
                marginY: [3],
                position: "relative",
                [theme.breakpoints.down("sm")]: {
                  padding: theme.spacing(3),
                },
              }}
            >
              <Box component="div" marginBottom={7}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  Complete your Profile
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#0000008a" }}>
                  Let's get to know you a little better
                </Typography>
              </Box>
              {/* ======== form ======== */}
              <Box component="form" onSubmit={formik.handleSubmit} method="PUT">
                <Grid spacing={2} container>
                  <Grid
                    size={{ xs: 12 }}
                    marginBottom="28px"
                    paddingLeft={3 / 2}
                    paddingTop="0px !important"
                  >
                    <Box
                      component="div"
                      display="flex"
                      flexDirection="column"
                      gap={2}
                    >
                      <Paper sx={{ padding: "16px" }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "700",
                            marginBottom: "16px",
                          }}
                        >
                          Basic Details
                        </Typography>
                        <Grid spacing={2} container sx={{ mt: 2 }}>
                          <Grid
                            size={{ xs: 12, lg: 6 }}
                            marginBottom="28px"
                            paddingLeft={3 / 2}
                            paddingTop="0px !important"
                          >
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor="outlined-adornment-firstName"
                                error={
                                  formik.touched.firstName &&
                                  Boolean(formik.errors.firstName)
                                }
                              >
                                First Name*
                              </InputLabel>
                              <OutlinedInput
                                type="text"
                                required
                                endAdornment={
                                  formik.values.firstName && (
                                    <InputAdornment position="end">
                                      <IconButton
                                        disableRipple
                                        onClick={() => resetField("firstName")}
                                        sx={{
                                          marginRight: "-12px",
                                          padding: "12px",
                                          color: "black",
                                        }}
                                      >
                                        <Close />
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }
                                name="firstName"
                                label="First Name"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                aria-describedby="firstName-error"
                                fullWidth
                                error={
                                  formik.touched.firstName &&
                                  Boolean(formik.errors.firstName)
                                }
                              />
                              {/* ======== error message ======== */}
                              <FormHelperText
                                id="firstName-error"
                                sx={{
                                  fontSize: "11px",
                                  color: theme.palette.error.main,
                                }}
                              >
                                {formik.errors.firstName &&
                                  formik.touched.firstName && (
                                    <Box
                                      component="span"
                                      sx={{ position: "absolute" }}
                                    >
                                      {formik.errors.firstName}
                                    </Box>
                                  )}
                              </FormHelperText>
                              {/* ======== /error message ======== */}
                            </FormControl>
                          </Grid>
                          <Grid
                            size={{ xs: 12, lg: 6 }}
                            marginBottom="28px"
                            paddingLeft={3 / 2}
                            paddingTop="0px !important"
                          >
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor="outlined-adornment-lastName"
                                error={
                                  formik.touched.lastName &&
                                  Boolean(formik.errors.lastName)
                                }
                              >
                                Last Name*
                              </InputLabel>
                              <OutlinedInput
                                required
                                type="text"
                                endAdornment={
                                  formik.values.lastName && (
                                    <InputAdornment position="end">
                                      <IconButton
                                        disableRipple
                                        onClick={() => resetField("lastName")}
                                        sx={{
                                          marginRight: "-12px",
                                          padding: "12px",
                                          color: "black",
                                        }}
                                      >
                                        <Close />
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }
                                name="lastName"
                                label="Last Name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                error={
                                  formik.touched.lastName &&
                                  Boolean(formik.errors.lastName)
                                }
                              />
                              {/* ======== error message ======== */}
                              <FormHelperText
                                id="lastName-error"
                                sx={{
                                  fontSize: "11px",
                                  color: theme.palette.error.main,
                                }}
                              >
                                {formik.errors.lastName &&
                                  formik.touched.lastName && (
                                    <Box
                                      component="span"
                                      sx={{ position: "absolute" }}
                                    >
                                      {formik.errors.lastName}
                                    </Box>
                                  )}
                              </FormHelperText>
                              {/* ======== /error message ======== */}
                            </FormControl>
                          </Grid>
                          <Grid
                            size={{ xs: 12, lg: 6 }}
                            marginBottom="28px"
                            paddingLeft={3 / 2}
                            paddingTop="0px !important"
                          >
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor="outlined-adornment-email"
                                error={
                                  formik.touched.email &&
                                  Boolean(formik.errors.email)
                                }
                              >
                                Email*
                              </InputLabel>
                              <OutlinedInput
                                type="email"
                                name="email"
                                label="Email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                value={formik.values.email}
                                aria-describedby="email-error"
                                fullWidth
                                error={
                                  formik.touched.email &&
                                  Boolean(formik.errors.email)
                                }
                              />
                              {/* ======== error message ======== */}
                              <FormHelperText
                                id="email-error"
                                sx={{
                                  fontSize: "11px",
                                  color: theme.palette.error.main,
                                }}
                              >
                                {formik.errors.email &&
                                  formik.touched.email && (
                                    <Box
                                      component="span"
                                      sx={{ position: "absolute" }}
                                    >
                                      {formik.errors.email}
                                    </Box>
                                  )}
                              </FormHelperText>
                              {/* ======== /error message ======== */}
                            </FormControl>
                          </Grid>
                          <Grid
                            size={{ xs: 12, lg: 6 }}
                            marginBottom="28px"
                            paddingLeft={3 / 2}
                            paddingTop="0px !important"
                          >
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor="outlined-adornment-country"
                                error={
                                  formik.touched.country &&
                                  Boolean(formik.errors.country)
                                }
                              >
                                Country
                              </InputLabel>
                              <Select
                                type="text"
                                name="country"
                                value={formik.values.country}
                                label="Country"
                                onBlur={formik.handleBlur}
                                fullWidth
                                sx={{ textAlign: "left" }}
                                error={
                                  formik.touched.country &&
                                  Boolean(formik.errors.country)
                                }
                              >
                                <MenuItem value="India">India</MenuItem>
                              </Select>
                              {/* ======== error message ======== */}
                              <FormHelperText
                                id="country-error"
                                sx={{
                                  fontSize: "11px",
                                  color: theme.palette.error.main,
                                }}
                              >
                                {formik.errors.country &&
                                  formik.touched.country && (
                                    <Box
                                      component="span"
                                      sx={{ position: "absolute" }}
                                    >
                                      {formik.errors.country}
                                    </Box>
                                  )}
                              </FormHelperText>
                              {/* ======== /error message ======== */}
                            </FormControl>
                          </Grid>
                          <Grid
                            size={{ xs: 12, lg: 6 }}
                            marginBottom="28px"
                            paddingLeft={3 / 2}
                            paddingTop="0px !important"
                          >
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor="outlined-adornment-state"
                                error={
                                  formik.touched.state &&
                                  Boolean(formik.errors.state)
                                }
                              >
                                State/Province/Region
                              </InputLabel>
                              <Select
                                type="text"
                                name="state"
                                value={formik.values.state}
                                label="State/Province/Region"
                                onBlur={formik.handleBlur}
                                fullWidth
                                sx={{ textAlign: "left" }}
                                error={
                                  formik.touched.state &&
                                  Boolean(formik.errors.state)
                                }
                              >
                                <MenuItem value="Punjab">Punjab</MenuItem>
                              </Select>
                              {/* ======== error message ======== */}
                              <FormHelperText
                                id="state-error"
                                sx={{
                                  fontSize: "11px",
                                  color: theme.palette.error.main,
                                }}
                              >
                                {formik.errors.state &&
                                  formik.touched.state && (
                                    <Box
                                      component="span"
                                      sx={{ position: "absolute" }}
                                    >
                                      {formik.errors.state}
                                    </Box>
                                  )}
                              </FormHelperText>
                              {/* ======== /error message ======== */}
                            </FormControl>
                          </Grid>
                          <Grid
                            size={{ xs: 12, lg: 6 }}
                            marginBottom="28px"
                            paddingLeft={3 / 2}
                            paddingTop="0px !important"
                          >
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor="outlined-adornment-mobileNumber"
                                error={
                                  formik.touched.mobileNumber &&
                                  Boolean(formik.errors.mobileNumber)
                                }
                              >
                                Phone 1
                              </InputLabel>
                              <OutlinedInput
                                type="text"
                                endAdornment={
                                  formik.values.mobileNumber.replace(
                                    /\D/g,
                                    ""
                                  ) && (
                                    <InputAdornment position="end">
                                      <IconButton
                                        disableRipple
                                        onClick={() =>
                                          resetField("mobileNumber")
                                        }
                                        sx={{
                                          marginRight: "-12px",
                                          padding: "12px",
                                          color: "black",
                                        }}
                                      >
                                        <Close />
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }
                                name="mobileNumber"
                                label="Mobile Number"
                                value={formik.values.mobileNumber
                                  .replace(/\D/g, "")
                                  .replace(/^(\d{6})(\d)/, "$1-$2")}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="00000-00000"
                                aria-describedby="mobileNumber-error"
                                fullWidth
                                inputProps={{ maxLength: 11 }}
                                error={
                                  formik.touched.mobileNumber &&
                                  Boolean(formik.errors.mobileNumber)
                                }
                              />
                              {/* ======== error message ======== */}
                              <FormHelperText
                                id="mobileNumber-error"
                                sx={{
                                  fontSize: "11px",
                                  color: theme.palette.error.main,
                                }}
                              >
                                {formik.errors.mobileNumber &&
                                  formik.touched.mobileNumber && (
                                    <Box
                                      component="span"
                                      sx={{ position: "absolute" }}
                                    >
                                      {formik.errors.mobileNumber}
                                    </Box>
                                  )}
                              </FormHelperText>
                              {/* ======== /error message ======== */}
                            </FormControl>
                          </Grid>
                          <Grid
                            size={{ xs: 12, lg: 6 }}
                            marginBottom="28px"
                            paddingLeft={3 / 2}
                            paddingTop="0px !important"
                          >
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor="outlined-adornment-mobileNumber"
                                error={
                                  formik.touched.mobileNumber &&
                                  Boolean(formik.errors.mobileNumber)
                                }
                              >
                                Phone 2
                              </InputLabel>
                              <OutlinedInput
                                type="text"
                                endAdornment={
                                  formik.values.mobileNumber.replace(
                                    /\D/g,
                                    ""
                                  ) && (
                                    <InputAdornment position="end">
                                      <IconButton
                                        disableRipple
                                        onClick={() =>
                                          resetField("mobileNumber")
                                        }
                                        sx={{
                                          marginRight: "-12px",
                                          padding: "12px",
                                          color: "black",
                                        }}
                                      >
                                        <Close />
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }
                                name="mobileNumber"
                                label="Mobile Number"
                                value={formik.values.mobileNumber
                                  .replace(/\D/g, "")
                                  .replace(/^(\d{6})(\d)/, "$1-$2")}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="00000-00000"
                                aria-describedby="mobileNumber-error"
                                fullWidth
                                inputProps={{ maxLength: 11 }}
                                error={
                                  formik.touched.mobileNumber &&
                                  Boolean(formik.errors.mobileNumber)
                                }
                              />
                              {/* ======== error message ======== */}
                              <FormHelperText
                                id="mobileNumber-error"
                                sx={{
                                  fontSize: "11px",
                                  color: theme.palette.error.main,
                                }}
                              >
                                {formik.errors.mobileNumber &&
                                  formik.touched.mobileNumber && (
                                    <Box
                                      component="span"
                                      sx={{ position: "absolute" }}
                                    >
                                      {formik.errors.mobileNumber}
                                    </Box>
                                  )}
                              </FormHelperText>
                              {/* ======== /error message ======== */}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Paper>
                      <Paper sx={{ padding: "16px" }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "700",
                            marginBottom: "16px",
                          }}
                        >
                          Address
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                          <Grid
                            size={{ xs: 12, lg: 6 }}
                            marginBottom="28px"
                            paddingLeft={3 / 2}
                            paddingTop="0px !important"
                          >
                            <FormControl fullWidth>
                              <InputLabel htmlFor="outlined-adornment-address">
                                Street Address
                              </InputLabel>
                              <OutlinedInput
                                type="text"
                                endAdornment={
                                  formik.values.address && (
                                    <InputAdornment position="end">
                                      <IconButton
                                        disableRipple
                                        onClick={() => resetField("address")}
                                        sx={{
                                          marginRight: "-12px",
                                          padding: "12px",
                                          color: "black",
                                        }}
                                      >
                                        <Close />
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }
                                name="address"
                                label="Street Address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                aria-describedby="address-error"
                                fullWidth
                                error={
                                  formik.touched.address &&
                                  Boolean(formik.errors.address)
                                }
                              />
                              <FormHelperText
                                id="address-error"
                                sx={{
                                  fontSize: "11px",
                                  color: theme.palette.error.main,
                                }}
                              >
                                {formik.errors.address &&
                                  formik.touched.address && (
                                    <Box
                                      component="span"
                                      sx={{ position: "absolute" }}
                                    >
                                      {formik.errors.address}
                                    </Box>
                                  )}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                          <Grid
                            size={{ xs: 12, lg: 6 }}
                            marginBottom="28px"
                            paddingLeft={3 / 2}
                            paddingTop="0px !important"
                          >
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor="outlined-adornment-postCode"
                                error={
                                  formik.touched.postCode &&
                                  Boolean(formik.errors.postCode)
                                }
                              >
                                Postal Code
                              </InputLabel>
                              <OutlinedInput
                                type="text"
                                endAdornment={
                                  formik.values.postCode.replace(/\D/g, "") && (
                                    <InputAdornment position="end">
                                      <IconButton
                                        disableRipple
                                        onClick={() => resetField("postCode")}
                                        sx={{
                                          marginRight: "-12px",
                                          padding: "12px",
                                          color: "black",
                                        }}
                                      >
                                        <Close />
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }
                                name="postCode"
                                label="Postal Code"
                                value={formik.values.postCode.replace(
                                  /\D/g,
                                  ""
                                )}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="12345"
                                aria-describedby="postCode-error"
                                fullWidth
                                inputProps={{ maxLength: 5 }}
                                error={
                                  formik.touched.postCode &&
                                  Boolean(formik.errors.postCode)
                                }
                              />
                              {/* ======== error message ======== */}
                              <FormHelperText
                                id="postCode-error"
                                sx={{
                                  fontSize: "11px",
                                  color: theme.palette.error.main,
                                }}
                              >
                                {formik.errors.postCode &&
                                  formik.touched.postCode && (
                                    <Box
                                      component="span"
                                      sx={{ position: "absolute" }}
                                    >
                                      {formik.errors.postCode}
                                    </Box>
                                  )}
                              </FormHelperText>
                              {/* ======== /error message ======== */}
                            </FormControl>
                          </Grid>
                          <Grid
                            size={{ xs: 12, lg: 6 }}
                            marginBottom="28px"
                            paddingLeft={3 / 2}
                            paddingTop="0px !important"
                          >
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor="outlined-adornment-city"
                                error={
                                  formik.touched.city &&
                                  Boolean(formik.errors.city)
                                }
                              >
                                City
                              </InputLabel>
                              <Select
                                type="text"
                                name="city"
                                value={formik.values.city}
                                label="City"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                sx={{ textAlign: "left" }}
                                error={
                                  formik.touched.city &&
                                  Boolean(formik.errors.city)
                                }
                              >
                                <MenuItem value="Mohali">Mohali</MenuItem>
                              </Select>
                              {/* ======== error message ======== */}
                              <FormHelperText
                                id="city-error"
                                sx={{
                                  fontSize: "11px",
                                  color: theme.palette.error.main,
                                }}
                              >
                                {formik.errors.city && formik.touched.city && (
                                  <Box
                                    component="span"
                                    sx={{ position: "absolute" }}
                                  >
                                    {formik.errors.city}
                                  </Box>
                                )}
                              </FormHelperText>
                              {/* ======== /error message ======== */}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Paper>
                      <Box
                        component="div"
                        alignSelf="end"
                        display="flex"
                        gap={2}
                      >
                        <Button
                          variant="outlined"
                          onClick={handleLogout}
                          sx={{
                            textTransform: "none",
                            fontSize: "16px",
                            paddingY: "14px",
                          }}
                        >
                          Logout
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            textTransform: "none",
                            fontSize: "16px",
                            paddingY: "14px",
                          }}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    </Box>
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
}

export default UserInfo;
