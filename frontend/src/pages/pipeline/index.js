import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import dynamic from "next/dynamic";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const KanbanBoard = dynamic(
  () => import("src/sections/pipeline/pipeline-board").then((mod) => mod.KanbanBoard),
  {
    loading: () => <p>Loading ...</p>,
  }
);
// import { TaskSearch } from "src/sections/tasks/tasks-search";

const Page = () => {
  const router = useRouter();

  const handleAdd = (add) => {
    add.preventDefault();
    router.push("/task/create");
  };

  return (
    <>
      <Head>
        <title>Tasks & Maintenance</title>
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
                <Typography variant="h4">Tasks & Maintenance</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleAdd}
                >
                  Add
                </Button>
              </div>
            </Stack>
            {/* <TaskSearch /> */}
            <KanbanBoard />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
