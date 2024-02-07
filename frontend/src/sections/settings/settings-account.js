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
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";

export const SettingsAccount = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Add your deletion logic here
    console.log("Deleting account");
    setSubmitting(false);
  };

  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      <Form>
        <Card>
          <CardHeader subheader="Delete your account" title="Account" />
          <Divider />
          <CardActions>
            <Button color="error" variant="contained" type="submit">
              Delete Account
            </Button>
          </CardActions>
        </Card>
      </Form>
    </Formik>
  );
};
