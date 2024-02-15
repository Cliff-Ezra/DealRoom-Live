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
  MenuItem,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import investment from "src/pages/investment";
import * as Yup from "yup";

const ranges = [
  { value: "$10K-$50k", label: "$10K-$50k" },
  { value: "$50K-$100k", label: "$50K-$100k" },
  { value: "$100K-$500k", label: "$100K-$500k" },
  { value: "$500K-$1M", label: "$500K-$1M" },
  { value: "$1M-$5M", label: "$1M-$5M" },
  { value: "$5M-$10M", label: "$5M-$10M" },
  { value: "$10M+", label: "$10M+" },
];

const validationSchema = Yup.object().shape({
  investment_range: Yup.string().required("Investment range is required"),
  investment_cap: Yup.number()
    .min(0, "Investment cap cannot be negative")
    .required("Investment cap is required"),
});

const handleSubmit = (values) => {
  const profileData = {
    investment_range: values.investment_range,
    investment_cap: values.investment_cap,
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
        investment_range: "",
        investment_cap: "",
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
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="investment_range"
                    label="Project Status"
                    error={
                      (isSubmitted || touched.investment_range) && Boolean(errors.investment_range)
                    }
                    helperText={
                      (isSubmitted || touched.investment_range) && errors.investment_range
                    }
                  >
                    {ranges.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormControl
                    fullWidth
                    error={
                      (isSubmitted || touched.investment_cap) && Boolean(errors.investment_cap)
                    }
                  >
                    <Field fullWidth name="investment_cap">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Maximum Investment Cap"
                          error={
                            (isSubmitted || touched.investment_cap) &&
                            Boolean(errors.investment_cap)
                          }
                          type="number"
                        />
                      )}
                    </Field>
                    {(isSubmitted || touched.investment_cap) && errors.investment_cap && (
                      <FormHelperText>{errors.investment_cap}</FormHelperText>
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
