import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const investor_types = [
  { value: "Individual", label: "Individual" },
  { value: "Venture Capital", label: "Venture Capital" },
  { value: "Angel Investor", label: "Angel Investor" },
  { value: "Private Equity", label: "Private Equity" },
  { value: "Institutional", label: "Institutional" },
  { value: "other", label: "Other" },
];

const experiences = [
  { value: "Newbie", label: "Newbie" },
  { value: "Few Investments", label: "Few Investments" },
  { value: "Experienced", label: "Experienced" },
  { value: "Veteran", label: "Veteran" },
];

const investments = [
  { value: "PPP", label: "PPP" },
  { value: "Joint Venture", label: "Joint Venture" },
  { value: "Private Public", label: "Private Public" },
  { value: "Equity Purchase", label: "Equity Purchase" },
  { value: "Debt Financing", label: "Debt Financing" },
];

const geo_locations = [
  { value: "local", label: "Local" },
  { value: "regional", label: "Regional" },
  { value: "national", label: "National" },
  { value: "international", label: "International" },
];

const project_statuses = [
  { value: "Pre-Feasibility", label: "Pre-Feasibility" },
  { value: "Feasibility Started", label: "Feasibility Started" },
  { value: "Feasibility Completed", label: "Feasibility Completed" },
];

const timelines = [
  { value: "Immediate (1-3 months)", label: "Immediate (1-3 months)" },
  { value: "Short Term (3-6 months)", label: "Short Term (3-6 months)" },
  { value: "Long Term (6-12 months+)", label: "Medium Term (6-12+ months+)" },
];

const return_investments = [
  { value: "5-10%", label: "5-10%" },
  { value: "10-20%", label: "10-20%" },
  { value: "20-30%", label: "20-30%" },
  { value: "30-40%", label: "30-40%" },
  { value: "40-50%", label: "40-50%" },
  { value: "50%+", label: "50%+" },
];

const risks = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

const validationSchema = Yup.object().shape({
  investor_type: Yup.string().required("Investor type is required"),
  experience: Yup.string().required("Experience is required"),
  investment_type: Yup.string().required("Investment type is required"),
  geo_operation: Yup.string().required("Geographic preference is required"),
  project_status: Yup.string().required("Project status is required"),
  timeline_preference: Yup.string().required("Timeline preference is required"),
  return_on_investment: Yup.string().required("Return on investment is required"),
  risk_tolerance: Yup.string().required("Risk tolerance is required"),
  investment_industry: Yup.object().test(
    "at-least-one-true",
    "You must select at least one industry/sector",
    (value) => Object.values(value).some((v) => v === true)
  ),
  project_type: Yup.object().test(
    "at-least-one-true",
    "You must select at least one project type",
    (value) => Object.values(value).some((v) => v === true)
  ),
  comm_method: Yup.object().test(
    "at-least-one-true",
    "You must select at least one communication method",
    (value) => Object.values(value).some((v) => v === true)
  ),
});

