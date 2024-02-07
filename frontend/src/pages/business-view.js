import DomainIcon from "@mui/icons-material/Domain";
import FacebookIcon from "@mui/icons-material/Facebook";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import GavelIcon from "@mui/icons-material/Gavel";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  Unstable_Grid2 as Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Head from "next/head";
import { useState } from "react";
import { InterestForm } from "src/dynamic/opportunities/interest-form";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:1400px)");

  return (
    <>
      <Head>
        <title>Business Information</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="true">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h5">Business Details</Typography>
              </Stack>
            </Stack>

            <Card style={{ position: "relative", overflow: "hidden", height: 380 }}>
              <div style={{ height: "62.5%", overflow: "hidden" }}>
                <img
                  src="/assets/business-cover.jpg"
                  alt="Background"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.95 }}
                />
              </div>
              <CardContent
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: "58.5%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Typography variant={isSmallScreen ? "h6" : "h5"}>
                    Tech Innovators Inc.
                  </Typography>
                  <Typography variant={isSmallScreen ? "body2" : "body1"} color="textSecondary">
                    Technology / Healthcare
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <Typography
                      variant={isSmallScreen ? "h6" : "h4"}
                      style={{ fontWeight: "bold" }}
                    >
                      {" "}
                      $95,400{" "}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {" "}
                      Investment Required{" "}
                    </Typography>
                  </div>
                  <div style={{ marginLeft: 80 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: isSmallScreen ? 1 : 0 }}
                      onClick={() => setOpen(true)}
                    >
                      {isSmallScreen ? (
                        <Typography variant="caption">Show Interest</Typography>
                      ) : (
                        "Show Interest"
                      )}
                    </Button>
                    <Button variant="outlined" sx={{ ml: 2, mt: isSmallScreen ? 1 : 0 }}>
                      {isSmallScreen ? (
                        <Typography variant="caption">Ignore Interest</Typography>
                      ) : (
                        "Ignore Interest"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      <DomainIcon /> Business Overview
                    </Typography>
                    <Typography>
                      <strong>Company Name:</strong> Tech Innovators Inc.
                    </Typography>
                    <Typography>
                      <strong>Industry/Sector:</strong> Technology / Healthcare
                    </Typography>
                    <Typography>
                      <strong>Location:</strong> Kigali, Rwanda
                    </Typography>
                    <Typography>
                      <strong>Description:</strong> Tech Innovators Inc. is a leading software
                      development company specializing in innovative solutions for the healthcare
                      industry.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      <FactCheckIcon /> Project Details
                    </Typography>
                    <Typography>
                      <strong>Project Timeline:</strong> 2023 - 2025
                    </Typography>
                    <Typography>
                      <strong>Management Team:</strong> John Doe (CEO), Jane Smith (CTO)
                    </Typography>
                    <Typography>
                      <strong>Growth Potential:</strong> Estimated market size of $10M in the next 5
                      years.
                    </Typography>
                    <Typography>
                      <strong>Customer Base:</strong> 50+ healthcare facilities industry.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      <MonetizationOnIcon /> Financials
                    </Typography>
                    <Typography>
                      <strong>Current Financials:</strong> Revenue: <strong>$500K</strong>, Profit:
                      <strong>$50K</strong>
                    </Typography>
                    <Typography>
                      <strong>Funding Sought:</strong> <strong>$1M</strong>
                    </Typography>
                    <Typography>
                      <strong>Use of Funds:</strong> Product development, Market expansion years.
                    </Typography>
                    <Typography>
                      <strong>Previous Funding:</strong> <strong>$300K</strong> from Angel Investors
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      <GavelIcon /> Legal & Compliance
                    </Typography>
                    <Typography>
                      <strong>Legal & Compliance:</strong> Compliant with local and international
                      software development regulations.
                    </Typography>
                    <Typography>
                      <strong>Risk Analysis:</strong> Potential risks include rapid technology
                      changes and market competition. Mitigation strategies include continuous
                      innovation and market analysis.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      <RecentActorsIcon /> Contact & Additional Information
                    </Typography>
                    <Typography>
                      <strong>Email:</strong> techinnovators@tech-ino.com
                    </Typography>
                    <Typography>
                      <strong>Phone:</strong> +250-788-123-456
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                      <strong>Reach us On:</strong>
                    </Typography>
                    <div>
                      <IconButton
                        href="https://www.facebook.com"
                        target="_blank"
                        style={{ color: "#3b5998" }}
                      >
                        <FacebookIcon />
                      </IconButton>
                      <IconButton
                        href="https://www.linkedin.com"
                        target="_blank"
                        style={{ color: "#0e76a8" }}
                      >
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton
                        href="https://www.twitter.com"
                        target="_blank"
                        style={{ color: "#00acee" }}
                      >
                        <TwitterIcon />
                      </IconButton>
                      <IconButton
                        href="https://www.instagram.com"
                        target="_blank"
                        style={{ color: "#C13584" }}
                      >
                        <InstagramIcon />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
      {/* Interest Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="false">
        {/* <DialogContent sx={{ minWidth: "50vw" }}> */}
          <InterestForm setOpen={setOpen} />
        {/* </DialogContent> */}
      </Dialog>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
