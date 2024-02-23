// External imports
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
// Local imports
// import api from "src/utils/custom-axios";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const InvestmentTrends = dynamic(
  () => import("src/dynamic/admin/reports/InvestmentTrends").then((mod) => mod.InvestmentTrends),
  {
    loading: () => <p>Loading ...</p>,
  }
);

const Page = () => (
  <>
    <Head>
      <title>Investment Trends</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <InvestmentTrends />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
