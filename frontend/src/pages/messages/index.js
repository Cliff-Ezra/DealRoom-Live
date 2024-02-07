// External imports
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
// Icon imports
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
// Local imports
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const MessagesTable = dynamic(
  () => import("src/sections/messages/messages-table").then((mod) => mod.MessagesTable),
  {
    loading: () => <p>Loading ...</p>,
  }
);

const Page = () => {
  const router = useRouter();

  // Add expenses routing button
  const handleAdd = (add) => {
    add.preventDefault();
    router.push("/expenses/create");
  };

  return (
    <>
      <Head>
        <title>Messages</title>
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
                <Typography variant="h4">Messages Inbox</Typography>
              </Stack>
            </Stack>
            <MessagesTable
              messages={[
                {
                  from: "John Doe (Investor)",
                  subject: "Interest in your Tech startup",
                  date: "2024-01-14",
                },
                {
                  from: "DealRoom System",
                  subject: "Welcome to DealRoom!",
                  date: "2024-01-14",
                },
                {
                  from: "Alice Smith (Investor)",
                  subject: "Proposal for collaboration",
                  date: "2024-01-15",
                },
                {
                  from: "DealRoom Updates",
                  subject: "Monthly Newsletter - January, 2024",
                  date: "2024-01-17",
                },
                {
                  from: "Grace Umutesi (Investor)",
                  subject: "Investment Meeting Schedule",
                  date: "2024-01-20",
                }
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
