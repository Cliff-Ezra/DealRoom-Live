import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import withRole from "src/utils/withRole";
import { OverviewAmountSought } from "/src/sections/overview/administrator/overview-amount-sought.js";
import { OverviewBusinessCategory } from "/src/sections/overview/administrator/overview-business-category.js";
import { OverviewCompletedInvestments } from "/src/sections/overview/administrator/overview-completed-investments.js";
import { OverviewInvestmentOverTime } from "/src/sections/overview/administrator/overview-investment-over-time.js";
import { OverviewInvestmentTypes } from "/src/sections/overview/administrator/overview-investment-types.js";
import { OverviewNumberInvestments } from "/src/sections/overview/administrator/overview-number-investment.js";
import { OverviewPreferredSector } from "/src/sections/overview/administrator/overview-preferred-sector.js";
import { OverviewRegisteredInvestors } from "/src/sections/overview/administrator/overview-registered-investors.js";
import { OverviewSeekingFunding } from "/src/sections/overview/administrator/overview-seeking-funding.js";
import { OverviewTotalInvested } from "/src/sections/overview/administrator/overview-total-investment.js";
import { OverviewTrendingSector } from "/src/sections/overview/administrator/overview-trending-sector.js";

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
            <OverviewTotalInvested difference={22} positive sx={{ height: "100%" }} value="825k" />
          </Grid>
          <Grid xs={12} sm={6} lg={2.4}>
            <OverviewNumberInvestments
              difference={16}
              positive={false}
              sx={{ height: "100%" }}
              value="920"
            />
          </Grid>
          <Grid xs={12} sm={6} lg={2.4}>
            <OverviewAmountSought
              difference={49}
              positive={true}
              sx={{ height: "100%" }}
              value="155k"
            />
          </Grid>
          <Grid xs={12} sm={6} lg={2.4}>
            <OverviewSeekingFunding
              difference={16}
              positive={false}
              sx={{ height: "100%" }}
              value="2k"
            />
          </Grid>
          <Grid xs={12} sm={6} lg={2.4}>
            <OverviewRegisteredInvestors
              difference={16}
              positive={false}
              sx={{ height: "100%" }}
              value="2.8k"
            />
          </Grid>
          <Grid xs={12} lg={4}>
            <OverviewBusinessCategory
              chartSeries={[
                {
                  name: "Combined",
                  data: [
                    { category: "Agriculture", value: 18 },
                    { category: "Technology", value: 16 },
                    { category: "Manufacturing", value: 5 },
                    { category: "Renewable Energy", value: 8 },
                    { category: "Food Production", value: 3 },
                    { category: "Health", value: 14 },
                    { category: "Other", value: 14 },
                  ],
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewInvestmentTypes
              chartSeries={[63, 15, 22]}
              tableData={[
                { name: "Equity", users: "532,384", bounceRate: "81.42%" },
                { name: "Debt", users: "433,382", bounceRate: "72.23%" },
                { name: "Joint Venture", users: "233,382", bounceRate: "92.23%" },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewPreferredSector
              chartSeries={[63, 15, 12, 5, 5]}
              tableData={[
                { sector: "Technology", investors: 63 },
                { sector: "Healthcare", investors: 15 },
                { sector: "Energy", investors: 12 },
                { sector: "Finance", investors: 5 },
                { sector: "Real Estate", investors: 5 },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={6}>
            <OverviewInvestmentOverTime
              chartSeries={[
                {
                  name: "Agriculture",
                  data: [18, 20, 10, 24, 26, 28], // values for each month
                },
                {
                  name: "Technology",
                  data: [16, 18, 20, 22, 24, 26], // values for each month
                },
                {
                  name: "Manufacturing",
                  data: [5, 7, 9, 11, 13, 15], // values for each month
                },
                {
                  name: "Renewable Energy",
                  data: [8, 10, 12, 14, 16, 18], // values for each month
                },
                {
                  name: "Food Production",
                  data: [3, 5, 7, 9, 11, 13], // values for each month
                },
                {
                  name: "Health",
                  data: [14, 16, 18, 20, 22, 24], // values for each month
                },
                {
                  name: "Other",
                  data: [14, 16, 18, 20, 22, 24], // values for each month
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={6}>
            <OverviewCompletedInvestments
              investments={[
                {
                  id: "1",
                  company_name: "AgriCorp",
                  sector: "Agriculture",
                  amount: "150,000",
                  completion_date: "2024-01-12T13:33:00",
                  investor_name: "John Doe Investments",
                },
                {
                  id: "2",
                  company_name: "RenewTech",
                  sector: "Renewable Energy",
                  amount: "200,000",
                  completion_date: "2024-02-12T13:33:00",
                  investor_name: "Green Growth Equity",
                },
                {
                  id: "3",
                  company_name: "HealthStat",
                  sector: "Healthcare",
                  amount: "500,000",
                  completion_date: "2023-03-12T13:33:00",
                  investor_name: "Eagle Wing Ventures",
                },
                {
                  id: "4",
                  company_name: "Edutech Innovators",
                  sector: "Education",
                  amount: "75,000",
                  completion_date: "2024-04-12T13:33:00",
                  investor_name: "Knowledge Partners VC",
                },
                {
                  id: "5",
                  company_name: "FinTech Global",
                  sector: "Finance",
                  amount: "1,000,000",
                  completion_date: "2024-05-12T13:33:00",
                  investor_name: "Currency Capital LLC",
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <OverviewTrendingSector
              chartSeries={[
                {
                  name: "Technology",
                  data: [16, 18, 30, 22, 24, 26], // values for each month
                },
                {
                  name: "Renewable Energy",
                  data: [8, 10, 40, 24, 16, 18], // values for each month
                },
                {
                  name: "Health",
                  data: [14, 16, 18, 20, 22, 24], // values for each month
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

export default withRole(Page, "admin");
