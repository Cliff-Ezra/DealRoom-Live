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
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  password: Yup.string().max(255).required("Password is required"),
  confirm_password: Yup.string()
    .max(255)
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const handleSubmit = (values) => {
  const passwordData = {
    password: values.confirm_password,
    confirm_password: values.confirm_password,
  };

  console.log("passwordData", passwordData);

  // axios
  //   .post("/api/password", passwordData)
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

export const ProfilePassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Formik
      initialValues={{ password: "", confirm_password: "" }}
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
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                  <FormControl
                    fullWidth
                    error={(isSubmitted || touched.password) && Boolean(errors.password)}
                  >
                    <Field fullWidth name="password">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Password"
                          error={(isSubmitted || touched.password) && Boolean(errors.password)}
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.password) && errors.password && (
                      <FormHelperText>{errors.password}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormControl
                    fullWidth
                    error={
                      (isSubmitted || touched.confirm_password) && Boolean(errors.confirm_password)
                    }
                  >
                    <Field fullWidth name="confirm_password">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Confirm Password"
                          error={
                            (isSubmitted || touched.confirm_password) &&
                            Boolean(errors.confirm_password)
                          }
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.confirm_password) && errors.confirm_password && (
                      <FormHelperText>{errors.confirm_password}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" type="submit">
                Update Profile
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};
