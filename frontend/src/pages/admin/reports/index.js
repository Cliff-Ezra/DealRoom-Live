// External imports
import Head from "next/head";
import { Box, Container, Stack, Unstable_Grid2 as Grid } from "@mui/material";
// Local imports
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ReportList } from "src/sections/admin/reports/report-list";

const Page = () => (
  <>
    <Head>
      <title>Reports</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Grid spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6} lg={8}>
              <ReportList />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
