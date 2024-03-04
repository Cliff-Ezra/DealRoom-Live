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
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().max(255).required("Investment Amount is required"),
});

export const UserForm = ({ setOpen }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (values) => {
    const contactData = {
      full_name: values.full_name,
      email: values.email,
    };

    console.log("contactData", contactData);

    // axios
    //   .post("/api/contact", contactData)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    setOpen(false);
  };

  return (
    <Formik
      initialValues={{ full_name: "", email: "" }}
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
            <CardHeader title="Add User" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <FormControl
                    fullWidth
                    error={(isSubmitted || touched.full_name) && Boolean(errors.full_name)}
                  >
                    <Field fullWidth name="full_name">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Full Name"
                          error={(isSubmitted || touched.full_name) && Boolean(errors.full_name)}
                          type="text"
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.email) && errors.email && (
                      <FormHelperText>{errors.email}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl
                    fullWidth
                    error={(isSubmitted || touched.email) && Boolean(errors.email)}
                  >
                    <Field fullWidth name="email">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Email"
                          error={(isSubmitted || touched.email) && Boolean(errors.email)}
                          type="email"
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.email) && errors.email && (
                      <FormHelperText>{errors.email}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button variant="contained" type="submit">
                Add User
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};
