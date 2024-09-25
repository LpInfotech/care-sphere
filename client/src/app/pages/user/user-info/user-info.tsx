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
              <Box component="div" marginBottom={7}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  Update Staff Member
                </Typography>
                <Tabs value={value} onChange={handleChange} aria-label="tabs">
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
                    paddingLeft={3 / 2}
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
                            <Grid
                              size={{ xs: 12 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
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
                                  onChange={formik.handleChange}
                                  fullWidth
                                  sx={{ textAlign: "left" }}
                                  error={
                                    formik.touched.country &&
                                    Boolean(formik.errors.country)
                                  }
                                >
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
                                  onChange={formik.handleChange}
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
                                  htmlFor="outlined-adornment-phone1"
                                  error={
                                    formik.touched.phone1 &&
                                    Boolean(formik.errors.phone1)
                                  }
                                >
                                  Phone 1
                                </InputLabel>
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
                                  label="Phone 1"
                                  value={formik.values.phone1
                                    .replace(/\D/g, "")
                                    .replace(/^(\d{6})(\d)/, "$1-$2")}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  placeholder="00000-00000"
                                  aria-describedby="phone1-error"
                                  fullWidth
                                  inputProps={{ maxLength: 11 }}
                                  error={
                                    formik.touched.phone1 &&
                                    Boolean(formik.errors.phone1)
                                  }
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
                            <Grid
                              size={{ xs: 12, lg: 3 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-phone2">
                                  Phone 2
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  name="phone2"
                                  label="Phone 2"
                                  value={formik.values.phone2
                                    .replace(/\D/g, "")
                                    .replace(/^(\d{5})(\d)/, "$1-$2")}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  placeholder="00000-00000"
                                  fullWidth
                                  inputProps={{ maxLength: 11 }}
                                />
                              </FormControl>
                            </Grid>
                            <Grid
                              size={{ xs: 12, lg: 3 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControl fullWidth>
                                <InputLabel
                                  htmlFor="outlined-adornment-role"
                                  error={
                                    formik.touched.role &&
                                    Boolean(formik.errors.role)
                                  }
                                >
                                  Role*
                                </InputLabel>
                                <Select
                                  type="text"
                                  name="role"
                                  value={formik.values.role}
                                  label="Role"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                  sx={{ textAlign: "left" }}
                                  error={
                                    formik.touched.role &&
                                    Boolean(formik.errors.role)
                                  }
                                >
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
                            <Grid
                              size={{ xs: 12, lg: 3 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControl fullWidth>
                                <InputLabel
                                  htmlFor="outlined-adornment-position"
                                  error={
                                    formik.touched.position &&
                                    Boolean(formik.errors.position)
                                  }
                                >
                                  Position*
                                </InputLabel>
                                <Select
                                  type="text"
                                  name="position"
                                  value={formik.values.position}
                                  label="Position"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  fullWidth
                                  sx={{ textAlign: "left" }}
                                  error={
                                    formik.touched.position &&
                                    Boolean(formik.errors.position)
                                  }
                                >
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
                            <Grid
                              size={{ xs: 12, lg: 3 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-position2">
                                  Position 2
                                </InputLabel>
                                <Select
                                  type="text"
                                  name="position2"
                                  value={formik.values.position2}
                                  label="Position 2"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  fullWidth
                                  sx={{ textAlign: "left" }}
                                  error={
                                    formik.touched.position2 &&
                                    Boolean(formik.errors.position2)
                                  }
                                >
                                  <MenuItem value="Position">
                                    Position 2
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid
                              size={{ xs: 12, lg: 4 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControl fullWidth>
                                <InputLabel
                                  htmlFor="outlined-adornment-division"
                                  error={
                                    formik.touched.division &&
                                    Boolean(formik.errors.division)
                                  }
                                >
                                  Division*
                                </InputLabel>
                                <Select
                                  type="text"
                                  name="division"
                                  value={formik.values.division}
                                  label="Division"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  fullWidth
                                  sx={{ textAlign: "left" }}
                                  error={
                                    formik.touched.division &&
                                    Boolean(formik.errors.division)
                                  }
                                >
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
                            <Grid
                              size={{ xs: 12, lg: 6 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-superviser">
                                  Supervised by
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  readOnly
                                  name="superviser"
                                  label="Supervised by"
                                  value="Tao, David"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  aria-describedby="superviser-error"
                                  fullWidth
                                />
                              </FormControl>
                            </Grid>
                            <Grid
                              size={{ xs: 12, lg: 6 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-address">
                                  Address
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
                                <InputLabel htmlFor="outlined-adornment-secondaryEmail">
                                  Secondary Email
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  name="secondaryEmail"
                                  label="Secondary Email"
                                  value={formik.values.secondaryEmail}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  aria-describedby="secondaryEmail-error"
                                  fullWidth
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
                            <Grid
                              size={{ xs: 12, lg: 6 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-city">
                                  City
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  name="city"
                                  value={formik.values.city}
                                  label="City"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  aria-describedby="city-error"
                                  fullWidth
                                />
                              </FormControl>
                            </Grid>
                            <Grid
                              size={{ xs: 12, lg: 6 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControl fullWidth>
                                <TextField
                                  type="text"
                                  rows={4}
                                  multiline
                                  name="allergies"
                                  value={formik.values.allergies}
                                  label="Allergies"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  aria-describedby="allergies-error"
                                  fullWidth
                                />
                              </FormControl>
                            </Grid>
                            <Grid
                              size={{ xs: 12, lg: 6 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-postCode">
                                  Postal Code
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  name="postCode"
                                  value={formik.values.postCode}
                                  label="Postal Code"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  aria-describedby="postCode-error"
                                  fullWidth
                                />
                              </FormControl>
                            </Grid>
                            <Grid
                              size={{ xs: 12, lg: 6 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControlLabel
                                control={<Checkbox />}
                                label="Do you drive?"
                              />
                            </Grid>
                            <Grid
                              size={{ xs: 12, lg: 6 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-empno">
                                  Employee Number
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  name="empno"
                                  value={formik.values.empno}
                                  label="Employee Number"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  aria-describedby="empno-error"
                                  fullWidth
                                />
                              </FormControl>
                            </Grid>
                            <Grid
                              size={{ xs: 12, lg: 6 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControl fullWidth>
                                <OutlinedInput
                                  type="date"
                                  name="dob"
                                  value={formik.values.dob}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  aria-describedby="dob-error"
                                  fullWidth
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                          <Box
                            component="div"
                            display="flex"
                            sx={{ float: "inline-end" }}
                            gap={2}
                          >
                            <Button
                              variant="outlined"
                              sx={{
                                textTransform: "none",
                                fontSize: "16px",
                                paddingY: "14px",
                              }}
                            >
                              Cancel
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
                              Save
                            </Button>
                          </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                          <Grid spacing={2} container sx={{ mt: 2 }}>
                            <Grid
                              size={{ xs: 12, lg: 6 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormLabel id="demo-controlled-radio-buttons-group">
                                Pay Type*
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
                                sx={{ marginBottom: 5 }}
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
                                <InputLabel htmlFor="outlined-adornment-benefitsStartDate">
                                  Benefits Start Date
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  readOnly
                                  name="benefitsStartDate"
                                  label="Benefits Start Date"
                                  value="09/07/2024"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                />
                              </FormControl>
                            </Grid>
                            <Grid
                              size={{ xs: 12, lg: 6 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormLabel id="demo-controlled-radio-buttons-group">
                                Status*
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
                            <Grid
                              size={{ xs: 12, lg: 6 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-wellnessDays">
                                  Wellness Days
                                </InputLabel>
                                <OutlinedInput
                                  type="number"
                                  name="wellnessDays"
                                  label="Wellness Days"
                                  value="0"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                />
                              </FormControl>
                            </Grid>
                            <Grid
                              size={{ xs: 12, lg: 6 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-vacationDays">
                                  Vacation Days
                                </InputLabel>
                                <OutlinedInput
                                  type="number"
                                  name="vacationDays"
                                  label="Vacation Days"
                                  value="0"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                          <Box
                            component="div"
                            display="flex"
                            sx={{ float: "inline-end" }}
                            gap={2}
                          >
                            <Button
                              variant="outlined"
                              sx={{
                                textTransform: "none",
                                fontSize: "16px",
                                paddingY: "14px",
                              }}
                            >
                              Cancel
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
                              Save
                            </Button>
                          </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                          <Grid spacing={2} container sx={{ mt: 2 }}>
                            <Grid size={{ xs: 12, lg: 6 }} marginBottom="28px">
                              <Typography variant="h5" marginBottom={2}>
                                Emergency Contact 1
                              </Typography>

                              <Grid size={{ xs: 12 }} marginBottom="28px">
                                <FormControl fullWidth>
                                  <InputLabel htmlFor="outlined-adornment-emergencyName1">
                                    Name
                                  </InputLabel>
                                  <OutlinedInput
                                    type="text"
                                    name="emergencyName1"
                                    label="Name"
                                    value={formik.values.emergencyName1}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid
                                size={{ xs: 12, lg: 3 }}
                                marginBottom="28px"
                              >
                                <FormControl fullWidth>
                                  <InputLabel htmlFor="outlined-adornment-emergencyPhone1">
                                    Phone
                                  </InputLabel>
                                  <OutlinedInput
                                    type="text"
                                    name="emergencyPhone1"
                                    label="Phone"
                                    value={formik.values.emergencyPhone1
                                      .replace(/\D/g, "")
                                      .replace(/^(\d{5})(\d)/, "$1-$2")}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="00000-00000"
                                    fullWidth
                                    inputProps={{ maxLength: 11 }}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid
                                size={{ xs: 12, lg: 6 }}
                                marginBottom="28px"
                              >
                                <FormControl fullWidth>
                                  <InputLabel htmlFor="outlined-adornment-emergencyRelationship1">
                                    Relationship
                                  </InputLabel>
                                  <OutlinedInput
                                    type="text"
                                    name="emergencyRelationship1"
                                    label="Relationship"
                                    value={formik.values.emergencyRelationship1}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
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
                                  <InputLabel htmlFor="outlined-adornment-emergencyName2">
                                    Name
                                  </InputLabel>
                                  <OutlinedInput
                                    type="text"
                                    name="emergencyName2"
                                    label="Name"
                                    value={formik.values.emergencyName2}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid
                                size={{ xs: 12, lg: 3 }}
                                marginBottom="28px"
                              >
                                <FormControl fullWidth>
                                  <InputLabel htmlFor="outlined-adornment-emergencyPhone2">
                                    Phone
                                  </InputLabel>
                                  <OutlinedInput
                                    type="text"
                                    name="emergencyPhone2"
                                    label="Phone"
                                    value={formik.values.emergencyPhone2
                                      .replace(/\D/g, "")
                                      .replace(/^(\d{5})(\d)/, "$1-$2")}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="00000-00000"
                                    fullWidth
                                    inputProps={{ maxLength: 11 }}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid
                                size={{ xs: 12, lg: 6 }}
                                marginBottom="28px"
                              >
                                <FormControl fullWidth>
                                  <InputLabel htmlFor="outlined-adornment-emergencyRelationship2">
                                    Relationship
                                  </InputLabel>
                                  <OutlinedInput
                                    type="text"
                                    name="emergencyRelationship2"
                                    label="Relationship"
                                    value={formik.values.emergencyRelationship2}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                  />
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Box
                            component="div"
                            display="flex"
                            sx={{ float: "inline-end" }}
                            gap={2}
                          >
                            <Button
                              variant="outlined"
                              sx={{
                                textTransform: "none",
                                fontSize: "16px",
                                paddingY: "14px",
                              }}
                            >
                              Cancel
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
                              Save
                            </Button>
                          </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                          <Grid spacing={2} container sx={{ mt: 2 }}>
                            <Grid
                              size={{ xs: 12, lg: 4 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
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
                                />
                              </FormControl>
                              <Button
                                variant="contained"
                                color="error"
                                sx={{ mt: 2 }}
                              >
                                Terminate
                              </Button>
                              <FormControl fullWidth sx={{ mt: 5 }}>
                                <Typography variant="subtitle2">
                                  Expected Date of Return
                                </Typography>
                                <OutlinedInput
                                  type="date"
                                  name="returnDate"
                                  value={formik.values.returnDate}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                />
                              </FormControl>
                              <Button
                                variant="contained"
                                color="warning"
                                sx={{ mt: 2 }}
                              >
                                Place on Leave
                              </Button>
                              <FormControl fullWidth sx={{ mt: 5 }}>
                                <InputLabel htmlFor="outlined-adornment-reasonForLeave">
                                  Reason for Leave
                                </InputLabel>
                                <Select
                                  type="text"
                                  name="reasonForLeave"
                                  value={formik.values.reasonForLeave}
                                  label="Reason for Leave"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  fullWidth
                                  sx={{ textAlign: "left" }}
                                >
                                  <MenuItem value="Select a reason">
                                    --Select a reason
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid
                              size={{ xs: 12, lg: 8 }}
                              marginBottom="28px"
                              paddingLeft={3 / 2}
                              paddingTop="0px !important"
                            >
                              <Typography variant="h5" marginBottom={2}>
                                Start/Terminate History
                              </Typography>
                              <Typography variant="subtitle2" marginBottom={2}>
                                No Start/Terminate History
                              </Typography>
                            </Grid>
                          </Grid>
                          <Box
                            component="div"
                            display="flex"
                            sx={{ float: "inline-end" }}
                            gap={2}
                          >
                            <Button
                              variant="outlined"
                              sx={{
                                textTransform: "none",
                                fontSize: "16px",
                                paddingY: "14px",
                              }}
                            >
                              Cancel
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
                              Save
                            </Button>
                          </Box>
                        </CustomTabPanel>
                      </Paper>
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
