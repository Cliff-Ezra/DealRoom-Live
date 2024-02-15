import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Grid,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  investor_email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  investor_phone: Yup.string()
    .required("Investor Phone is required")
    .matches(
      /^\+\d{3} \d{9}$/,
      "Phone number is not valid. It should match the format: '+256 723329485'"
    ),
});

const handleSubmit = (values) => {
  const profileData = {
    investor_email: values.investor_email,
    investor_phone: values.investor_phone,
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

export const ProfileContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Formik
      initialValues={{ investor_email: "", investor_phone: "" }}
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
            <CardHeader subheader="Update your contact details" title="Contact" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                  <FormControl
                    fullWidth
                    error={
                      (isSubmitted || touched.investor_email) && Boolean(errors.investor_email)
                    }
                  >
                    <Field fullWidth name="investor_email">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Contact Email"
                          error={
                            (isSubmitted || touched.investor_email) &&
                            Boolean(errors.investor_email)
                          }
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.investor_email) && errors.investor_email && (
                      <FormHelperText>{errors.investor_email}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormControl
                    fullWidth
                    error={
                      (isSubmitted || touched.investor_phone) && Boolean(errors.investor_phone)
                    }
                  >
                    <Field fullWidth name="investor_phone">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Phone Number"
                          error={
                            (isSubmitted || touched.investor_phone) &&
                            Boolean(errors.investor_phone)
                          }
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.investor_phone) && errors.investor_phone && (
                      <FormHelperText>{errors.investor_phone}</FormHelperText>
                    )}
                  </FormControl>
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
