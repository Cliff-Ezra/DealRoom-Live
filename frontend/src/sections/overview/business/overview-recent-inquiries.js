import { format } from "date-fns";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
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
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

export const OverviewRecentInquiries = (props) => {
  const { inquiries = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Recent Inquiries & Feedback" />
      <Scrollbar sx={{ flexGrow: 1, height: 400, overflowY: "auto" }}>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell sortDirection="desc">Email</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inquiries.map((inquiry) => {
                return (
                  <TableRow hover key={inquiry.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          sx={{ cursor: "pointer", height: 36, width: 36, marginRight: 1 }}
                          src={inquiry.avatar}
                        />
                        {inquiry.name}
                      </Box>
                    </TableCell>
                    <TableCell>{inquiry.email}</TableCell>
                    <TableCell>{inquiry.phone}</TableCell>
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

OverviewRecentInquiries.prototype = {
  inquiries: PropTypes.array,
  sx: PropTypes.object,
};
