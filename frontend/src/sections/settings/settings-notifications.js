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

const validationSchema = Yup.object().shape({
  email_notification: Yup.bool().required("A selection is required"),
});

const handleSubmit = (values) => {
  const notificationData = {
    password: values.confirm_password,
    confirm_password: values.confirm_password,
  };

  console.log("notificationData", notificationData);

  // axios
  //   .post("/api/notification", notificationData)
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

export const SettingsNotifications = () => {
  return (
    <Formik
      initialValues={{ email_notification: false }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Card>
            <CardHeader subheader="Manage the notifications" title="Notifications" />
            <Divider />
            <CardContent>
              <Grid container spacing={6} wrap="wrap">
                <Grid xs={12} sm={6} md={4}>
                  <Stack spacing={1}>
                    <Typography variant="h6">Notifications</Typography>
                    <Stack>
                      <FormControlLabel
                        control={<Field as={Checkbox} name="email_notification" />}
                        label="Email"
                      />
                      {errors.email_notification && touched.email_notification && <div>{errors.email_notification}</div>}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" type="submit">
                Save Settings
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};
