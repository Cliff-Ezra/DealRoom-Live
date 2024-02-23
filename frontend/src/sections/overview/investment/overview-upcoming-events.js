import { Card, CardContent, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const OverviewUpcomingEvents = (props) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Upcoming Events
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewUpcomingEvents.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