const handleSubmit = (values) => {
  const profileData = {
    investor_type: values.investor_type,
    experience: values.experience,
    investment_type: values.investment_type,
    geo_operation: values.geo_operation,
    project_status: values.project_status,
    timeline_preference: values.timeline_preference,
    return_on_investment: values.return_on_investment,
    risk_tolerance: values.risk_tolerance,
    investment_industry: Object.keys(values.investment_industry).filter(
      (key) => values.investment_industry[key]
    ),
    project_type: Object.keys(values.project_type).filter((key) => values.project_type[key]),
    comm_method: Object.keys(values.comm_method).filter((key) => values.comm_method[key]),
  };

  console.log("profileData", profileData);

  // axios
  //   .post("/api/profile", profileData)
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

export const ProfilePreferences = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Formik
      initialValues={{
        investor_type: "",
        experience: "",
        investment_type: "",
        geo_operation: "",
        timeline_preference: "",
        project_status: "",
        return_on_investment: "",
        risk_tolerance: "",
        investment_industry: {
          Agriculture: false,
          Technology: false,
          Healthcare: false,
          "Real Estate": false,
        },
        project_type: {
          Greenfield: false,
          Brownfield: false,
          Expansion: false,
        },
        comm_method: {
          Email: false,
          Phone: false,
          In_Person_Meetings: false,
          Video_Calls: false,
          Other: false,
        },
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, validateForm }) => {
        setIsSubmitted(true);
        validateForm().then((errors) => {
          if (Object.keys(errors).length === 0) {
            handleSubmit(values);
          }
          setSubmitting(false);
        });
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Card>
            <CardHeader subheader="Update your investor preferences" title="Investor Information" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="investor_type"
                    label="Investor Type"
                    error={(isSubmitted || touched.investor_type) && Boolean(errors.investor_type)}
                    helperText={(isSubmitted || touched.investor_type) && errors.investor_type}
                  >
                    {investor_types.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="experience"
                    label="Investment Experience"
                    error={(isSubmitted || touched.experience) && Boolean(errors.experience)}
                    helperText={(isSubmitted || touched.experience) && errors.experience}
                  >
                    {experiences.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="experience"
                    label="Preferred Investment Type"
                    error={
                      (isSubmitted || touched.investment_type) && Boolean(errors.investment_type)
                    }
                    helperText={(isSubmitted || touched.investment_type) && errors.investment_type}
                  >
                    {investments.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="geo_operation"
                    label="Geographic Operation"
                    error={(isSubmitted || touched.geo_operation) && Boolean(errors.geo_operation)}
                    helperText={(isSubmitted || touched.geo_operation) && errors.geo_operation}
                  >
                    {geo_locations.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="project_status"
                    label="Project Status"
                    error={
                      (isSubmitted || touched.project_status) && Boolean(errors.project_status)
                    }
                    helperText={(isSubmitted || touched.project_status) && errors.project_status}
                  >
                    {project_statuses.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="timeline_preference"
                    label="Ideal Timeline Preference"
                    error={
                      (isSubmitted || touched.timeline_preference) &&
                      Boolean(errors.timeline_preference)
                    }
                    helperText={
                      (isSubmitted || touched.timeline_preference) && errors.timeline_preference
                    }
                  >
                    {timelines.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="return_on_investment"
                    label="Return on Investment Expectation"
                    error={
                      (isSubmitted || touched.return_on_investment) &&
                      Boolean(errors.return_on_investment)
                    }
                    helperText={
                      (isSubmitted || touched.return_on_investment) && errors.return_on_investment
                    }
                  >
                    {return_investments.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="risk_tolerance"
                    label="Risk Tolerance"
                    error={
                      (isSubmitted || touched.risk_tolerance) && Boolean(errors.risk_tolerance)
                    }
                    helperText={(isSubmitted || touched.risk_tolerance) && errors.risk_tolerance}
                  >
                    {risks.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl>
                    <FormLabel id="demo-checkbox-group-label">Preferred Industry/Sector</FormLabel>
                    <FormGroup>
                      <Field name="investment_industry.Agriculture" type="checkbox">
                        {({ field, form }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue(field.name, !field.value)}
                              />
                            }
                            label="Agriculture"
                          />
                        )}
                      </Field>
                      <Field name="investment_industry.Technology" type="checkbox">
                        {({ field, form }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue(field.name, !field.value)}
                              />
                            }
                            label="Technology"
                          />
                        )}
                      </Field>
                      <Field name="investment_industry.Healthcare" type="checkbox">
                        {({ field, form }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue(field.name, !field.value)}
                              />
                            }
                            label="Healthcare"
                          />
                        )}
                      </Field>
                      <Field name="investment_industry.Real Estate" type="checkbox">
                        {({ field, form }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue(field.name, !field.value)}
                              />
                            }
                            label="Real Estate"
                          />
                        )}
                      </Field>
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl>
                    <FormLabel id="demo-checkbox-group-label">Project Type</FormLabel>
                    <FormGroup>
                      <Field name="project_type.Greenfield" type="checkbox">
                        {({ field, form }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue(field.name, !field.value)}
                              />
                            }
                            label="Greenfield"
                          />
                        )}
                      </Field>
                      <Field name="project_type.Brownfield" type="checkbox">
                        {({ field, form }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue(field.name, !field.value)}
                              />
                            }
                            label="Brownfield"
                          />
                        )}
                      </Field>
                      <Field name="project_type.Expansion" type="checkbox">
                        {({ field, form }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue(field.name, !field.value)}
                              />
                            }
                            label="Expansion"
                          />
                        )}
                      </Field>
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl>
                    <FormLabel id="demo-checkbox-group-label">Communication Method</FormLabel>
                    <FormGroup>
                      <Field name="comm_method.Email" type="checkbox">
                        {({ field, form }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue(field.name, !field.value)}
                              />
                            }
                            label="Email"
                          />
                        )}
                      </Field>
                      <Field name="comm_method.Phone" type="checkbox">
                        {({ field, form }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue(field.name, !field.value)}
                              />
                            }
                            label="Phone"
                          />
                        )}
                      </Field>
                      <Field name="comm_method.In_Person_Meetings" type="checkbox">
                        {({ field, form }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue(field.name, !field.value)}
                              />
                            }
                            label="In-Person Meetings"
                          />
                        )}
                      </Field>
                      <Field name="comm_method.Video_Calls" type="checkbox">
                        {({ field, form }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue(field.name, !field.value)}
                              />
                            }
                            label="Video Calls"
                          />
                        )}
                      </Field>
                      <Field name="comm_method.Other" type="checkbox">
                        {({ field, form }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue(field.name, !field.value)}
                              />
                            }
                            label="Other"
                          />
                        )}
                      </Field>
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" type="submit">
                Update Preferences
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};
