import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaDribbble, FaBehance } from "react-icons/fa";
import { Pinterest } from "@mui/icons-material";
import { useState } from "react";

export const OverviewInvestmentOpportunities = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("This Month");
  const { opportunities = [], sx } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    if (typeof value === "string") {
      setFilter(value);
    }
    setAnchorEl(null);
  };

  const getIcon = (project) => {
    switch (project) {
      case "Facebook":
        return <FacebookIcon sx={{ color: "blue" }} />;
      case "Twitter":
        return <TwitterIcon sx={{ color: "skyblue" }} />;
      case "LinkedIn":
        return <LinkedInIcon sx={{ color: "blue" }} />;
      case "Instagram":
        return <InstagramIcon sx={{ color: "purple" }} />;
      case "Dribbble":
        return <FaDribbble sx={{ color: "pink" }} />;
      case "Behance":
        return <FaBehance sx={{ color: "orange" }} />;
      case "Pinterest":
        return <Pinterest sx={{ color: "red" }} />;
      default:
        return null;
    }
  };

  return (
    <Card sx={sx}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            Top Investment Opportunities
            <div>
              <Button variant="contained" color="primary" onClick={handleClick}>
                {filter}
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => handleClose("This Month")}>This Month</MenuItem>
                <MenuItem onClick={() => handleClose("This Year")}>This Year</MenuItem>
              </Menu>
            </div>
          </Box>
        }
      />
      <Scrollbar sx={{ flexGrow: 1, height: 450, overflowY: "auto" }}>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project</TableCell>
                <TableCell sortDirection="desc">Price Range</TableCell>
                <TableCell>Asking Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {opportunities.map((opportunity) => {
                return (
                  <TableRow hover key={opportunity.id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {getIcon(opportunity.project)}
                        {opportunity.project}
                      </Box>
                    </TableCell>
                    <TableCell>{opportunity.price_range}</TableCell>
                    <TableCell>{opportunity.asking_price}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
    </Card>
  );
};

OverviewInvestmentOpportunities.prototype = {
  opportunities: PropTypes.array,
  sx: PropTypes.object,
};
