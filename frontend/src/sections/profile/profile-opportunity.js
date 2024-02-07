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
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const project_types = [
  { value: "greenfield", label: "Greenfield" },
  { value: "expansion", label: "Expansion" },
  { value: "acquisition", label: "Acquisition" },
  { value: "refinance", label: "Refinance" },
  { value: "other", label: "Other" },
];

const investment_types = [
  { value: "ppp", label: "PPP" },
  { value: "joint venture", label: "Joint Venture" },
  { value: "private public", label: "Private Public" },
  { value: "other", label: "Other" },
];

const validationSchema = Yup.object().shape({
  opportunity_name: Yup.string().required("Opportunity name is required"),
  industry: Yup.string().required("Industry is required"),
  project_type: Yup.string().required("Project type is required"),
  investment_type: Yup.string().required("Investment type is required"),
});

const project_statuses = [
  { value: "pre feasibility", label: "Pre-Feasibility" },
  { value: "feasibility started", label: "Feasibility Started" },
  { value: "feasibility completed", label: "Feasibility Completed" },
];

const handleSubmit = (values) => {
  const profileData = {
    opportunity_name: values.opportunity_name,
    industry: values.industry,
    project_type: values.project_type,
    investment_type: values.investment_type,
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

export const ProfileOpportunity = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Formik
      initialValues={{ opportunity_name: "", industry: "", project_type: "", investment_type: "" }}
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
            <CardHeader
              subheader="Update your opportunity details"
              title="Investment Opportunity"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                  <FormControl
                    fullWidth
                    error={
                      (isSubmitted || touched.opportunity_name) && Boolean(errors.opportunity_name)
                    }
                  >
                    <Field fullWidth name="opportunity_name">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Opportunity Name"
                          error={
                            (isSubmitted || touched.opportunity_name) &&
                            Boolean(errors.opportunity_name)
                          }
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.opportunity_name) && errors.opportunity_name && (
                      <FormHelperText>{errors.opportunity_name}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormControl
                    fullWidth
                    error={(isSubmitted || touched.industry) && Boolean(errors.industry)}
                  >
                    <Field fullWidth name="industry">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Sector/Industry"
                          error={(isSubmitted || touched.industry) && Boolean(errors.industry)}
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.industry) && errors.industry && (
                      <FormHelperText>{errors.industry}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="project_type"
                    label="Project Type"
                    error={(isSubmitted || touched.project_type) && Boolean(errors.project_type)}
                    helperText={(isSubmitted || touched.project_type) && errors.project_type}
                  >
                    {project_types.map((option) => (
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
                    name="investment_type"
                    label="Project Type"
                    error={
                      (isSubmitted || touched.investment_type) && Boolean(errors.investment_type)
                    }
                    helperText={(isSubmitted || touched.investment_type) && errors.investment_type}
                  >
                    {investment_types.map((option) => (
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
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" type="submit">
                Update Contact
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};
