import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { ProfileForm } from "src/sections/profile/profile-form";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => (
  <>
    <Head>
      <title>Investor Profile</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">Modify Your Information</Typography>
          <ProfileForm />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
