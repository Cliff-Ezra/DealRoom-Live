// External imports
import React from "react";
import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import Link from "next/link";

export const ReportList = () => {
  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom sx={{ mb: 5 }}>
        Reports
      </Typography>
      {/* Financial Reports Card */}
      <Card sx={{ boxShadow: "none", border: "1px solid grey", mb: 6 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Typography variant="h5" component="div">
                Admin Reports
              </Typography>
            </Grid>

            <Grid item xs={7}>
              {/* Report 1 */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="/admin/reports/DealFlow" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      color: "rgb(39 70 190)",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Deal Flow Pipeline Report
                  </Typography>
                </Link>
              </Box>
              <Typography
                variant="body2"
                component="div"
                sx={{ my: 1, fontSize: "1rem", color: "rgb(115 121 125)" }}
              >
                This is a report for the Deal Flow Pipeline.
              </Typography>
              <Divider sx={{ my: 2 }} />
              {/* Report 2 */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="/admin/reports/InvestorActivity" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      color: "rgb(39 70 190)",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Investor Activity Report
                  </Typography>
                </Link>
              </Box>
              <Typography
                variant="body2"
                component="div"
                sx={{ my: 1, fontSize: "1rem", color: "rgb(115 121 125)" }}
              >
                This is a report for the Investor Activity.
              </Typography>
              <Divider sx={{ my: 2 }} />
              {/* Report 3 */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="/admin/reports/InvestmentTrends" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      color: "rgb(39 70 190)",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Investment Trends Report
                  </Typography>
                </Link>
              </Box>
              <Typography
                variant="body2"
                component="div"
                sx={{ my: 1, fontSize: "1rem", color: "rgb(115 121 125)" }}
              >
                This is a report for the Investment Trends.
              </Typography>
              <Divider sx={{ my: 2 }} />
              {/* Report 4 */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="/admin/reports/InvestorEngagement" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      color: "rgb(39 70 190)",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Investor Engagement Report
                  </Typography>
                </Link>
              </Box>
              <Typography
                variant="body2"
                component="div"
                sx={{ my: 1, fontSize: "1rem", color: "rgb(115 121 125)" }}
              >
                This is a report for the Investor Engagement.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
