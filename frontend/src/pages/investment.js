import Head from "next/head";
import withRole from "src/utils/withRole";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewInvestedAmount } from "src/sections/overview/investment/overview-invested-amount";
import { OverviewHotListings } from "src/sections/overview/investment/overview-hot-listings";
import { OverviewNewMatches } from "src/sections/overview/investment/overview-new-matches";
import { OverviewUpcomingEvents } from "src/sections/overview/investment/overview-upcoming-events";
import { OverviewInteractions } from "src/sections/overview/investment/overview-interactions";
import { OverviewNewBusinessMatches } from "src/sections/overview/investment/overview-new-bus-matches";
import { OverviewInvestmentOpportunities } from "src/sections/overview/investment/overview-investment-opportunities";
import { OverviewRecentMessages } from "src/sections/overview/investment/overview-recent-messages-table";
import { OverviewNewListings } from "src/sections/overview/investment/overview-new-listing";
import { OverviewSectorsInterest } from "src/sections/overview/investment/overview-sectors-interest";
import { OverviewInvestmentEventsTable } from "/src/sections/overview/investment/overview-investment-events-table.js";
import { Description } from "@mui/icons-material";

const Page = () => (
  <>
    <Head>
      <title>Dashboard | DealRoom</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1,
      }}
    >
      <Container maxWidth="true">
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} lg={2.4}>
            <OverviewInvestedAmount
              difference={25}
              positive
              sx={{ height: "100%" }}
              value="$825k"
            />
          </Grid>
          <Grid xs={12} sm={6} lg={2.4}>
            <OverviewHotListings
              difference={16}
              positive={false}
              sx={{ height: "100%" }}
              value="920"
            />
          </Grid>
          <Grid xs={12} sm={6} lg={2.4}>
            <OverviewNewMatches
              difference={49}
              positive={true}
              sx={{ height: "100%" }}
              value="1k"
            />
          </Grid>
          <Grid xs={12} sm={6} lg={2.4}>
            <OverviewUpcomingEvents
              difference={16}
              positive={false}
              sx={{ height: "100%" }}
              value="2"
            />
          </Grid>
          <Grid xs={12} sm={6} lg={2.4}>
            <OverviewInteractions
              difference={16}
              positive={true}
              sx={{ height: "100%" }}
              value="20"
            />
          </Grid>
          {/* <Grid xs={12} md={4}>
            <OverviewInvestmentOpportunities
              opportunities={[
                {
                  id: "1",
                  project: "Facebook",
                  price_range: "5,761,687",
                  asking_price: "68,412",
                },
                {
                  id: "2",
                  project: "Twitter",
                  price_range: "698,723",
                  asking_price: "3,842",
                },
                {
                  id: "3",
                  project: "LinkedIn",
                  price_range: "68,412",
                  asking_price: "13,677",
                },
                {
                  id: "4",
                  project: "Instagram",
                  price_range: "16,716",
                  asking_price: "5,761,687",
                },
                {
                  id: "5",
                  project: "Dribbble",
                  price_range: "13,677",
                  asking_price: "68,412",
                },
                {
                  id: "6",
                  project: "Behance",
                  price_range: "9,717",
                  asking_price: "698,723",
                },
                {
                  id: "7",
                  project: "Pinterest",
                  price_range: "3,942",
                  asking_price: "16,716",
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid> */}
          <Grid xs={12} md={8}>
            <OverviewNewBusinessMatches
              matches={[
                {
                  id: "1",
                  name: "GreenTech Innovators",
                  sector: "Renewable Energy",
                  date: "2023-07-10T09:33:00",
                  amount: "$1,200,000",
                  match: "95%",
                },
                {
                  id: "2",
                  name: "AgriTech Corp",
                  sector: "Agriculture",
                  date: "2023-07-08T09:33:00",
                  amount: "$850,000",
                  match: "90%",
                },
                {
                  id: "3",
                  name: "FinTech Solutions",
                  sector: "Financial Services",
                  date: "2023-07-05T09:33:00",
                  amount: "$1,500,000",
                  match: "88%",
                },
                {
                  id: "4",
                  name: "Health Innovate",
                  sector: "Healthcare",
                  date: "2023-07-03T09:33:00",
                  amount: "$600,000",
                  match: "85%",
                },
                {
                  id: "5",
                  name: "EduTech Enterprises",
                  sector: "Education",
                  date: "2023-07-01T09:33:00",
                  amount: "$350,000",
                  match: "92%",
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewSectorsInterest
              chartSeries={[63, 15, 12, 5, 5]}
              tableData={[
                { sector: "Technology" },
                { sector: "Healthcare" },
                { sector: "Energy" },
                { sector: "Finance" },
                { sector: "Real Esatate" },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={7}>
            <OverviewInvestmentEventsTable
              events={[
                {
                  id: "3123",
                  venue: "Kigali Convention Centre",
                  name: "Startup Pitch Day",
                  organizer: "DealRoom",
                  time: "10:00 AM",
                  date: "Mar. 18 2024",
                },
                {
                  id: "5112",
                  venue: "Rwanda Innovation Hub",
                  name: "Investor Meetup",
                  organizer: "Veritas Interactive",
                  time: "12:00 PM",
                  date: "May. 18 2024",
                },
                {
                  id: "8382",
                  venue: "Kigali Convention Centre",
                  name: "Induction Meeting",
                  organizer: "DealRoom",
                  time: "2:00 PM",
                  date: "Jun. 18 2024",
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={5}>
            <OverviewNewListings
              listings={[
                {
                  id: "1",
                  name: "GreenTech Innovators",
                  description:
                    "Innovative solutions for renewable energy. Seeking $500,000 for expansion.",
                  listed: "2023-07-10T09:33:00",
                },
                {
                  id: "2",
                  name: "HealthWare Systems",
                  description:
                    "Healthcare software development company looking for 750 000 USD in funding.",
                  listed: "2023-07-10T09:33:00",
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          {/* <Grid xs={12} md={12}>
            <OverviewRecentMessages
              inquiries={[
                {
                  id: "3123",
                  phone: "+256 700 000 000",
                  name: "Ekaterina Tankova",
                  email: "ekaterina@gmail.com",
                  title: "Request a Quote",
                  avatar: "/assets/avatars/avatar-anika-visser.png",
                  date_of_inquiry: "2024-01-12T13:33:00",
                  location: "Kampala, Uganda",
                },
                {
                  id: "5112",
                  phone: "+254 712 342 283",
                  name: "Cao Yu",
                  email: "cao@hotmail.com",
                  title: "Send Capital",
                  avatar: "/assets/avatars/avatar-alcides-antonio.png",
                  date_of_inquiry: "2023-12-22T12:00:00",
                  location: "Nairobi, Kenya",
                },
                {
                  id: "8382",
                  phone: "+255 712 342 283",
                  name: "Alexa Richardson",
                  email: "alexa@yahoo.com",
                  title: "Send Capital",
                  avatar: "/assets/avatars/avatar-cao-yu.png",
                  date_of_inquiry: "2023-12-18T09:33:00",
                  location: "Dar es Salaam, Tanzania",
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default withRole(Page, "investment");
