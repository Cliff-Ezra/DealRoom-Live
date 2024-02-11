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
      fillSeriesColor: false,
      custom: ({ seriesIndex }) => {
        // Look up the sector name in tableData using the series index
        const sectorName = tableData[seriesIndex]?.sector;
        return sectorName || "No sector";
      },
    },
  };
};

export const OverviewSectorsInterest = (props) => {
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
            Sectors by Interest
          </Box>
        }
      />
      <Divider />
      <CardContent>
        <Chart height={150} options={chartOptions} series={chartSeries} type="donut" width="100%" />
        <TableContainer component={Paper} sx={{ maxHeight: "250px", overflowY: "auto", mt: 4 }}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableBody>
              {chunkedData.map((chunk, chunkIndex) => (
                <TableRow key={chunkIndex}>
                  {chunk.map((row, rowIndex) => (
                    <TableCell component="th" scope="row" style={{ textAlign: "center" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          justifyContent: "center",
                        }}
                      >
                        <FiberManualRecordIcon
                          style={{ color: chartOptions.colors[chunkIndex * 3 + rowIndex] }}
                        />
                        {row.sector}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

OverviewSectorsInterest.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object,
  tableData: PropTypes.array,
};
