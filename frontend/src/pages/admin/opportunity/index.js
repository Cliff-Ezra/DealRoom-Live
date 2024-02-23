// External imports
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
// Icon imports
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
// Local imports
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const OpportunityTable = dynamic(
  () =>
    import("src/sections/admin/opportunity/opportunity-table").then((mod) => mod.OpportunityTable),
  {
    loading: () => <p>Loading ...</p>,
  }
);

const Page = () => {
  return (
    <>
      <Head>
        <title>Opportunity Listing</title>
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
                <Typography variant="h4">Business/Opportunity Listings</Typography>
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
            <OpportunityTable
              listings={[
                {
                  name: "Business A",
                  location: "Kigali",
                  description: "Startup in the tech Industry",
                  sector: "Renewable Energy",
                  status: "Seeking Funding",
                  sought_amount: "$500,000",
                  date_listed: "2023-07-10T09:33:00",
                },
                {
                  name: "Business B",
                  location: "Kigali",
                  description: "Real estate venture",
                  sector: "Technology Startups",
                  status: "Seeking Funding",
                  sought_amount: "$500,000",
                  date_listed: "2023-07-10T09:33:00",
                },
                {
                  name: "Business C",
                  location: "Uganda",
                  description: "Housing Project",
                  sector: "Construction",
                  status: "Fully Funded",
                  sought_amount: "$800,000",
                  date_listed: "2023-07-10T09:33:00",
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
