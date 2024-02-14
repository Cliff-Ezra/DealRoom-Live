// External imports
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
// Icon imports
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
// Local imports
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const UserTable = dynamic(
  () => import("src/sections/admin/user/user-table").then((mod) => mod.UserTable),
  {
    loading: () => <p>Loading ...</p>,
  }
);

const Page = () => {
  return (
    <>
      <Head>
        <title>User Management</title>
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
                <Typography variant="h4">User Management</Typography>
              </Stack>
            </Stack>
            <UserTable
              users={[
                {
                  user: "Alex Uwimana",
                  email: "investor3@wxample.com",
                  role: "Admin",
                  last_active: "2023-07-10T09:33:00",
                  entity_type: "Administrative",
                },
                {
                  user: "Benjamin Niyomugabo",
                  email: "investo41@wxample.com",
                  role: "Business",
                  last_active: "2023-07-10T09:33:00",
                  entity_type: "Business Listing",
                },
                {
                  user: "Felicia Uwase",
                  email: "investor5@wxample.com",
                  role: "Investor",
                  last_active: "2023-07-10T09:33:00",
                  entity_type: "Investment Opportunity",
                },
                {
                  user: "Emmanuel Niyomugabo",
                  email: "investor6@wxample.com",
                  role: "Investor",
                  last_active: "2023-07-10T09:33:00",
                  entity_type: "Investor",
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
