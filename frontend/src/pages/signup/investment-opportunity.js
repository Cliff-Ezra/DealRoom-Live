// External imports
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, Stack, Unstable_Grid2 as Grid } from "@mui/material";
// Local imports
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const InvestmentOpportunityForm = dynamic(
  () =>
    import("src/sections/signup/investment-opportunity-form").then(
      (mod) => mod.InvestmentOpportunityForm
    ),
  { loading: () => <p>Loading ...</p> }
);

const Page = () => {
  return (
    <>
      <Head>
        <title>Investment Opportunity</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 1 }}>
        <Container maxWidth="true">
          <Stack spacing={3}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item xs={12} md={9} lg={10}>
                <InvestmentOpportunityForm />
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
