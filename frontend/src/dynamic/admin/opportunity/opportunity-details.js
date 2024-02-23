import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Typography,
} from "@mui/material";

export const OpportunityDetails = ({ setOpenDetails }) => {
  return (
    <Card>
      <CardHeader subheader="View Opportunity Information" title="Opportunity Details" />
      <Divider />
      <CardContent>
        <Typography variant="body1">
          <strong>Business Name:</strong> Business A
        </Typography>
        <Typography variant="body1">
          <strong>Date Listed:</strong> 10 Jul 2023, 09:33 AM
        </Typography>
        <Typography variant="body1">
          <strong>Description:</strong> Startup in the tech Industry
        </Typography>
        <Typography variant="body1">
          <strong>Location</strong> Kigali
        </Typography>
        <Typography variant="body1">
          <strong>Status</strong> Seeking Investment
        </Typography>
        <Typography variant="body1">
          <strong>Amount Sought</strong> 500,000 USD
        </Typography>
        <Typography variant="body1">
          <strong>Sector</strong> Renewable Energy
        </Typography>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => setOpenDetails(false)}>
          Close
        </Button>
      </CardActions>
    </Card>
  );
};
