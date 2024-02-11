import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import { Button, Card, CardContent, CardHeader, SvgIcon } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { Chart } from "src/components/chart";

const useChartOptions = (categories) => {
  const theme = useTheme();
  return {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.success.main,
      // add more colors as needed
    ],
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
      show: true,
    },
    stroke: {
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        offsetY: -2,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -1,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
      title: {
        text: "Total Investment Amount",
        style: {
          color: theme.palette.text.primary,
        },
      },
    },
  };
};

export const OverviewTrendingSector = (props) => {
  const { chartSeries, sx } = props;

  // Extract categories from the first series in chartSeries
  const categories = chartSeries[0].data.map((dataPoint) => dataPoint.category);

  const chartOptions = useChartOptions(categories);

  return (
    <Card sx={sx}>
      <CardHeader title="Investment Activity Over Time" />
      <CardContent>
        <Chart height={350} options={chartOptions} series={chartSeries} type="line" width="100%" />
      </CardContent>
    </Card>
  );
};

OverviewTrendingSector.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object,
};
