// External imports
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
// Local imports
// import api from "src/utils/custom-axios";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const DealFlow = dynamic(
  () => import("src/dynamic/admin/reports/DealFlow").then((mod) => mod.DealFlow),
  {
    loading: () => <p>Loading ...</p>,
  }
);

const Page = () => (
  <>
    <Head>
      <title>Deal Flow</title>
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
          <DealFlow />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
