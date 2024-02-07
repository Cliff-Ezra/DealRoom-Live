import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";

const validationSchema = Yup.object().shape({
  company_name: Yup.string().max(255).required("Company/Business name is required"),
  company_email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
});

const handleSubmit = (values) => {
  const profileData = {
    company_name: values.company_email,
    company_email: values.company_email,
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

export const SettingsProfile = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Formik
      initialValues={{ company_name: "", company_email: "" }}
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
            <CardHeader subheader="Update your profile details" title="Profile" />
            <Divider />
            <CardContent>
              <Stack spacing={3} sx={{ maxWidth: 400 }}>
                <FormControl
                  fullWidth
                  error={(isSubmitted || touched.company_name) && Boolean(errors.company_name)}
                >
                  <Field fullWidth name="company_name">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Company/Business Name"
                        error={
                          (isSubmitted || touched.company_name) && Boolean(errors.company_name)
                        }
                      />
                    )}
                  </Field>
                  {(isSubmitted || touched.company_name) && errors.company_name && (
                    <FormHelperText>{errors.company_name}</FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  fullWidth
                  error={(isSubmitted || touched.company_email) && Boolean(errors.company_email)}
                >
                  <Field fullWidth name="company_email">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Company Email"
                        error={
                          (isSubmitted || touched.company_email) && Boolean(errors.company_email)
                        }
                      />
                    )}
                  </Field>
                  {(isSubmitted || touched.company_email) && errors.company_email && (
                    <FormHelperText>{errors.company_email}</FormHelperText>
                  )}
                </FormControl>
              </Stack>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" type="submit">Update Profile</Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};
