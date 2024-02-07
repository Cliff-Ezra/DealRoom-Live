import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { SettingsForm } from "src/sections/settings/settings-form";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => (
  <>
    <Head>
      <title>Settings | DealRoom</title>
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
          <Typography variant="h4">Settings</Typography>
          <SettingsForm />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
