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

export const OpportunitiesDetails = ({ setOpenDetails }) => {
  return (
    <Card>
      <CardHeader title="Muko Iron And Steel" />
      <Divider />
      <CardContent>
        <Typography variant="body1">
          <strong>Company Name:</strong> Muko Iron and Steel company
        </Typography>
        <Typography variant="body1">
          <strong>Investment Ammount:</strong> $240k
        </Typography>
        <Typography variant="body1">
          <strong>Company Details:</strong> Muko hosts hematite deposits of iron ore with 150
          million tones. This haematite Iron Ore, show characteristics of high-quality iron ore
          (55-68% Fe).
        </Typography>
        <Typography variant="body1">
          <strong>Key Contacts:</strong> John Musinde (CEO)
        </Typography>
        <Typography variant="body1">
          <strong>Important Dates:</strong> Jun 12, Investment Meeting
        </Typography>
        <Typography variant="body1">
          <strong>Previous Investment:</strong> XYZ Tech, Solar Innovations, AgriCo
        </Typography>
        <Typography variant="body1">
          <strong>Number of Investments:</strong> Technology: 5, Renewable Energy: 3, Agriculture: 2
        </Typography>
        <Typography variant="body1">
          <strong>Notes & Attachments:</strong> N/A
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
