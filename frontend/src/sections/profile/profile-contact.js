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
  contact_email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
});

const handleSubmit = (values) => {
  const profileData = {
    contact_email: values.contact_email,
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
      initialValues={{ contact_email: "" }}
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
                    error={(isSubmitted || touched.contact_email) && Boolean(errors.contact_email)}
                  >
                    <Field fullWidth name="contact_email">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Contact Email"
                          error={
                            (isSubmitted || touched.contact_email) && Boolean(errors.contact_email)
                          }
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.contact_email) && errors.contact_email && (
                      <FormHelperText>{errors.contact_email}</FormHelperText>
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
