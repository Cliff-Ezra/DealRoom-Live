// External imports
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, Stack, Unstable_Grid2 as Grid } from "@mui/material";
// Local imports
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const BusinessSignupForm = dynamic(
  () => import("src/sections/signup/business-signup-form").then((mod) => mod.BusinessSignupForm),
  { loading: () => <p>Loading ...</p> }
);

const Page = () => {
  return (
    <>
      <Head>
        <title>Business Signup</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 1 }}>
        <Container maxWidth="true">
          <Stack spacing={3}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item xs={12} md={9} lg={10}>
                <BusinessSignupForm />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
