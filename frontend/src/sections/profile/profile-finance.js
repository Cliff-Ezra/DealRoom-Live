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
  est_initial_investment: Yup.number()
    .min(0, "Estimated initial investment cannot be negative")
    .required("Estimated initial investment is required"),
  proj_revenue: Yup.number()
    .min(0, "Projected revenue cannot be negative")
    .required("Projected revenue is required"),
  proj_net_profit: Yup.number()
    .min(0, "Projected net profit cannot be negative")
    .required("Projected net profit is required"),
  break_even: Yup.number()
    .min(0, "Break even point cannot be negative")
    .required("Break even point is required"),
});

const handleSubmit = (values) => {
  const profileData = {
    est_initial_investment: values.est_initial_investment,
    proj_revenue: values.proj_revenue,
    proj_net_profit: values.proj_net_profit,
    break_even: values.break_even,
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

export const ProfileFinance = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Formik
      initialValues={{
        est_initial_investment: "",
        proj_revenue: "",
        proj_net_profit: "",
        break_even: "",
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
            <CardHeader
              subheader="Update your financial requirement details"
              title="Financial Requirements"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                  <FormControl
                    fullWidth
                    error={
                      (isSubmitted || touched.est_initial_investment) &&
                      Boolean(errors.est_initial_investment)
                    }
                  >
                    <Field fullWidth name="est_initial_investment">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Estimated Initial Investment"
                          error={
                            (isSubmitted || touched.est_initial_investment) &&
                            Boolean(errors.est_initial_investment)
                          }
                          type="number"
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.est_initial_investment) &&
                      errors.est_initial_investment && (
                        <FormHelperText>{errors.est_initial_investment}</FormHelperText>
                      )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormControl
                    fullWidth
                    error={(isSubmitted || touched.proj_revenue) && Boolean(errors.proj_revenue)}
                  >
                    <Field fullWidth name="proj_revenue">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Projected Revenue(First Year)"
                          error={
                            (isSubmitted || touched.proj_revenue) && Boolean(errors.proj_revenue)
                          }
                          type="number"
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.proj_revenue) && errors.proj_revenue && (
                      <FormHelperText>{errors.proj_revenue}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormControl
                    fullWidth
                    error={
                      (isSubmitted || touched.proj_net_profit) && Boolean(errors.proj_net_profit)
                    }
                  >
                    <Field fullWidth name="proj_net_profit">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Projected Net Profit(First Year)"
                          error={
                            (isSubmitted || touched.proj_net_profit) &&
                            Boolean(errors.proj_net_profit)
                          }
                          type="number"
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.proj_net_profit) && errors.proj_net_profit && (
                      <FormHelperText>{errors.proj_net_profit}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormControl
                    fullWidth
                    error={(isSubmitted || touched.break_even) && Boolean(errors.break_even)}
                  >
                    <Field fullWidth name="break_even">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Break Even Point(in Months/Years)"
                          error={(isSubmitted || touched.break_even) && Boolean(errors.break_even)}
                          type="number"
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.break_even) && errors.break_even && (
                      <FormHelperText>{errors.break_even}</FormHelperText>
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
