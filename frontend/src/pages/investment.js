import Head from "next/head";
import withRole from "src/utils/withRole";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewInvestedAmount } from "src/sections/overview/investment/overview-invested-amount";
import { OverviewHotListings } from "src/sections/overview/investment/overview-hot-listings";
import { OverviewNewMatches } from "src/sections/overview/investment/overview-new-matches";
import { OverviewUpcomingEvents } from "src/sections/overview/investment/overview-upcoming-events";
import { OverviewInteractions } from "src/sections/overview/investment/overview-interactions";
import { OverviewInvestmentOpportunities } from "src/sections/overview/investment/overview-investment-opportunities";
import { OverviewRecentMessages } from "src/sections/overview/investment/overview-recent-messages-table";
import { OverviewNewListings } from "src/sections/overview/investment/overview-new-listing";
import { OverviewRecentInteractions } from "src/sections/overview/investment/overview-recent-interactions";

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
          <Grid xs={12} md={4}>
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
          </Grid>
          <Grid xs={12} md={4} lg={4}>
            <OverviewNewListings
              listings={[
                {
                  id: "5ece2c077e39da27658aa8a9",
                  image: "/assets/products/product-1.png",
                  name: "Inland Ports Project",
                  match: "98%",
                  amount: "$5,000,000",
                },
                {
                  id: "5ece2c0d16f70bff2cf86cd8",
                  image: "/assets/products/product-2.png",
                  name: "Industrial park Development",
                  match: "58%",
                  amount: "$2,000,000",
                },
                {
                  id: "b393ce1b09c1254c3a92c827",
                  image: "/assets/products/product-5.png",
                  name: "Iron And Steel Project",
                  match: "34%",
                  amount: "$1,000,000",
                },
                {
                  id: "a6ede15670da63f49f752c89",
                  image: "/assets/products/product-6.png",
                  name: "Healthcare Project",
                  match: "28%",
                  amount: "$500,000",
                },
                {
                  id: "bcad5524fe3a2f8f8620ceda",
                  image: "/assets/products/product-7.png",
                  name: "Agriculture Project",
                  match: "16%",
                  amount: "$100,000",
                },
                {
                  id: "bcad5524fe3a2f8f8620ceda",
                  image: "/assets/products/product-7.png",
                  name: "Agriculture Project",
                  match: "16%",
                  amount: "$100,000",
                },
                {
                  id: "bcad5524fe3a2f8f8620ceda",
                  image: "/assets/products/product-7.png",
                  name: "Agriculture Project",
                  match: "16%",
                  amount: "$100,000",
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewRecentInteractions
              chartSeries={[63, 15, 12, 10]}
              tableData={[
                { name: "Request a Quote", users: "532,384", bounceRate: "81.42%" },
                { name: "Career", users: "433,382", bounceRate: "72.23%" },
                { name: "Work", users: "233,382", bounceRate: "92.23%" },
                { name: "Contact", users: "183,382", bounceRate: "62.23%" },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={12}>
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default withRole(Page, 'investment');
