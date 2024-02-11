import { Box, Card, CardHeader, List, ListItem, ListItemText, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { formatDistanceToNow, parseISO } from "date-fns";

const getTimeDifference = (dateString) => {
  const date = parseISO(dateString);
  const timeDifference = formatDistanceToNow(date, { addSuffix: true });
  return timeDifference.replace("about", "").replace("less than", "").replace("over", "");
};

export const OverviewNewListings = (props) => {
  const { listings = [], sx } = props;
  return (
    <Card sx={sx}>
      <CardHeader title="Recent Listings" />
      <Box
        sx={{
          height: "440px",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            outline: "1px solid slategrey",
          },
        }}
      >
        <List>
          {listings.map((listing, index) => {
            const hasDivider = index < listings.length - 1;
            return (
              <ListItem divider={hasDivider} key={listing.id}>
                <ListItemText
                  sx={{ pl: 3 }}
                  primary={listing.name}
                  primaryTypographyProps={{ variant: "subtitle1" }}
                  secondary={`${listing.description}`}
                  secondaryTypographyProps={{ variant: "body2" }}
                />
                <Typography variant="body2" color="text.secondary" align="right">
                  Listed {getTimeDifference(listing.listed)}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Card>
  );
};

OverviewNewListings.propTypes = {
  listing: PropTypes.array,
  sx: PropTypes.object,
};
