import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { Chart } from "src/components/chart";

const useChartOptions = (tableData) => {
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
      "#D8D8D8",
      "#F1536E",
      "#2BC155",
      "#6F52E8",
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
      y: {
        formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
          // Look up the sector name in tableData using the series index
          const sectorName = tableData[dataPointIndex]?.sector;
          return `${sectorName}: ${value}`;
        },
      },
    },
  };
};

export const OverviewPreferredSector = (props) => {
  const { chartSeries, sx, tableData = [] } = props;
  const chartOptions = useChartOptions(tableData);
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

  // Function to divide an array into chunks
  const chunk = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  // Divide tableData into chunks of 3
  const chunkedData = chunk(tableData, 3);

  return (
    <Card sx={sx}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            Preferred Sector by Investors
          </Box>
        }
      />
      <Divider />
      <CardContent>
        <Chart height={180} options={chartOptions} series={chartSeries} type="pie" width="100%" />
        <TableContainer component={Paper} sx={{ maxHeight: "250px", overflowY: "auto", mt: 4 }}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableBody>
              {tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell component="th" scope="row" style={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        justifyContent: "center",
                      }}
                    >
                      <FiberManualRecordIcon style={{ color: chartOptions.colors[rowIndex] }} />
                      {row.sector}
                    </Box>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>{chartSeries[rowIndex]}K</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

OverviewPreferredSector.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object,
  tableData: PropTypes.array,
};
