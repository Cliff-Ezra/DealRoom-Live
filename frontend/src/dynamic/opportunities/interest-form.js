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
  amount: Yup.string().max(255).required("Investment Amount is required"),
});

export const InterestForm = ({ setOpen }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (values) => {
    const contactData = {
      amount: values.amount,
      questions: values.questions,
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
      initialValues={{ amount: "", questions: "" }}
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
            <CardHeader title="Express Your Interest" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Typography gutterBottom>
                    Thank you for your interest in Tech Innovators Inc. Please let us know your
                    potential investment interest and any questions you may have.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl
                    fullWidth
                    error={(isSubmitted || touched.amount) && Boolean(errors.amount)}
                  >
                    <Field fullWidth name="amount">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Potential Investment Amount"
                          error={(isSubmitted || touched.amount) && Boolean(errors.amount)}
                          type="number"
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.amount) && errors.amount && (
                      <FormHelperText>{errors.amount}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl
                    fullWidth
                    error={(isSubmitted || touched.questions) && Boolean(errors.questions)}
                  >
                    <Field name="questions">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Your Questions"
                          error={(isSubmitted || touched.questions) && Boolean(errors.questions)}
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
                    {(isSubmitted || touched.questions) && errors.questions && (
                      <FormHelperText>{errors.questions}</FormHelperText>
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
