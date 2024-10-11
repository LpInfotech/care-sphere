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
  Typography,
} from "@mui/material";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import { Close } from "@mui/icons-material";
import theme from "../../../shared/theme/theme";
import SnackBar from "../../../shared/components/snackbar/snackbar";
import Grid from "@mui/material/Grid2";
import React from "react";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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
  const [snackbarType, setSnackbarType] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  //======== snackbar close function ========
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  //======== validation schema ========
  const basicSchema = yup.object().shape({
    firstName: yup.string().required("This is required"),
    lastName: yup.string().required("This is required"),
    email: yup
      .string()
      .email("You must enter a valid email address")
      .required("This is required"),
    mobileNumber: yup
      .array()
      .of(
        yup
          .string()
          .matches(/^\d{10}$/, "Mobile number must contain exactly 10 digits")
      ),
    roleId: yup.string().required("This is required"),
    positionId: yup
      .array()
      .of(yup.string())
      .test("first-item-required", "This is required", (value) => {
        // Check if the array exists and if the first item is present
        return value && value[0] ? true : false;
      }),
    division: yup.string().required("This is required"),
    payType: yup.string().required("This is required"),
    statusType: yup.string().required("This is required"),
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const CreateUser = (values: any, { resetForm }: FormikHelpers<any>) => {
    console.log("Form Submitted:", values);
    axios
      .post("http://localhost:3000/api/v1/users", values)
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          setSnackbarMessage(res.data.error.message);
          setSnackbarType("error");
          setOpenSnackbar(true);
        } else {
          setSnackbarType("success");
          setOpenSnackbar(true);
          setSnackbarMessage("User created successfully!");
          resetForm();
        }
      })
      .catch((err) => {
        console.log(err);
        setSnackbarMessage(err.response.data.message);
        setSnackbarType("error");
        setOpenSnackbar(true);
      });
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
                minHeight: "calc(100vh - 48px)",
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

              <Formik
                initialValues={{
                  isStaff: false,
                  email: "",
                  firstName: "",
                  lastName: "",
                  mobileNumber: ["", ""],
                  address: {
                    streetAddress: "",
                    city: "",
                    province: "",
                    country: "",
                    postCode: "",
                  },
                  roleId: "66dafcc7985b4581b2716913",
                  positionId: [
                    "66dafcc7985b4581b2716913",
                    "66dafcc7985b4581b2716913",
                  ],
                  division: "",
                  secondaryEmailAddress: "",
                  divisionSupervisor: "Tao, David",
                  allergies: "",
                  doYouDrive: false,
                  driveParticipants: false,
                  employeeNumber: "",
                  dateOfBirth: null,
                  payType: "",
                  statusType: "",
                  benefitsStartDate: "",
                  emergencyContacts: [
                    {
                      name: "",
                      phone: "",
                      relationship: "",
                    },
                    {
                      name: "",
                      phone: "",
                      relationship: "",
                    },
                  ],
                  reasonForLeave: "",
                  startDate: null,
                  wellnessDays: "",
                  vacationDays: "",
                }} // Initialize with three fields
                validationSchema={basicSchema}
                validateOnMount={true}
                onSubmit={CreateUser}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  isValid,
                }) => (
                  <Form>
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
                                    value={values.isStaff}
                                    onChange={(event) =>
                                      setFieldValue(
                                        "isStaff",
                                        event.target.value
                                      )
                                    }
                                    sx={{ display: "block" }}
                                  >
                                    <FormControlLabel
                                      value="false"
                                      control={<Radio />}
                                      label="Volunteer"
                                    />
                                    <FormControlLabel
                                      value="true"
                                      control={<Radio />}
                                      label="Staff"
                                    />
                                  </RadioGroup>
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 6 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="firstName">
                                      First Name*
                                    </InputLabel>
                                    <OutlinedInput
                                      id="firstName"
                                      label="First Name*"
                                      type="text"
                                      endAdornment={
                                        values.firstName && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              disableRipple
                                              onClick={() =>
                                                setFieldValue(
                                                  "firstName",
                                                  "event.target.value"
                                                )
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
                                      placeholder="First Name"
                                      value={values.firstName}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      aria-describedby="firstName-error"
                                      fullWidth
                                      error={
                                        touched.firstName &&
                                        Boolean(errors.firstName)
                                      }
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 1 / 5,
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
                                      {errors.firstName &&
                                        touched.firstName && (
                                          <Box
                                            component="span"
                                            sx={{ position: "absolute" }}
                                          >
                                            {errors.firstName}
                                          </Box>
                                        )}
                                    </FormHelperText>
                                    {/* ======== /error message ======== */}
                                  </FormControl>
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 6 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="lastName">
                                      Last Name*
                                    </InputLabel>
                                    <OutlinedInput
                                      id="lastName"
                                      label=" Last Name*"
                                      type="text"
                                      endAdornment={
                                        values.lastName && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              disableRipple
                                              onClick={() =>
                                                setFieldValue("lastName", "")
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
                                      name="lastName"
                                      placeholder="Last Name"
                                      value={values.lastName}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      fullWidth
                                      error={
                                        touched.lastName &&
                                        Boolean(errors.lastName)
                                      }
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 1 / 5,
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
                                      {errors.lastName && touched.lastName && (
                                        <Box
                                          component="span"
                                          sx={{ position: "absolute" }}
                                        >
                                          {errors.lastName}
                                        </Box>
                                      )}
                                    </FormHelperText>
                                    {/* ======== /error message ======== */}
                                  </FormControl>
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 6 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="email">
                                      Email Address*
                                    </InputLabel>
                                    <OutlinedInput
                                      id="email"
                                      label="Email Address*"
                                      type="email"
                                      name="email"
                                      placeholder="Email Address"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.email}
                                      aria-describedby="email-error"
                                      fullWidth
                                      error={
                                        touched.email && Boolean(errors.email)
                                      }
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 1 / 5,
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
                                      {errors.email && touched.email && (
                                        <Box
                                          component="span"
                                          sx={{ position: "absolute" }}
                                        >
                                          {errors.email}
                                        </Box>
                                      )}
                                    </FormHelperText>
                                    {/* ======== /error message ======== */}
                                  </FormControl>
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 6 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="country">
                                      Country
                                    </InputLabel>
                                    <Select
                                      id="country"
                                      label="Country"
                                      type="text"
                                      name="address.country"
                                      value={values.address?.country}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      fullWidth
                                      sx={{
                                        textAlign: "left",
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                      }}
                                      error={
                                        touched.address?.country &&
                                        Boolean(errors.address?.country)
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
                                      {errors.address?.country &&
                                        touched.address?.country && (
                                          <Box
                                            component="span"
                                            sx={{ position: "absolute" }}
                                          >
                                            {errors.address?.country}
                                          </Box>
                                        )}
                                    </FormHelperText>
                                    {/* ======== /error message ======== */}
                                  </FormControl>
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 6 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="province">
                                      Province
                                    </InputLabel>
                                    <Select
                                      label="Province"
                                      id="province"
                                      type="text"
                                      name="address.province"
                                      value={values.address?.province}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      fullWidth
                                      sx={{
                                        textAlign: "left",
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                      }}
                                      error={
                                        touched.address?.province &&
                                        Boolean(errors.address?.province)
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
                                      {errors.address?.province &&
                                        touched.address?.province && (
                                          <Box
                                            component="span"
                                            sx={{ position: "absolute" }}
                                          >
                                            {errors.address?.province}
                                          </Box>
                                        )}
                                    </FormHelperText>
                                    {/* ======== /error message ======== */}
                                  </FormControl>
                                </Grid>
                                <FieldArray name="mobileNumber">
                                  {() => (
                                    <>
                                      {values.mobileNumber.map((_, index) => (
                                        <Grid
                                          key={index}
                                          size={{ xs: 12, lg: 3 }}
                                          marginBottom="28px"
                                        >
                                          <FormControl fullWidth>
                                            <InputLabel htmlFor="mobileNumber">
                                              Mobile Number
                                            </InputLabel>
                                            <OutlinedInput
                                              label="Mobile Number"
                                              id="mobileNumber"
                                              type="text"
                                              endAdornment={
                                                values.mobileNumber[
                                                  index
                                                ].replace(/\D/g, "") && (
                                                  <InputAdornment position="end">
                                                    <IconButton
                                                      disableRipple
                                                      onClick={() =>
                                                        setFieldValue(
                                                          `mobileNumber[${index}]`,
                                                          ""
                                                        )
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
                                              name={`mobileNumber[${index}]`}
                                              placeholder="Mobile Number"
                                              value={values.mobileNumber[
                                                index
                                              ].replace(/\D/g, "")}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              aria-describedby={`mobileNumber-error[${index}]`}
                                              fullWidth
                                              inputProps={{ maxLength: 10 }}
                                              error={
                                                touched.mobileNumber &&
                                                Boolean(
                                                  errors.mobileNumber?.[index]
                                                )
                                              }
                                              sx={{
                                                borderRadius: "50px",
                                                padding: 1 / 5,
                                              }}
                                            />
                                            {/* ======== error message ======== */}
                                            <FormHelperText
                                              id={`mobileNumber-error-${index}`}
                                              sx={{
                                                fontSize: "11px",
                                                color: theme.palette.error.main,
                                              }}
                                            >
                                              {errors.mobileNumber?.[index] &&
                                                touched.mobileNumber && (
                                                  <Box
                                                    component="span"
                                                    sx={{
                                                      position: "absolute",
                                                    }}
                                                  >
                                                    {errors.mobileNumber}
                                                  </Box>
                                                )}
                                            </FormHelperText>
                                            {/* ======== /error message ======== */}
                                          </FormControl>
                                        </Grid>
                                      ))}
                                    </>
                                  )}
                                </FieldArray>
                                <Grid
                                  size={{ xs: 12, lg: 4 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="roleId">
                                      Role*
                                    </InputLabel>
                                    <Select
                                      label=" Role*"
                                      id="roleId"
                                      type="text"
                                      name="roleId"
                                      value={values.roleId}
                                      placeholder="roleId*"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      fullWidth
                                      sx={{
                                        textAlign: "left",
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                      }}
                                      error={
                                        touched.roleId && Boolean(errors.roleId)
                                      }
                                    >
                                      <MenuItem value="66dafcc7985b4581b2716913">
                                        66dafcc7985b4581b2716913
                                      </MenuItem>
                                    </Select>
                                    {/* ======== error message ======== */}
                                    <FormHelperText
                                      id="role-error"
                                      sx={{
                                        fontSize: "11px",
                                        color: theme.palette.error.main,
                                      }}
                                    >
                                      {errors.roleId && touched.roleId && (
                                        <Box
                                          component="span"
                                          sx={{ position: "absolute" }}
                                        >
                                          {errors.roleId}
                                        </Box>
                                      )}
                                    </FormHelperText>
                                    {/* ======== /error message ======== */}
                                  </FormControl>
                                </Grid>

                                <FieldArray name="positionId">
                                  {() => (
                                    <>
                                      {values.positionId.map((_, index) => (
                                        <Grid
                                          key={index}
                                          size={{ xs: 12, lg: 4 }}
                                          marginBottom="28px"
                                        >
                                          <FormControl fullWidth>
                                            <InputLabel
                                              htmlFor={`positionId[${index}]`}
                                            >
                                              {index == 0
                                                ? "Position*"
                                                : "Position 2"}
                                            </InputLabel>
                                            <Select
                                              label="Position*"
                                              id={`positionId[${index}]`}
                                              type="text"
                                              name={`positionId[${index}]`}
                                              value={values.positionId[index]}
                                              placeholder="Position"
                                              onBlur={handleBlur}
                                              onChange={handleChange}
                                              fullWidth
                                              sx={{
                                                textAlign: "left",
                                                borderRadius: "50px",
                                                padding: 1 / 5,
                                              }}
                                              error={
                                                index === 0 &&
                                                touched.positionId &&
                                                Boolean(
                                                  errors.positionId?.[index]
                                                )
                                              }
                                            >
                                              <MenuItem value="66dafcc7985b4581b2716913">
                                                66dafcc7985b4581b2716913
                                              </MenuItem>
                                            </Select>
                                            {/* ======== error message ======== */}
                                            {index == 0 && (
                                              <FormHelperText
                                                id={`positionId-error[${index}]`}
                                                sx={{
                                                  fontSize: "11px",
                                                  color:
                                                    theme.palette.error.main,
                                                }}
                                              >
                                                {errors.positionId?.[index] &&
                                                  touched.positionId && (
                                                    <Box
                                                      component="span"
                                                      sx={{
                                                        position: "absolute",
                                                      }}
                                                    >
                                                      {errors.positionId}
                                                    </Box>
                                                  )}
                                              </FormHelperText>
                                            )}
                                            {/* ======== /error message ======== */}
                                          </FormControl>
                                        </Grid>
                                      ))}
                                    </>
                                  )}
                                </FieldArray>
                                <Grid
                                  size={{ xs: 12, lg: 4 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="division">
                                      Division*
                                    </InputLabel>
                                    <Select
                                      label="Division*"
                                      id="division"
                                      type="text"
                                      name="division"
                                      value={values.division}
                                      placeholder="Division"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      fullWidth
                                      sx={{
                                        textAlign: "left",
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                      }}
                                      error={
                                        touched.division &&
                                        Boolean(errors.division)
                                      }
                                    >
                                      <MenuItem value="division">
                                        division
                                      </MenuItem>
                                    </Select>
                                    {/* ======== error message ======== */}
                                    <FormHelperText
                                      id="division-error"
                                      sx={{
                                        fontSize: "11px",
                                        color: theme.palette.error.main,
                                      }}
                                    >
                                      {errors.division && touched.division && (
                                        <Box
                                          component="span"
                                          sx={{ position: "absolute" }}
                                        >
                                          {errors.division}
                                        </Box>
                                      )}
                                    </FormHelperText>
                                    {/* ======== /error message ======== */}
                                  </FormControl>
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 4 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="divisionSupervisor">
                                      Supervised by
                                    </InputLabel>
                                    <OutlinedInput
                                      label="Supervised by"
                                      id="divisionSupervisor"
                                      type="text"
                                      readOnly
                                      name="divisionSupervisor"
                                      placeholder="Supervised by"
                                      value={values.divisionSupervisor}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      aria-describedby="superviser-error"
                                      fullWidth
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 4 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="secondaryEmailAddress">
                                      Secondary Email
                                    </InputLabel>
                                    <OutlinedInput
                                      label="Secondary Email"
                                      id="secondaryEmailAddress"
                                      type="email"
                                      name="secondaryEmailAddress"
                                      placeholder="Secondary Email"
                                      value={values.secondaryEmailAddress}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      aria-describedby="secondaryEmailAddress-error"
                                      fullWidth
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                      }}
                                    />
                                    {/* ======== error message ======== */}
                                    <FormHelperText
                                      id="secondaryEmailAddress-error"
                                      sx={{
                                        fontSize: "11px",
                                        color: theme.palette.error.main,
                                      }}
                                    >
                                      {errors.secondaryEmailAddress &&
                                        touched.secondaryEmailAddress && (
                                          <Box
                                            component="span"
                                            sx={{ position: "absolute" }}
                                          >
                                            {errors.secondaryEmailAddress}
                                          </Box>
                                        )}
                                    </FormHelperText>
                                    {/* ======== /error message ======== */}
                                  </FormControl>
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 4 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel
                                      htmlFor={`address.streetAddress`}
                                    >
                                      Street Address
                                    </InputLabel>
                                    <OutlinedInput
                                      label="Street Address"
                                      id={`address.streetAddress`}
                                      type="text"
                                      name={`address.streetAddress`}
                                      value={values.address?.streetAddress}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      aria-describedby="streetAddress-error"
                                      fullWidth
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 4 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor={`address.city`}>
                                      City
                                    </InputLabel>
                                    <OutlinedInput
                                      label="City"
                                      id={`address.city`}
                                      type="text"
                                      name={`address.city`}
                                      value={values.address?.city}
                                      placeholder="City"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      aria-describedby="city-error"
                                      fullWidth
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 4 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor={`address.postCode`}>
                                      Postal Code
                                    </InputLabel>
                                    <OutlinedInput
                                      label="Postal Code"
                                      id={`address.postCode`}
                                      type="text"
                                      name={`address.postCode`}
                                      value={values.address?.postCode.replace(
                                        /\D/g,
                                        ""
                                      )}
                                      inputProps={{ maxLength: 6 }}
                                      placeholder="Postal Code"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      aria-describedby="postCode-error"
                                      fullWidth
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 6 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="allergies">
                                      Allergies
                                    </InputLabel>
                                    <OutlinedInput
                                      multiline
                                      minRows="3"
                                      label="Allergies"
                                      id="allergies"
                                      type="text"
                                      name="allergies"
                                      value={values.allergies}
                                      placeholder="Allergies"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      aria-describedby="allergies-error"
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 5 / 2,
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 3 }}
                                  marginBottom="28px"
                                  display={"flex"}
                                  alignItems={"center"}
                                >
                                  <Checkbox
                                    sx={{
                                      display: "block",
                                      padding: "0px 5px",
                                    }}
                                    id="doYouDrive"
                                    onChange={handleChange}
                                    inputProps={{ "aria-label": "controlled" }}
                                    value={values.doYouDrive}
                                  />
                                  <InputLabel htmlFor="doYouDrive">
                                    Do you drive?
                                  </InputLabel>
                                </Grid>
                                {values.doYouDrive && (
                                  <Grid
                                    size={{ xs: 12, lg: 3 }}
                                    marginBottom="28px"
                                    display={"flex"}
                                    alignItems={"center"}
                                  >
                                    <Checkbox
                                      sx={{
                                        display: "block",
                                        padding: "0px 5px",
                                      }}
                                      id="driveParticipants"
                                      onChange={handleChange}
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
                                      value={values.driveParticipants}
                                    />
                                    <InputLabel htmlFor="driveParticipants">
                                      Drive Participants
                                    </InputLabel>
                                  </Grid>
                                )}
                                <Grid
                                  size={{ xs: 12, lg: 6 }}
                                  marginBottom="28px"
                                >
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DemoContainer
                                      components={["DatePicker"]}
                                      sx={{
                                        height: "100%",
                                        marginTop: "-8px",
                                        overflow: "hidden",
                                      }}
                                    >
                                      <DatePicker
                                        label="Date of Birth"
                                        name="dateOfBirth"
                                        value={
                                          values.dateOfBirth
                                            ? dayjs(values.dateOfBirth)
                                            : null
                                        }
                                        onChange={(newDate) =>
                                          setFieldValue("dateOfBirth", newDate)
                                        }
                                        sx={{
                                          width: "100%",
                                          ".MuiInputBase-root": {
                                            borderRadius: "50px",
                                            height: "100%",
                                          },
                                          ".MuiInputBase-input": {
                                            height: "2.1500em",
                                          },
                                        }}
                                      />
                                    </DemoContainer>
                                  </LocalizationProvider>
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 6 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="employeeNumber">
                                      Employee Number
                                    </InputLabel>
                                    <OutlinedInput
                                      id="employeeNumber"
                                      label="Employee Number"
                                      type="text"
                                      name="employeeNumber"
                                      value={values.employeeNumber.replace(
                                        /\D/g,
                                        ""
                                      )}
                                      // placeholder="Employee Number"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      aria-describedby="employeeNumber-error"
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                              <Grid spacing={2} container sx={{ mt: 2 }}>
                                <Grid
                                  size={{ xs: 12, lg: 6 }}
                                  marginBottom="28px"
                                >
                                  <FormLabel id="demo-controlled-radio-buttons-group">
                                    Pay Type
                                    <span style={{ color: "red" }}>*</span>
                                  </FormLabel>
                                  <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={values.payType}
                                    onChange={(event) =>
                                      setFieldValue(
                                        "payType",
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
                                  {/* ======== error message ======== */}
                                  <FormHelperText
                                    id="payType-error"
                                    sx={{
                                      fontSize: "11px",
                                      color: theme.palette.error.main,
                                    }}
                                  >
                                    {errors.payType && touched.payType && (
                                      <Box
                                        component="span"
                                        sx={{ position: "absolute" }}
                                      >
                                        {errors.payType}
                                      </Box>
                                    )}
                                  </FormHelperText>
                                  {/* ======== /error message ======== */}
                                </Grid>
                                {/* <Grid
                                  size={{ xs: 12, lg: 6 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="benefitsStartDate">
                                      Benefits Start Date{" "}
                                    </InputLabel>
                                    <OutlinedInput
                                      label="Benefits Start Date"
                                      id="benefitsStartDate"
                                      type="date"
                                      readOnly
                                      name="benefitsStartDate"
                                      value={values.benefitsStartDate}
                                      placeholder="Benefits Start Date"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      fullWidth
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                      }}
                                    />
                                  </FormControl>
                                </Grid> */}
                                <Grid
                                  size={{ xs: 12, lg: 6 }}
                                  marginBottom="28px"
                                >
                                  <FormLabel id="demo-controlled-radio-buttons-group">
                                    Status
                                    <span style={{ color: "red" }}>*</span>
                                  </FormLabel>
                                  <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={values.statusType}
                                    onChange={(event) =>
                                      setFieldValue(
                                        "statusType",
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
                                  {/* ======== error message ======== */}
                                  <FormHelperText
                                    id="statusType-error"
                                    sx={{
                                      fontSize: "11px",
                                      color: theme.palette.error.main,
                                    }}
                                  >
                                    {errors.statusType &&
                                      touched.statusType && (
                                        <Box
                                          component="span"
                                          sx={{ position: "absolute" }}
                                        >
                                          {errors.statusType}
                                        </Box>
                                      )}
                                  </FormHelperText>
                                  {/* ======== /error message ======== */}
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 6 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="wellnessDays">
                                      Wellness Days
                                    </InputLabel>
                                    <OutlinedInput
                                      id="wellnessDays"
                                      label="Wellness Days"
                                      type="number"
                                      name="wellnessDays"
                                      placeholder="Wellness Days"
                                      value={values.wellnessDays}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      fullWidth
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  size={{ xs: 12, lg: 6 }}
                                  marginBottom="28px"
                                >
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="vacationDays">
                                      Vacation Days
                                    </InputLabel>
                                    <OutlinedInput
                                      label="Vacation Days"
                                      id="vacationDays"
                                      type="number"
                                      name="vacationDays"
                                      placeholder="Vacation Days"
                                      value={values.vacationDays}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      fullWidth
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                              <FieldArray name="emergencyContacts">
                                {() => (
                                  <>
                                    {values.emergencyContacts.map(
                                      (_, index) => (
                                        <div key={index}>
                                          <Typography
                                            variant="h6"
                                            marginBottom={2}
                                          >
                                            Emergency Contact {index + 1}
                                          </Typography>
                                          <Grid
                                            spacing={2}
                                            container
                                            size={{ xs: 12 }}
                                          >
                                            <Grid
                                              size={{ xs: 12, lg: 4 }}
                                              marginBottom="28px"
                                            >
                                              <FormControl fullWidth>
                                                <InputLabel
                                                  htmlFor={`emergencyContacts[${index}].name`}
                                                >
                                                  Name
                                                </InputLabel>
                                                <OutlinedInput
                                                  label="Name"
                                                  id={`emergencyContacts[${index}].name`}
                                                  type="text"
                                                  name={`emergencyContacts[${index}].name`}
                                                  placeholder="Name"
                                                  value={
                                                    values.emergencyContacts[
                                                      index
                                                    ].name
                                                  }
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  sx={{
                                                    borderRadius: "50px",
                                                    fontSize: "12px",
                                                    padding: 1 / 5,
                                                  }}
                                                />
                                              </FormControl>
                                            </Grid>
                                            <Grid
                                              size={{ xs: 12, lg: 4 }}
                                              marginBottom="28px"
                                            >
                                              <FormControl fullWidth>
                                                <InputLabel
                                                  htmlFor={`emergencyContacts[${index}].phone`}
                                                >
                                                  Phone
                                                </InputLabel>
                                                <OutlinedInput
                                                  label="Phone"
                                                  id={`emergencyContacts[${index}].phone`}
                                                  type="text"
                                                  name={`emergencyContacts[${index}].phone`}
                                                  placeholder="Phone"
                                                  value={values.emergencyContacts[
                                                    index
                                                  ].phone
                                                    .replace(/\D/g, "")
                                                    .replace(
                                                      /^(\d{5})(\d)/,
                                                      "$1-$2"
                                                    )}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  fullWidth
                                                  inputProps={{
                                                    maxLength: 11,
                                                  }}
                                                  sx={{
                                                    borderRadius: "50px",
                                                    fontSize: "12px",
                                                    padding: 1 / 5,
                                                  }}
                                                />
                                              </FormControl>
                                            </Grid>
                                            <Grid
                                              size={{ xs: 12, lg: 4 }}
                                              marginBottom="28px"
                                            >
                                              <FormControl fullWidth>
                                                <InputLabel
                                                  htmlFor={`emergencyContacts[${index}].relationship`}
                                                >
                                                  Relationship
                                                </InputLabel>
                                                <OutlinedInput
                                                  label="Relationship"
                                                  id={`emergencyContacts[${index}].relationship`}
                                                  type="text"
                                                  name={`emergencyContacts[${index}].relationship`}
                                                  placeholder="Relationship"
                                                  value={
                                                    values.emergencyContacts[
                                                      index
                                                    ].relationship
                                                  }
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  fullWidth
                                                  sx={{
                                                    borderRadius: "50px",
                                                    fontSize: "12px",
                                                    padding: 1 / 5,
                                                  }}
                                                />
                                              </FormControl>
                                            </Grid>
                                          </Grid>
                                        </div>
                                      )
                                    )}
                                  </>
                                )}
                              </FieldArray>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={3}>
                              <Grid spacing={2} container sx={{ mt: 2 }}>
                                <Grid
                                  size={{ xs: 12, lg: 4 }}
                                  marginBottom="28px"
                                >
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DemoContainer
                                      components={["DatePicker"]}
                                      sx={{
                                        height: "100%",
                                        marginTop: "-8px",
                                        overflow: "hidden",
                                      }}
                                    >
                                      <DatePicker
                                        label="Start Date"
                                        name="startDate"
                                        value={
                                          values.startDate
                                            ? dayjs(values.startDate)
                                            : null
                                        }
                                        onChange={(newDate) =>
                                          setFieldValue("startDate", newDate)
                                        }
                                        sx={{
                                          width: "100%",
                                          ".MuiInputBase-root": {
                                            borderRadius: "50px",
                                            height: "100%",
                                          },
                                          ".MuiInputBase-input": {
                                            height: "2.1500em",
                                          },
                                        }}
                                      />
                                    </DemoContainer>
                                  </LocalizationProvider>
                                  {/* <Button
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
                                  </Button> */}
                                  {/* <FormControl fullWidth sx={{ mt: 5 }}>
                                    <InputLabel htmlFor="returnDate">
                                      Expected Date of Return
                                    </InputLabel>
                                    <OutlinedInput
                                      label="Expected Date of Return"
                                      id="returnDate"
                                      type="date"
                                      name="returnDate"
                                      value={values.returnDate}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      fullWidth
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                      }}
                                    />
                                  </FormControl> */}
                                  {/* <Button
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
                                  </Button> */}
                                  {/* <FormControl fullWidth sx={{ mt: 5 }}>
                                    <InputLabel htmlFor="reasonForLeave">
                                      Reason for Leave
                                    </InputLabel>
                                    <Select
                                      id="reasonForLeave"
                                      label="Reason for Leave"
                                      type="text"
                                      name="reasonForLeave"
                                      value={values.reasonForLeave}
                                      placeholder="Reason for Leave"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      fullWidth
                                      sx={{
                                        borderRadius: "50px",
                                        padding: 1 / 5,
                                        textAlign: "left",
                                      }}
                                    >
                                      <MenuItem value="Select a reason">
                                        Reason 1
                                      </MenuItem>
                                    </Select>
                                  </FormControl> */}
                                </Grid>
                                {/* <Grid
                                  size={{ xs: 12, lg: 8 }}
                                  marginBottom="28px"
                                >
                                  <Typography variant="h5" marginBottom={2}>
                                    Start/Terminate History
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    marginBottom={2}
                                  >
                                    No Start/Terminate History
                                  </Typography>
                                </Grid> */}
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
                              Cancel {Object.keys(errors).length}
                            </Button>
                            <Button
                              type="submit"
                              disabled={!isValid}
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
                  </Form>
                )}
              </Formik>
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
