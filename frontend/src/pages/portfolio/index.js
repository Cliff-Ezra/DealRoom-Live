// External imports
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
// Icon imports
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
// Local imports
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const ProfileTable = dynamic(
  () => import("src/sections/investment-profile/profile-table").then((mod) => mod.ProfileTable),
  {
    loading: () => <p>Loading ...</p>,
  }
);

const Page = () => {
  return (
    <>
      <Head>
        <title>Matches</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">My Portfolio</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <ProfileTable
              matches={[
                {
                  name: "ABC Tech Solutions",
                  description: "Revolutionizing the tech industry with innovative solutions.",
                  sector: "Technology",
                  location: "Kigali, Rwanda",
                  status: "Seeking Funding",
                  amount: "$500,000",
                },
              ]}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
