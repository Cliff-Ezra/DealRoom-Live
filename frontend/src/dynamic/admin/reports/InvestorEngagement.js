// External imports
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
// Icon imports
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import TableChartIcon from "@mui/icons-material/TableChart";
import ViewListIcon from "@mui/icons-material/ViewList";

// Local imports
// import api from "src/utils/custom-axios";
import { alpha, useTheme } from "@mui/material/styles";
import Link from "next/link";
import { Chart } from "src/components/chart";

// TODO:To enhance the user experience, you could consider adding features such as sorting, filtering, and pagination to the report layout. This would allow users to easily view and analyze large datasets. (RESEARCH!!)

const data = [
  { date: "2023-01-15", investorName: "Investor A", action: "Show Interest" },
  { date: "2023-01-16", investorName: "Investor B", action: "View Business Details" },
  { date: "2023-01-17", investorName: "Investor C", action: "Show Interest" },
  { date: "2023-01-18", investorName: "Investor D", action: "View Business Details" },
  { date: "2023-01-19", investorName: "Investor E", action: "Show Interest" },
];

const interactionData = [
  { month: "January", interactions: 15 },
  { month: "February", interactions: 20 },
  { month: "March", interactions: 10 },
  { month: "April", interactions: 24 },
  { month: "May", interactions: 26 },
  { month: "June", interactions: 28 },
  { month: "July", interactions: 18 },
  { month: "August", interactions: 20 },
  { month: "September", interactions: 10 },
  { month: "October", interactions: 24 },
  { month: "November", interactions: 26 },
  { month: "December", interactions: 28 },
];

const useChartOptions = (categories) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "40px",
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: categories,
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};

