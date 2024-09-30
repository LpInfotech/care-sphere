import { useState } from "react";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { Close } from "@mui/icons-material";
import theme from "../../../shared/theme/theme";
import SnackBar from "../../../shared/components/snackbar/snackbar";
import Grid from "@mui/material/Grid2";
import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const CustomTabPanel = React.memo((props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
});

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
    phone1: yup
      .string()
      .required("This is required")
      .min(11, "Mobile number must contain 10 digits"),
    phone2: yup
      .string()
      .required("This is required")
      .min(11, "Mobile number must contain 10 digits"),
    postCode: yup.string().required("This is required"),
    address: yup.string().required("This is required"),
    state: yup.string().required("This is required"),
    country: yup.string().required("This is required"),
    role: yup.string().required("This is required"),
    position: yup.string().required("This is required"),
    division: yup.string().required("This is required"),
  });

  // ======== put data to API to update user data ========
  const UpdateUser = () => {};

  //======== formik validating onsubmit ========
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone1: "",
      phone2: "",
      postCode: "",
      address: "",
      city: "",
      state: "",
      country: "",
      role: "",
      position: "",
      position2: "",
      division: "",
      secondaryEmail: "",
      superviser: "",
      allergies: "",
      empno: "",
      dob: "",
      type: "",
      emergencyName1: "",
      emergencyPhone1: "",
      emergencyRelationship1: "",
      emergencyName2: "",
      emergencyPhone2: "",
      emergencyRelationship2: "",
      reasonForLeave: "",
      startDate: "",
      returnDate: "",
      wellnessDays: "",
      vacationDays: "",
    },
    validationSchema: basicSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: UpdateUser,
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
                width: "100%",
                [theme.breakpoints.down("sm")]: {
                  padding: theme.spacing(3),
                },
              }}
            >
              <Box component="div">
                <Typography
                  variant="h5"
                  marginBottom={2}
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  Update Staff Member
                </Typography>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="tabs"
                  sx={{ backgroundColor: "#f8f9fa" }}
                >
                  <Tab label="Profile" {...a11yProps(0)} />
                  <Tab label="Staff Wages & Benefits" {...a11yProps(1)} />
                  <Tab label="Emergency Contacts" {...a11yProps(2)} />
                  <Tab label="Start Date & Termination" {...a11yProps(3)} />
                </Tabs>
              </Box>
              {/* ======== form ======== */}

              <Box component="form" onSubmit={formik.handleSubmit} method="PUT">
                <Grid spacing={2} container>
                  <Grid
                    size={{ xs: 12 }}
                    marginBottom="28px"
                    paddingLeft={0}
                    paddingTop="0px !important"
                  >
                    <Box
                      component="div"
                      display="flex"
                      flexDirection="column"
                      gap={2}
                    >
                      <Paper
                        sx={{
                          padding: "16px",
                        }}
                      >
                        <CustomTabPanel value={value} index={0}>
                          <Grid spacing={2} container sx={{ mt: 2 }}>
                            <Grid size={{ xs: 12 }} marginBottom="28px">
                              <FormLabel id="demo-controlled-radio-buttons-group">
                                Type
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={formik.values.type}
                                onChange={(event) =>
                                  formik.setFieldValue(
                                    "type",
                                    event.target.value
                                  )
                                }
                                sx={{ display: "block" }}
                              >
                                <FormControlLabel
                                  value="volunteer"
                                  control={<Radio />}
                                  label="Volunteer"
                                />
                                <FormControlLabel
                                  value="staff"
                                  control={<Radio />}
                                  label="Staff"
                                />
                              </RadioGroup>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <OutlinedInput
                                  type="text"
                                  required
                                  endAdornment={
                                    formik.values.firstName && (
                                      <InputAdornment position="end">
                                        <IconButton
                                          disableRipple
                                          onClick={() =>
                                            resetField("firstName")
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
                                  name="firstName"
                                  placeholder="First Name*"
                                  // label="First Name *  "
                                  value={formik.values.firstName}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  aria-describedby="firstName-error"
                                  fullWidth
                                  error={
                                    formik.touched.firstName &&
                                    Boolean(formik.errors.firstName)
                                  }
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
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
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
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
                                  placeholder="Last Name*"
                                  value={formik.values.lastName}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                  error={
                                    formik.touched.lastName &&
                                    Boolean(formik.errors.lastName)
                                  }
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
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
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <OutlinedInput
                                  type="email"
                                  name="email"
                                  placeholder="Email Address*"
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
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
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
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <Select
                                  type="text"
                                  name="country"
                                  value={formik.values.country}
                                  displayEmpty
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  fullWidth
                                  sx={{
                                    textAlign: "left",
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                  error={
                                    formik.touched.country &&
                                    Boolean(formik.errors.country)
                                  }
                                >
                                  <MenuItem value="" disabled>
                                    Country
                                  </MenuItem>
                                  <MenuItem value="India">India</MenuItem>
                                  <MenuItem value="USA">USA</MenuItem>
                                  <MenuItem value="Canada">Canada</MenuItem>
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
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <Select
                                  type="text"
                                  name="state"
                                  value={formik.values.state}
                                  displayEmpty
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  fullWidth
                                  sx={{
                                    textAlign: "left",
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                  error={
                                    formik.touched.state &&
                                    Boolean(formik.errors.state)
                                  }
                                >
                                  <MenuItem value="" disabled>
                                    State/Province/Region
                                  </MenuItem>
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
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <OutlinedInput
                                  type="text"
                                  endAdornment={
                                    formik.values.phone1.replace(/\D/g, "") && (
                                      <InputAdornment position="end">
                                        <IconButton
                                          disableRipple
                                          onClick={() => resetField("phone1")}
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
                                  name="phone1"
                                  placeholder="Phone 1"
                                  value={formik.values.phone1
                                    .replace(/\D/g, "")
                                    .replace(/^(\d{5})(\d)/, "$1-$2")}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  // placeholder="00000-00000"
                                  aria-describedby="phone1-error"
                                  fullWidth
                                  inputProps={{ maxLength: 11 }}
                                  error={
                                    formik.touched.phone1 &&
                                    Boolean(formik.errors.phone1)
                                  }
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                />
                                {/* ======== error message ======== */}
                                <FormHelperText
                                  id="phone1-error"
                                  sx={{
                                    fontSize: "11px",
                                    color: theme.palette.error.main,
                                  }}
                                >
                                  {formik.errors.phone1 &&
                                    formik.touched.phone1 && (
                                      <Box
                                        component="span"
                                        sx={{ position: "absolute" }}
                                      >
                                        {formik.errors.phone1}
                                      </Box>
                                    )}
                                </FormHelperText>
                                {/* ======== /error message ======== */}
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 3 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <OutlinedInput
                                  type="text"
                                  name="phone2"
                                  placeholder="Phone 2"
                                  value={formik.values.phone2
                                    .replace(/\D/g, "")
                                    .replace(/^(\d{5})(\d)/, "$1-$2")}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  // placeholder="00000-00000"
                                  fullWidth
                                  inputProps={{ maxLength: 11 }}
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                />
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 3 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <Select
                                  type="text"
                                  name="role"
                                  value={formik.values.role}
                                  placeholder="Role*"
                                  displayEmpty
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                  sx={{
                                    textAlign: "left",
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                  error={
                                    formik.touched.role &&
                                    Boolean(formik.errors.role)
                                  }
                                >
                                  <MenuItem value="" disabled>
                                    Role<span style={{ color: "red" }}>*</span>
                                  </MenuItem>
                                  <MenuItem value="role">role</MenuItem>
                                </Select>
                                {/* ======== error message ======== */}
                                <FormHelperText
                                  id="role-error"
                                  sx={{
                                    fontSize: "11px",
                                    color: theme.palette.error.main,
                                  }}
                                >
                                  {formik.errors.role &&
                                    formik.touched.role && (
                                      <Box
                                        component="span"
                                        sx={{ position: "absolute" }}
                                      >
                                        {formik.errors.role}
                                      </Box>
                                    )}
                                </FormHelperText>
                                {/* ======== /error message ======== */}
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 3 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <Select
                                  type="text"
                                  name="position"
                                  value={formik.values.position}
                                  placeholder="Position*"
                                  displayEmpty
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  fullWidth
                                  sx={{
                                    textAlign: "left",
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                  error={
                                    formik.touched.position &&
                                    Boolean(formik.errors.position)
                                  }
                                >
                                  <MenuItem value="" disabled>
                                    Position
                                    <span style={{ color: "red" }}>*</span>
                                  </MenuItem>
                                  <MenuItem value="position">position</MenuItem>
                                </Select>
                                {/* ======== error message ======== */}
                                <FormHelperText
                                  id="position-error"
                                  sx={{
                                    fontSize: "11px",
                                    color: theme.palette.error.main,
                                  }}
                                >
                                  {formik.errors.position &&
                                    formik.touched.position && (
                                      <Box
                                        component="span"
                                        sx={{ position: "absolute" }}
                                      >
                                        {formik.errors.position}
                                      </Box>
                                    )}
                                </FormHelperText>
                                {/* ======== /error message ======== */}
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 3 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <Select
                                  type="text"
                                  name="position2"
                                  value={formik.values.position2}
                                  placeholder="Position 2"
                                  displayEmpty
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  fullWidth
                                  sx={{
                                    textAlign: "left",
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                  error={
                                    formik.touched.position2 &&
                                    Boolean(formik.errors.position2)
                                  }
                                >
                                  <MenuItem value="" disabled>
                                    Position 2
                                  </MenuItem>
                                  <MenuItem value="Position">
                                    Position 2
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 4 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <Select
                                  type="text"
                                  name="division"
                                  value={formik.values.division}
                                  placeholder="Division*"
                                  displayEmpty
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  fullWidth
                                  sx={{
                                    textAlign: "left",
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                  error={
                                    formik.touched.division &&
                                    Boolean(formik.errors.division)
                                  }
                                >
                                  <MenuItem value="" disabled>
                                    Division
                                    <span style={{ color: "red" }}>*</span>
                                  </MenuItem>
                                  <MenuItem value="division">division</MenuItem>
                                </Select>
                                {/* ======== error message ======== */}
                                <FormHelperText
                                  id="division-error"
                                  sx={{
                                    fontSize: "11px",
                                    color: theme.palette.error.main,
                                  }}
                                >
                                  {formik.errors.division &&
                                    formik.touched.division && (
                                      <Box
                                        component="span"
                                        sx={{ position: "absolute" }}
                                      >
                                        {formik.errors.division}
                                      </Box>
                                    )}
                                </FormHelperText>
                                {/* ======== /error message ======== */}
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <OutlinedInput
                                  type="text"
                                  readOnly
                                  name="superviser"
                                  placeholder="Supervised by"
                                  value="Tao, David"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  aria-describedby="superviser-error"
                                  fullWidth
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                />
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
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
                                  placeholder="Address"
                                  value={formik.values.address}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  aria-describedby="address-error"
                                  fullWidth
                                  error={
                                    formik.touched.address &&
                                    Boolean(formik.errors.address)
                                  }
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
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
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <OutlinedInput
                                  type="email"
                                  name="secondaryEmail"
                                  placeholder="Secondary Email"
                                  value={formik.values.secondaryEmail}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  aria-describedby="secondaryEmail-error"
                                  fullWidth
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                />
                                {/* ======== error message ======== */}
                                <FormHelperText
                                  id="secondaryEmail-error"
                                  sx={{
                                    fontSize: "11px",
                                    color: theme.palette.error.main,
                                  }}
                                >
                                  {formik.errors.secondaryEmail &&
                                    formik.touched.secondaryEmail && (
                                      <Box
                                        component="span"
                                        sx={{ position: "absolute" }}
                                      >
                                        {formik.errors.secondaryEmail}
                                      </Box>
                                    )}
                                </FormHelperText>
                                {/* ======== /error message ======== */}
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <OutlinedInput
                                  type="text"
                                  name="city"
                                  value={formik.values.city}
                                  placeholder="City"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  aria-describedby="city-error"
                                  fullWidth
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                />
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <TextField
                                  type="text"
                                  multiline
                                  name="allergies"
                                  value={formik.values.allergies}
                                  placeholder="Allergies"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                  slotProps={{
                                    htmlInput: {
                                      sx: {
                                        fontSize: "12px",
                                      },
                                    },
                                    input: {
                                      sx: {
                                        borderRadius: "50px",
                                      },
                                    },
                                  }}
                                />
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <OutlinedInput
                                  type="text"
                                  name="postCode"
                                  value={formik.values.postCode.replace(
                                    /\D/g,
                                    ""
                                  )}
                                  inputProps={{ maxLength: 6 }}
                                  placeholder="Postal Code"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  aria-describedby="postCode-error"
                                  fullWidth
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                />
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControlLabel
                                control={<Checkbox />}
                                label="Do you drive?"
                              />
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <OutlinedInput
                                  type="text"
                                  name="empno"
                                  value={formik.values.empno.replace(/\D/g, "")}
                                  placeholder="Employee Number"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  aria-describedby="empno-error"
                                  fullWidth
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                />
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <OutlinedInput
                                  type="date"
                                  name="dob"
                                  placeholder="Date of Birth"
                                  value={formik.values.dob}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                          <Grid spacing={2} container sx={{ mt: 2 }}>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormLabel id="demo-controlled-radio-buttons-group">
                                Pay Type<span style={{ color: "red" }}>*</span>
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={formik.values.type}
                                onChange={(event) =>
                                  formik.setFieldValue(
                                    "type",
                                    event.target.value
                                  )
                                }
                                sx={{ marginBottom: 5, display: "block" }}
                              >
                                <FormControlLabel
                                  value="Salary"
                                  control={<Radio />}
                                  label="Salary"
                                />
                                <FormControlLabel
                                  value="Hourly"
                                  control={<Radio />}
                                  label="Hourly"
                                />
                              </RadioGroup>
                              <FormControl fullWidth>
                                <OutlinedInput
                                  type="text"
                                  readOnly
                                  name="benefitsStartDate"
                                  placeholder="Benefits Start Date"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                />
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormLabel id="demo-controlled-radio-buttons-group">
                                Status<span style={{ color: "red" }}>*</span>
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={formik.values.type}
                                onChange={(event) =>
                                  formik.setFieldValue(
                                    "type",
                                    event.target.value
                                  )
                                }
                                sx={{ display: "block" }}
                              >
                                <FormControlLabel
                                  value="Casual"
                                  control={<Radio />}
                                  label="Casual"
                                />
                                <FormControlLabel
                                  value="Casual Temporary"
                                  control={<Radio />}
                                  label="Casual Temporary"
                                />
                                <FormControlLabel
                                  value="Full Time"
                                  control={<Radio />}
                                  label="Full Time"
                                />
                                <FormControlLabel
                                  value="Full Time Temporary"
                                  control={<Radio />}
                                  label="Full Time Temporary"
                                />
                                <FormControlLabel
                                  value="Part Time"
                                  control={<Radio />}
                                  label="Part Time"
                                />
                                <FormControlLabel
                                  value="Part Time Temporary"
                                  control={<Radio />}
                                  label="Part Time Temporary"
                                />
                              </RadioGroup>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <OutlinedInput
                                  type="number"
                                  name="wellnessDays"
                                  placeholder="Wellness Days"
                                  value={formik.values.wellnessDays}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                />
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <OutlinedInput
                                  type="number"
                                  name="vacationDays"
                                  placeholder="Vacation Days"
                                  value={formik.values.vacationDays}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                  }}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                          <Grid spacing={2} container sx={{ mt: 2 }}>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <Typography variant="h5" marginBottom={2}>
                                Emergency Contact 1
                              </Typography>

                              <Grid size={{ xs: 12 }} marginBottom="28px">
                                <FormControl fullWidth>
                                  <OutlinedInput
                                    type="text"
                                    name="emergencyName1"
                                    placeholder="Name"
                                    value={formik.values.emergencyName1}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{
                                      borderRadius: "50px",
                                      fontSize: "12px",
                                      padding: 1 / 2,
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid
                                size={{ xs: 12, lg: 3 }}
                                marginBottom="28px"
                              >
                                <FormControl fullWidth>
                                  <OutlinedInput
                                    type="text"
                                    name="emergencyPhone1"
                                    placeholder="Phone"
                                    value={formik.values.emergencyPhone1
                                      .replace(/\D/g, "")
                                      .replace(/^(\d{5})(\d)/, "$1-$2")}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // placeholder="00000-00000"
                                    fullWidth
                                    inputProps={{ maxLength: 11 }}
                                    sx={{
                                      borderRadius: "50px",
                                      fontSize: "12px",
                                      padding: 1 / 2,
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid
                                size={{ xs: 12, lg: 6 }}
                                marginBottom="28px"
                              >
                                <FormControl fullWidth>
                                  <OutlinedInput
                                    type="text"
                                    name="emergencyRelationship1"
                                    placeholder="Relationship"
                                    value={formik.values.emergencyRelationship1}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    sx={{
                                      borderRadius: "50px",
                                      fontSize: "12px",
                                      padding: 1 / 2,
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <Typography variant="h5" marginBottom={2}>
                                Emergency Contact 2
                              </Typography>

                              <Grid size={{ xs: 12 }} marginBottom="28px">
                                <FormControl fullWidth>
                                  <OutlinedInput
                                    type="text"
                                    name="emergencyName2"
                                    placeholder="Name"
                                    value={formik.values.emergencyName2}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{
                                      borderRadius: "50px",
                                      fontSize: "12px",
                                      padding: 1 / 2,
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid
                                size={{ xs: 12, lg: 3 }}
                                marginBottom="28px"
                              >
                                <FormControl fullWidth>
                                  <OutlinedInput
                                    type="text"
                                    name="emergencyPhone2"
                                    placeholder="Phone"
                                    value={formik.values.emergencyPhone2
                                      .replace(/\D/g, "")
                                      .replace(/^(\d{5})(\d)/, "$1-$2")}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // placeholder="00000-00000"
                                    fullWidth
                                    inputProps={{ maxLength: 11 }}
                                    sx={{
                                      borderRadius: "50px",
                                      fontSize: "12px",
                                      padding: 1 / 2,
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid
                                size={{ xs: 12, lg: 6 }}
                                marginBottom="28px"
                              >
                                <FormControl fullWidth>
                                  <OutlinedInput
                                    type="text"
                                    name="emergencyRelationship2"
                                    placeholder="Relationship"
                                    value={formik.values.emergencyRelationship2}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    sx={{
                                      borderRadius: "50px",
                                      fontSize: "12px",
                                      padding: 1 / 2,
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                          <Grid spacing={2} container sx={{ mt: 2 }}>
                            <Grid size={{ xs: 12, lg: 4 }} marginBottom="28px">
                              <FormControl fullWidth>
                                <Typography variant="subtitle2">
                                  Start Date
                                </Typography>
                                <TextField
                                  type="date"
                                  name="startDate"
                                  value={formik.values.startDate}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                  slotProps={{
                                    htmlInput: {
                                      sx: {
                                        fontSize: "12px",
                                      },
                                    },
                                    input: {
                                      sx: {
                                        borderRadius: "50px",
                                        padding: 1 / 2,
                                      },
                                    },
                                  }}
                                />
                              </FormControl>
                              <Button
                                disableFocusRipple
                                sx={{
                                  textTransform: "none",
                                  fontSize: "16px",
                                  paddingY: "14px",
                                  paddingX: "28px",
                                  marginBottom: 3,
                                  borderRadius: "50px",
                                  mt: 2,
                                }}
                                variant="contained"
                                color="error"
                              >
                                Terminate
                              </Button>
                              <FormControl fullWidth sx={{ mt: 5 }}>
                                <Typography variant="subtitle2">
                                  Expected Date of Return
                                </Typography>
                                <TextField
                                  type="date"
                                  name="returnDate"
                                  value={formik.values.returnDate}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                  slotProps={{
                                    htmlInput: {
                                      sx: {
                                        fontSize: "12px",
                                      },
                                    },
                                    input: {
                                      sx: {
                                        borderRadius: "50px",
                                        padding: 1 / 2,
                                      },
                                    },
                                  }}
                                />
                              </FormControl>
                              <Button
                                disableFocusRipple
                                sx={{
                                  textTransform: "none",
                                  fontSize: "16px",
                                  paddingY: "14px",
                                  paddingX: "28px",
                                  marginBottom: 3,
                                  borderRadius: "50px",
                                  mt: 2,
                                }}
                                variant="contained"
                                color="warning"
                              >
                                Place on Leave
                              </Button>
                              <FormControl fullWidth sx={{ mt: 5 }}>
                                <Select
                                  type="text"
                                  name="reasonForLeave"
                                  value={formik.values.reasonForLeave}
                                  displayEmpty
                                  placeholder="Reason for Leave"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    padding: 1 / 2,
                                    textAlign: "left",
                                  }}
                                >
                                  <MenuItem value="" disabled>
                                    Reason for Leave
                                  </MenuItem>
                                  <MenuItem value="Select a reason">
                                    --Select a reason
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 8 }} marginBottom="28px">
                              <Typography variant="h5" marginBottom={2}>
                                Start/Terminate History
                              </Typography>
                              <Typography variant="subtitle2" marginBottom={2}>
                                No Start/Terminate History
                              </Typography>
                            </Grid>
                          </Grid>
                        </CustomTabPanel>
                      </Paper>
                      <Box
                        component="div"
                        display="flex"
                        flexDirection={{ xs: "column", sm: "row" }}
                        justifyContent={{ sm: "flex-end" }}
                        gap={2}
                      >
                        <Button
                          disableFocusRipple
                          variant="outlined"
                          sx={{
                            textTransform: "none",
                            fontSize: "16px",
                            paddingY: "14px",
                            paddingX: "28px",
                            sm: { marginBottom: 3 },
                            borderRadius: "50px",
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disableFocusRipple
                          variant="contained"
                          sx={{
                            textTransform: "none",
                            fontSize: "16px",
                            paddingY: "14px",
                            paddingX: "28px",
                            sm: { marginBottom: 3 },
                            borderRadius: "50px",
                          }}
                        >
                          Save
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
