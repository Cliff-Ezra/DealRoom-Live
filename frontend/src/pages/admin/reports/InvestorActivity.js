// External imports
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
// Local imports
// import api from "src/utils/custom-axios";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const InvestorActivity = dynamic(
  () => import("src/dynamic/admin/reports/InvestorActivity").then((mod) => mod.InvestorActivity),
  {
    loading: () => <p>Loading ...</p>,
  }
);

const Page = () => (
  <>
    <Head>
      <title>Investor Activity</title>
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
          <InvestorActivity />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
