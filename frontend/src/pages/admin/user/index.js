// External imports
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Container, Dialog, Stack, SvgIcon, Typography } from "@mui/material";
// Icon imports
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
// Local imports
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const UserTable = dynamic(
  () => import("src/sections/admin/user/user-table").then((mod) => mod.UserTable),
  {
    loading: () => <p>Loading ...</p>,
  }
);
import { UserForm } from "src/dynamic/admin/user/user-form";

const Page = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  "& > :not(style)": { m: 1 },
                }}
              >
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  Add
                </Button>
              </Box>
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
      {/* Add User Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <UserForm setOpen={setOpen} />
      </Dialog>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
