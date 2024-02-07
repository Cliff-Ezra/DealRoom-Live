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
  Grid,
} from "@mui/material";

const validationSchema = Yup.object().shape({
  subject: Yup.string().max(255).required("Company/Business name is required"),
  message: Yup.string().required("Message is required"),
});

export const ContactForm = ({ setOpen }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (values) => {
    const contactData = {
      subject: values.subject,
      message: values.message,
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
      initialValues={{ subject: "", message: "" }}
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
            <CardHeader subheader="Send a message to the investor" title="Contact Investor" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <FormControl
                    fullWidth
                    error={(isSubmitted || touched.subject) && Boolean(errors.subject)}
                  >
                    <Field fullWidth name="subject">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Subject"
                          error={(isSubmitted || touched.subject) && Boolean(errors.subject)}
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.subject) && errors.subject && (
                      <FormHelperText>{errors.subject}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl
                    fullWidth
                    error={(isSubmitted || touched.message) && Boolean(errors.message)}
                  >
                    <Field name="message">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Message"
                          error={(isSubmitted || touched.message) && Boolean(errors.message)}
                          multiline
                          rows={7}
                          InputProps={{
                            style: {
                              resize: "both",
                              maxWidth: "100%",
                              maxHeight: "100%",
                            },
                          }}
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.message) && errors.message && (
                      <FormHelperText>{errors.message}</FormHelperText>
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
                Send Message
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};
