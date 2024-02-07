import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Box,
  Card,
  CardContent,
  Container,
  Unstable_Grid2 as Grid,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Link from "next/link";

const help = [
  {
    id: "1",
    title: "About DealRoom",
    articles: "4 articles",
  },
  {
    id: "2",
    title: "Getting Started with DealRoom",
    articles: "1 article",
  },
  {
    id: "3",
    title: "Navigating on DealRoom",
    articles: "8 articles",
  },
  {
    id: "4",
    title: "Definitions, Dictionary & Taxonomy",
    articles: "14 articles",
  },
  {
    id: "5",
    title: "Solutions & Use Cases",
    articles: "9 articles",
  },
];

const Page = () => {
  return (
    <>
      <Head>
        <title>Help Center | DealRoom</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">DealRoom Help Center</Typography>
              </Stack>
            </Stack>
            <Card
              sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <OutlinedInput
                defaultValue=""
                fullWidth
                placeholder="Search for articles..."
                startAdornment={
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <MagnifyingGlassIcon />
                    </SvgIcon>
                  </InputAdornment>
                }
                sx={{ maxWidth: 800 }}
                // onChange={(event) => setSearchTerm(event.target.value)}
              />
            </Card>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <Link href="/help-view" style={{ textDecoration: "none" }}>
                  <Card style={{ position: "relative", overflow: "hidden", height: 350 }}>
                    <div style={{ height: "62.5%", overflow: "hidden" }}>
                      <img
                        src="/assets/help/about-learn.png"
                        alt="Background"
                        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.95 }}
                      />
                    </div>
                    <CardContent>
                      <Typography align="center" gutterBottom variant="h5">
                        {" "}
                        About DealRoom{" "}
                      </Typography>
                      <Typography align="center" variant="subtitle2" color="text.secondary">
                        {" "}
                        4 articles{" "}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <Link href="/help-view" style={{ textDecoration: "none" }}>
                  <Card style={{ position: "relative", overflow: "hidden", height: 350 }}>
                    <div style={{ height: "62.5%", overflow: "hidden" }}>
                      <img
                        src="/assets/help/start-learn.png"
                        alt="Background"
                        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.95 }}
                      />
                    </div>
                    <CardContent>
                      <Typography align="center" gutterBottom variant="h5">
                        {" "}
                        Getting Started with DealRoom{" "}
                      </Typography>
                      <Typography align="center" variant="subtitle2" color="text.secondary">
                        {" "}
                        1 articles{" "}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <Link href="/help-view" style={{ textDecoration: "none" }}>
                  <Card style={{ position: "relative", overflow: "hidden", height: 350 }}>
                    <div style={{ height: "62.5%", overflow: "hidden" }}>
                      <img
                        src="/assets/help/navigating-learn.png"
                        alt="Background"
                        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.95 }}
                      />
                    </div>
                    <CardContent>
                      <Typography align="center" gutterBottom variant="h5">
                        {" "}
                        Navigating on DealRoom{" "}
                      </Typography>
                      <Typography align="center" variant="subtitle2" color="text.secondary">
                        {" "}
                        8 articles{" "}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <Link href="/help-view" style={{ textDecoration: "none" }}>
                  <Card style={{ position: "relative", overflow: "hidden", height: 350 }}>
                    <div style={{ height: "62.5%", overflow: "hidden" }}>
                      <img
                        src="/assets/help/definitions-learn.png"
                        alt="Background"
                        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.95 }}
                      />
                    </div>
                    <CardContent>
                      <Typography align="center" gutterBottom variant="h5">
                        {" "}
                        Definitions, Dictionary & Taxonomy{" "}
                      </Typography>
                      <Typography align="center" variant="subtitle2" color="text.secondary">
                        {" "}
                        14 articles{" "}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <Link href="/help-view" style={{ textDecoration: "none" }}>
                  <Card style={{ position: "relative", overflow: "hidden", height: 350 }}>
                    <div style={{ height: "62.5%", overflow: "hidden" }}>
                      <img
                        src="/assets/help/solutions-learn.png"
                        alt="Background"
                        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.95 }}
                      />
                    </div>
                    <CardContent>
                      <Typography align="center" gutterBottom variant="h5">
                        {" "}
                        Solutions & Use Cases{" "}
                      </Typography>
                      <Typography align="center" variant="subtitle2" color="text.secondary">
                        {" "}
                        9 articles{" "}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
