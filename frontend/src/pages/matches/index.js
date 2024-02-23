// External imports
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
// Icon imports
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
// Local imports
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const MatchesTable = dynamic(
  () => import("src/sections/matches/matches-table").then((mod) => mod.MatchesTable),
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
                <Typography variant="h4">Potential Investor Matches</Typography>
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
            <MatchesTable
              matches={[
                {
                  name: "Emma Johnson",
                  location: "Kigali",
                  range: "$100,000 - $200,000",
                  interest: "Renewable Energy",
                  strength: 95,
                },
                {
                  name: "Michael Kabuga",
                  location: "Kigali",
                  range: "$50,000 - $150,000",
                  interest: "Technology Startups",
                  strength: 90,
                },
                {
                  name: "Sophie Ntambara",
                  location: "Kigali",
                  range: "$30,000 - $100,000",
                  interest: "Agriculture & Food Industry",
                  strength: 88,
                },
                {
                  name: "Alex Uwimana",
                  location: "Kigali",
                  range: "$75,000 - $125,000",
                  interest: "Real Estate Development",
                  strength: 80,
                },
                {
                  name: "Benjamin Niyomugabo",
                  location: "Kigali",
                  range: "$60,000 - $90,000",
                  interest: "E-commerce",
                  strength: 85,
                },
                {
                  name: "Felicia Uwase",
                  location: "Kigali",
                  range: "$80,000 - $150,000",
                  interest: "Healthcare",
                  strength: 92,
                },
                {
                  name: "Emmanuel Niyomugabo",
                  location: "Kigali",
                  range: "$70,000 - $100,000",
                  interest: "Education",
                  strength: 87,
                },
                {
                  name: "Henry Thembo",
                  location: "Uganda",
                  range: "$70,000 - $100,000",
                  interest: "Education",
                  strength: 87,
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