export const InvestorEngagement = () => {
  const [dateRange, setDateRange] = useState("Year to Date");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportData, setReportData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [interval, setInterval] = useState("Yearly");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Extract categories and values from interactionData
  const categories = interactionData.map((dataPoint) => dataPoint.month);
  const values = interactionData.map((dataPoint) => dataPoint.interactions);
  const chartOptions = useChartOptions(categories);

  // Currency formatter
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "UGX",
    minimumFractionDigits: 2,
  });

  // Number formatter
  const numberFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  });

  // !Table calculation functions
  const calculateTotalIncome = (income) => {
    const totalIncome = income.reduce((acc, row) => {
      row.values.forEach((value, index) => {
        acc[index] = (acc[index] || 0) + (value || 0);
      });
      return acc;
    }, []);
    totalIncome.push(totalIncome.reduce((acc, value) => acc + value, 0));
    return totalIncome;
  };

  // Update from and to dates based on selected date range
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentQuarter = Math.floor(currentMonth / 3);

    let newFromDate;
    let newToDate;

    switch (dateRange) {
      case "Year to Date":
        newFromDate = new Date(currentYear, 0, 1);
        newToDate = currentDate;
        break;
      case "Current Month":
        newFromDate = new Date(currentYear, currentMonth, 1);
        newToDate = new Date(currentYear, currentMonth + 1, 0);
        break;
      case "Current Quarter":
        newFromDate = new Date(currentYear, currentQuarter * 3, 1);
        newToDate = new Date(currentYear, (currentQuarter + 1) * 3, 0);
        break;
      case "Current Year":
        newFromDate = new Date(currentYear, 0, 1);
        newToDate = new Date(currentYear + 1, 0, 0);
        break;
      case "Last Month":
        newFromDate = new Date(currentYear, currentMonth - 1, 1);
        newToDate = new Date(currentYear, currentMonth, 0);
        break;
      case "Last Quarter":
        newFromDate = new Date(currentYear, (currentQuarter - 1) * 3, 1);
        newToDate = new Date(currentYear, currentQuarter * 3, 0);
        break;
      case "Custom Date":
        // Do not update from and to dates
        return;
    }

    setFromDate(newFromDate.toLocaleDateString("en-CA"));
    setToDate(newToDate.toLocaleDateString("en-CA"));
    // Reset error message
    setErrorMessage("");
  }, [dateRange]);

  // Export button menu
  const handleExportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setAnchorEl(null);
  };

  // Submission logic
  async function handleSubmit(event) {
    event.preventDefault();
    // Validate from and to dates
    if (new Date(fromDate) > new Date(toDate)) {
      setErrorMessage("The From date must be earlier than the To date.");
      return;
    }
    // Reset error message
    setErrorMessage("");
    // Set loading state
    setLoading(true);
    try {
      const response = await api.get("/reports/total-revenue", {
        params: {
          start_date: fromDate,
          end_date: toDate,
          interval: interval,
        },
      });
      setReportData(response.data.response);
    } catch (error) {
      // Handle error when fetching data from backend
      setErrorMessage("An error occurred while fetching data. Please try again.");
    } finally {
      // Reset loading state
      setLoading(false);
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Link href="/admin/reports" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography component="div" sx={{ cursor: "pointer", fontSize: 28, fontWeight: 500 }}>
            Reports
          </Typography>
        </Link>
        <ArrowForwardIosIcon
          sx={{ width: "16px", height: "16px", color: "black", fontWeight: "bold", mx: "2px" }}
        />
        <Typography component="div" sx={{ fontSize: "26px" }}>
          Investor Engagement Report
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="This report shows the Investor Engagement">
          <InfoIcon sx={{ fontSize: 33, color: "green" }} />
        </Tooltip>
      </Box>
      {/* Report Form */}
      <Card sx={{ mb: "2px" }}>
        <CardContent>
          {/* Display error message */}
          {errorMessage && (
            <Alert severity="error" sx={{ mb: "2px" }}>
              {errorMessage}
            </Alert>
          )}
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Date Range"
                      name="dateRange"
                      onChange={(event) => setDateRange(event.target.value)}
                      required
                      select
                      value={dateRange}
                    >
                      <MenuItem value="Year to Date">Year to Date</MenuItem>
                      <MenuItem value="Current Month">Current Month</MenuItem>
                      <MenuItem value="Current Quarter">Current Quarter</MenuItem>
                      <MenuItem value="Current Year">Current Year</MenuItem>
                      <MenuItem value="Last Month">Last Month</MenuItem>
                      <MenuItem value="Last Quarter">Last Quarter</MenuItem>
                      <MenuItem value="Custom Date">Custom Date</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="From"
                      type="date"
                      value={fromDate}
                      onChange={(event) => setFromDate(event.target.value)}
                      disabled={dateRange !== "Custom Date"}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="To"
                      type="date"
                      value={toDate}
                      onChange={(event) => setToDate(event.target.value)}
                      disabled={dateRange !== "Custom Date"}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={handleExportClick}
                  sx={{
                    borderColor: "grey.500",
                    backgroundColor: "background.default",
                    color: "grey.700",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "background.default",
                      borderColor: "rgb(100, 102, 241)",
                    },
                    padding: "8px 16px",
                    fontSize: "1rem",
                    mr: 2,
                  }}
                >
                  Export <ArrowDropDownIcon />
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleExportClose}>
                  <MenuItem // onClick={exportPdf}
                  >
                    <ListItemIcon>
                      <DescriptionIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>PDF</ListItemText>
                  </MenuItem>
                  <MenuItem // onClick={exportExcel}
                  >
                    <ListItemIcon>
                      <TableChartIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Excel</ListItemText>
                  </MenuItem>
                  <MenuItem // onClick={exportCsv}
                  >
                    <ListItemIcon>
                      <ViewListIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>CSV</ListItemText>
                  </MenuItem>
                </Menu>
                <Button
                  variant="contained"
                  // onClick={handleSubmit}
                  sx={{ padding: "6px 12px", fontSize: "0.875rem", width: "110px" }}
                >
                  Run Report
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Report Bar Chart */}
      <Card>
        <CardHeader title="Investor Interaction Trends" />
        <CardContent sx={{ mt: 2 }}>
          <Chart
            height={350}
            options={chartOptions}
            series={[{ name: "Interactions", data: values }]}
            type="bar"
            width="100%"
          />
        </CardContent>
      </Card>

      {/* Report Layout */}
      <Card>
        <CardContent>
          {/* TODO:Change to reportData */}
          {data != null ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Investor Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.date}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.investorName}</TableCell>
                      <TableCell>{row.action}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer style={{ marginBottom: "2rem" }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ textAlign: "center" }}>
                      Generate a report to view data
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {/* Display loading state */}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Generating Report...</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
};
