import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import {
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";

export const OverviewNewListings = (props) => {
  const { listings = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="New Listings & Matches" />
      <Box sx={{ height: "440px", overflowY: "auto" }}>
        <List>
          {listings.map((listing, index) => {
            const hasDivider = index < listings.length - 1;
            return (
              <ListItem divider={hasDivider} key={listing.id}>
                <ListItemAvatar>
                  {listing.image ? (
                    <Box
                      component="img"
                      src={listing.image}
                      sx={{ borderRadius: 1, height: 64, width: 64 }}
                    />
                  ) : (
                    <Box
                      sx={{
                        borderRadius: 1,
                        backgroundColor: "neutral.200",
                        height: 64,
                        width: 64,
                      }}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  sx={{ pl: 3 }}
                  primary={listing.name}
                  primaryTypographyProps={{ variant: "subtitle1" }}
                  secondary={`${listing.match} . ${listing.amount}`}
                  secondaryTypographyProps={{ variant: "body2" }}
                />
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
