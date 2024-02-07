import Link from "next/link";
import PropTypes from "prop-types";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Card, CardContent, Divider, Stack, SvgIcon, Typography, Button } from "@mui/material";

export const CompanyCard = (props) => {
  const { opportunity } = props;
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
        <Typography align="left" gutterBottom variant="h5">
          {opportunity.title}
        </Typography>
        <Typography align="left" variant="subtitle2" color="text.secondary">
          {opportunity.industry}
        </Typography>
        <Typography align="left" variant="body1">
          {opportunity.description}
        </Typography>
        <Typography align="left" variant="body2" fontWeight="bold" sx={{ mt: 2 }}>
          Amount Sought:&nbsp;&nbsp;&nbsp;{opportunity.amount}
        </Typography>
        <Typography align="left" variant="body2" fontWeight="bold" sx={{ mt: 2 }}>
          Match:&nbsp;&nbsp;&nbsp;<span style={{ color: "#096310" }}>{opportunity.match}</span>
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack></Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          {/* /business-details/${company.id} */}
          <Link href={`business-view`}>
            <Button variant="contained" color="primary" startIcon={<InfoIcon />}>
              Read More
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  opportunity: PropTypes.object.isRequired,
};
