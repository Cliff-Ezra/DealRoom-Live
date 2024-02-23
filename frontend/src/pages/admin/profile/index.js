// External imports
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
// Icon imports
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
// Local imports
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const ProfileTable = dynamic(
  () => import("src/sections/admin/profile/profile-table").then((mod) => mod.ProfileTable),
  {
    loading: () => <p>Loading ...</p>,
  }
);

const Page = () => {
  return (
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
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Investor Profiles</Typography>
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
              profiles={[
                {
                  name: "Emma Johnson",
                  location: "Kigali",
                  range: "$100,000 - $200,000",
                  interest: "Renewable Energy",
                  contact: "investor1@wxample.com",
                  last_active: "2023-07-10T09:33:00",
                },
                {
                  name: "Michael Kabuga",
                  location: "Kigali",
                  range: "$50,000 - $150,000",
                  interest: "Technology Startups",
                  contact: "investor1@wxample.com",
                  last_active: "2023-07-10T09:33:00",
                },
                {
                  name: "Sophie Ntambara",
                  location: "Kigali",
                  range: "$30,000 - $100,000",
                  interest: "Agriculture & Food Industry",
                  contact: "investor2@wxample.com",
                  last_active: "2023-07-10T09:33:00",
                },
                {
                  name: "Alex Uwimana",
                  location: "Uganda",
                  range: "$75,000 - $125,000",
                  interest: "Real Estate Development",
                  contact: "investor3@wxample.com",
                  last_active: "2023-07-10T09:33:00",
                },
                {
                  name: "Benjamin Niyomugabo",
                  location: "Kigali",
                  range: "$60,000 - $90,000",
                  interest: "E-commerce",
                  contact: "investo41@wxample.com",
                  last_active: "2023-07-10T09:33:00",
                },
                {
                  name: "Felicia Uwase",
                  location: "Kenya",
                  range: "$80,000 - $150,000",
                  interest: "Healthcare",
                  contact: "investor5@wxample.com",
                  last_active: "2023-07-10T09:33:00",
                },
                {
                  name: "Emmanuel Niyomugabo",
                  location: "Kigali",
                  range: "$70,000 - $100,000",
                  interest: "Education",
                  contact: "investor6@wxample.com",
                  last_active: "2023-07-10T09:33:00",
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
