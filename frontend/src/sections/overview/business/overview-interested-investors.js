import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const OverviewInterestedInvestors = (props) => {
  const { investors = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Interested Investors" />
      <Scrollbar sx={{ flexGrow: 1, height: 400, overflowY: "auto" }}>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell sortDirection="desc">Phone</TableCell>
                <TableCell>Date of Interest</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {investors.map((investor) => {
                const dateObject = new Date(investor.date_of_interest);
                const date = dateObject.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                const time = dateObject.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });
                return (
                  <TableRow hover key={investor.id}>
                    <TableCell>{investor.name}</TableCell>
                    <TableCell>{investor.phone}</TableCell>
                    <TableCell>{`${date} ${time}`}</TableCell>
                    <TableCell>
                      <IconButton color="error">
                        <CancelIcon />
                      </IconButton>
                      <IconButton color="success">
                        <CheckCircleIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewInterestedInvestors.prototype = {
  investors: PropTypes.array,
  sx: PropTypes.object,
};
