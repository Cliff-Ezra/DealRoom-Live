import { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "dealroom@test.com",
      password: "Password123!",
      role: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(values.email, values.password, values.role);
        // Redirect to a different page based on the role
        if (values.role === "investment") {
          router.push("/investment");
        } else if (values.role === "business") {
          router.push("/business");
        } else if (values.role === "admin") {
          router.push("/administrator");
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleRoleChange = (role) => {
    formik.setFieldValue("role", role);
  };

  return (
    <>
      <Head>
        <title>Login | DealRoom</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              <Button
                variant="contained"
                color={formik.values.role === "business" ? "primary" : "secondary"}
                onClick={() => handleRoleChange("business")}
                sx={{ mt: 3 }}
              >
                Business
              </Button>
              <Button
                variant="contained"
                color={formik.values.role === "investment" ? "primary" : "secondary"}
                onClick={() => handleRoleChange("investment")}
                sx={{  ml: 2, mt: 3 }}
              >
                Investment
              </Button>
              <Button
                variant="contained"
                color={formik.values.role === "admin" ? "primary" : "secondary"}
                onClick={() => handleRoleChange("admin")}
                sx={{ ml: 2, mt: 3 }}
              >
                Admin
              </Button>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continue
              </Button>
              <Alert color="primary" severity="info" sx={{ mt: 3 }}>
                <div>
                  Use <b>dealroom@test.com</b> and password <b>Password123!</b>
                </div>
              </Alert>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
