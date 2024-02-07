import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  Button,
  Menu,
  MenuItem,
  Divider,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Chart } from "src/components/chart";
import { useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const useChartOptions = () => {
  const theme = useTheme();
  return {
    chart: {
      background: "transparent",
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      "#F79008",
      "#F1536E",
      "#6F52E8",
      "#2BC155",
    ],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

export const OverviewRecentInteractions = (props) => {
  const { chartSeries, sx, tableData = [] } = props;
  const chartOptions = useChartOptions();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("This Month");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    if (typeof value === "string") {
      setFilter(value);
    }
    setAnchorEl(null);
  };

  return (
    <Card sx={sx}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            Top Investment Opportunities
            <div>
              <Button variant="contained" color="primary" onClick={handleClick}>
                {filter}
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => handleClose("This Month")}>This Month</MenuItem>
                <MenuItem onClick={() => handleClose("This Year")}>This Year</MenuItem>
              </Menu>
            </div>
          </Box>
        }
      />
      <Divider />
      <CardContent>
        <Chart height={150} options={chartOptions} series={chartSeries} type="donut" width="100%" />
        <TableContainer component={Paper} sx={{ maxHeight: "250px", overflowY: "auto" }}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell align="right">Total Users</TableCell>
                <TableCell align="right">Bounce Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <FiberManualRecordIcon style={{ color: chartOptions.colors[index] }} />
                      {row.name}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{row.users}</TableCell>
                  <TableCell align="right">{row.bounceRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

OverviewRecentInteractions.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object,
  tableData: PropTypes.array,
};
