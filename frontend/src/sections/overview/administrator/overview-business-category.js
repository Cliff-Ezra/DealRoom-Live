import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  SvgIcon
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { Chart } from "src/components/chart";

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
        formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    // tooltip: {
    //   y: {
    //     formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
    //       return `${categories[dataPointIndex]}: ${value}K`;
    //     },
    //   },
    // },
  };
};

export const OverviewBusinessCategory = (props) => {
  const { chartSeries, sx } = props;

  // Extract categories and values from chartSeries
  const categories = chartSeries[0].data.map((dataPoint) => dataPoint.category);
  const values = chartSeries[0].data.map((dataPoint) => dataPoint.value);

  const chartOptions = useChartOptions(categories);

  return (
    <Card sx={sx}>
      <CardHeader
        action={
          <Button
            color="inherit"
            size="small"
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowRightIcon />
              </SvgIcon>
            }
          >
            Advanced Report
          </Button>
        }
        title="Business by Category"
      />
      <CardContent sx={{ mt: 2 }}>
        <Chart
          height={350}
          options={chartOptions}
          series={[{ name: "Combined", data: values }]}
          type="bar"
          width="100%"
        />
      </CardContent>
    </Card>
  );
};

OverviewBusinessCategory.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object,
};
