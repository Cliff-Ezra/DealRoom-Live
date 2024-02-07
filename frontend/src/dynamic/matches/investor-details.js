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

export const InvestorDetails = ({ setOpenDetails }) => {
  return (
    <Card>
      <CardHeader subheader="View Investor Information" title="Investor Profile" />
      <Divider />
      <CardContent>
        <Typography variant="body1">
          <strong>Name:</strong> John Doe
        </Typography>
        <Typography variant="body1">
          <strong>Year Established:</strong> 2010
        </Typography>
        <Typography variant="body1">
          <strong>Location:</strong> Kigali, Rwanda
        </Typography>
        <Typography variant="body1">
          <strong>Year Established:</strong> 2018
        </Typography>
        <Typography variant="body1">
          <strong>Website: </strong>
          <Link href="http://www.johndoeinvestments.com" target="_blank" rel="noopener">
            www.johndoeinvestments.com
          </Link>
        </Typography>
        <Typography variant="body1">
          <strong>Investment Focus:</strong> Technology, Renewable Energy
        </Typography>
        <Typography variant="body1">
          <strong>Investment Range:</strong> 100,000 USD - 500,000 USD
        </Typography>
        <Typography variant="body1">
          <strong>Previous Investment:</strong> XYZ Tech, Solar Innovations, AgriCo
        </Typography>
        <Typography variant="body1">
          <strong>Number of Investments:</strong> Technology: 5, Renewable Energy: 3, Agriculture: 2
        </Typography>
        <Typography variant="body1">
          <strong>Investments by Country:</strong> Rwanda: 5, Uganda: 3, Kenya: 2
        </Typography>
        <Typography variant="body1">
          <strong>Background:</strong> Experienced in tech startups and sustainable projects.
        </Typography>
        <Typography variant="body1">
          <strong>Investment Policy:</strong> Long-term growth potential with a focus on innovation.
        </Typography>
        <Typography variant="body1">
          <strong>Contact:</strong> johndoe@email.com
        </Typography>
        <Typography variant="body1">
          <strong>LinkedIn: </strong>
          <Link href="http://www.linkedin.com/in/john-doe" target="_blank" rel="noopener">
            www.johndoeinvestments.com
          </Link>
        </Typography>
        <Typography variant="body1">
          <strong>Terms/Conditions:</strong> Prefers equity stake, hands-on involvement.
        </Typography>
        <Typography variant="body1">
          <strong>Additional Info:</strong> Known for mentorship and providing strategic business
          advice.
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
