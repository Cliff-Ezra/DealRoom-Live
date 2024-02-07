import Head from "next/head";
import withRole from "src/utils/withRole";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewViews } from "src/sections/overview/business/overview-views";
import { OverviewInquiries } from "src/sections/overview/business/overview-inquiries";
import { OverviewInvestors } from "src/sections/overview/business/overview-investors";
import { OverviewEngagement } from "src/sections/overview/business/overview-engagement";
import { OverviewInterestedInvestors } from "src/sections/overview/business/overview-interested-investors";
import { OverviewRecentInquiries } from "src/sections/overview/business/overview-recent-inquiries";
import { OverviewEventsTable } from "src/sections/overview/business/overview-events-table";

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
          <Grid xs={12} sm={6} lg={3}>
            <OverviewViews difference={22} positive sx={{ height: "100%" }} value="24k" />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewInquiries
              difference={16}
              positive={false}
              sx={{ height: "100%" }}
              value="1.6k"
            />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewInvestors difference={49} positive={true} sx={{ height: "100%" }} value="1k" />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewEngagement
              difference={16}
              positive={false}
              sx={{ height: "100%" }}
              value="1.6k"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <OverviewInterestedInvestors
              investors={[
                {
                  id: "3123",
                  phone: "+256 700 000 000",
                  name: "Ekaterina Tankova",
                  date_of_interest: "2024-01-12T13:33:00",
                },
                {
                  id: "5112",
                  phone: "+254 712 342 283",
                  name: "Cao Yu",
                  date_of_interest: "2023-12-22T13:33:00",
                },
                {
                  id: "8382",
                  phone: "+255 712 342 283",
                  name: "Alexa Richardson",
                  date_of_interest: "2023-12-18T09:33:00",
                },
                {
                  id: "4623",
                  phone: "+256 730 230 003",
                  name: "Anje Keizer",
                  date_of_interest: "2023-12-15T10:33:00",
                },
                {
                  id: "1234",
                  phone: "+253 712 342 233",
                  name: "Clarke Gillebert",
                  date_of_interest: "2023-12-10T17:33:00",
                },
                {
                  id: "4567",
                  phone: "+254 732 111 283",
                  name: "Adam Denisov",
                  date_of_interest: "2023-12-01T09:33:00",
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <OverviewRecentInquiries
              inquiries={[
                {
                  id: "3123",
                  phone: "+256 700 000 000",
                  name: "Ekaterina Tankova",
                  email: "ekaterina@gmail.com",
                  avatar: "/assets/avatars/avatar-anika-visser.png",
                },
                {
                  id: "5112",
                  phone: "+254 712 342 283",
                  name: "Cao Yu",
                  email: "cao@hotmail.com",
                  avatar: "/assets/avatars/avatar-alcides-antonio.png",
                },
                {
                  id: "8382",
                  phone: "+255 712 342 283",
                  name: "Alexa Richardson",
                  email: "alexa@yahoo.com",
                  avatar: "/assets/avatars/avatar-cao-yu.png",
                },
                {
                  id: "4623",
                  phone: "+256 730 230 003",
                  name: "Anje Keizer",
                  email: "anje@gmail.com",
                  avatar: "/assets/avatars/avatar-carson-darrin.png",
                },
                {
                  id: "1234",
                  phone: "+253 712 342 233",
                  name: "Clarke Gillebert",
                  email: "clarke@yahoo.com",
                  avatar: "/assets/avatars/avatar-jie-yan-song.png",
                },
                {
                  id: "4567",
                  phone: "+254 732 111 283",
                  name: "Adam Denisov",
                  email: "adam@hotmail.com",
                  avatar: "/assets/avatars/avatar-omar-darboe.png",
                },
                {
                  id: "4537",
                  phone: "+252 722 132 983",
                  name: "Fred Marakov",
                  email: "fred@gmail.com",
                  avatar: "/assets/avatars/avatar-penjani-inyene.png",
                },
                {
                  id: "4537",
                  phone: "+252 722 132 983",
                  name: "Lisa Oosev",
                  email: "lisa@gmail.com",
                  avatar: "/assets/avatars/avatar-chinasa-neo.png",
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={12}>
            <OverviewEventsTable
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
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default withRole(Page, 'business');
