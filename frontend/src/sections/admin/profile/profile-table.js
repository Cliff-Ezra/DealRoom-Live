// External imports
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Icon imports
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// Local imports
import useMediaQuery from "@mui/material/useMediaQuery";
import { Scrollbar } from "src/components/scrollbar";
import { ContactForm } from "src/dynamic/matches/contact-form";
import { InvestorDetails } from "src/dynamic/matches/investor-details";

const columns = [
  { id: "name", label: "Investor\u00a0Name", minWidth: 150, align: "left" },
  { id: "location", label: "Location", minWidth: 150, align: "left" },
  { id: "range", label: "Investment\u00a0Range", minWidth: 150, align: "left" },
  { id: "interest", label: "Interests", minWidth: 150, align: "left" },
  { id: "contact", label: "Contact\u00a0Information", minWidth: 150, align: "left" },
  { id: "last_active", label: "Last\u00a0Active", minWidth: 150, align: "left" },
  { id: "Actions", label: "Actions", minWidth: 100, align: "left" },
];

export const ProfileTable = ({ profiles }) => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [location, setLocation] = useState([]);
  const [range, setRange] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filteredRows, setFilteredRows] = useState(profiles);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const isSmallScreen = useMediaQuery("(max-width:1400px)");
  const [anchorElActions, setAnchorElActions] = useState(null);

  const [anchorElLocation, setAnchorElLocation] = useState(null);
  const [anchorElStrength, setAnchorElStrength] = useState(null);

  const locations = [...new Set(profiles.map((profile) => profile.location))];
  const strengths = [...new Set(profiles.map((profile) => profile.range))];

  // Function to get the value of a cell
  const getCellValue = (row, columnId) => {
    // Split the columnId by "." to get the keys for nested data
    const keys = columnId.split(".");
    // Use reduce to access the nested value
    return keys.reduce((obj, key) => (obj ? obj[key] : null), row);
  };

  // !Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // !Handle row actions
  const handleRowAction = (row) => {
    setSelectedRow(row);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    setOpenDetails(true);
  };

  // !Search Function
  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue === "") {
      setFilteredRows(
        profiles.slice().sort((a, b) => {
          if (a.id < b.id) return 1;
          if (a.id > b.id) return -1;
          return 0;
        })
      );
    } else {
      setFilteredRows(
        profiles.filter((row) =>
          columns.some((column) => {
            if (column.id === "action") return false;
            const cellValue = getCellValue(row, column.id);
            if (cellValue === null || cellValue === undefined) return false;
            return cellValue.toString().toLowerCase().includes(searchValue);
          })
        )
      );
    }
    setPage(0);
  };

  // !Sorting Functions
  // The useEffect is run whenever the sortColumn or sortDirection changes to ensure filtered rows are updated after state change
  useEffect(() => {
    if (sortColumn === null || sortDirection === null) {
      setFilteredRows(
        profiles.slice().sort((a, b) => {
          if (a.id < b.id) return 1;
          if (a.id > b.id) return -1;
          return 0;
        })
      );
    } else {
      const direction = sortDirection === "asc" ? 1 : -1;
      setFilteredRows(
        filteredRows.slice().sort((a, b) => {
          if (a[sortColumn] < b[sortColumn]) return -1 * direction;
          if (a[sortColumn] > b[sortColumn]) return 1 * direction;
          return 0;
        })
      );
    }
  }, [sortColumn, sortDirection]);

  // Function for sorting columns
  const handleSortClick = (column) => {
    if (column === sortColumn) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }

    setPage(0);
  };

  return (
    <>
      <Card sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search by name, sector, interest, etc."
          startAdornment={
            <InputAdornment position="start">
              {" "}
              <SvgIcon color="action" fontSize="small">
                {" "}
                <MagnifyingGlassIcon />{" "}
              </SvgIcon>{" "}
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
          onChange={handleSearchChange}
        />
        <Box sx={{ display: "flex", flexDirection: ["column", "row"], gap: 1 }}>
          <Button
            startIcon={!isSmallScreen && <AddCircleOutlineIcon />}
            variant="outlined"
            color="primary"
            sx={{ padding: "4.3px" }}
            onClick={(event) => setAnchorElLocation(event.currentTarget)}
          >
            {!isSmallScreen && (
              <Badge badgeContent={location.length} color="success">
                {" "}
                Location{" "}
              </Badge>
            )}
            {isSmallScreen && (
              <Typography variant="caption">
                <Badge badgeContent={location.length} color="success">
                  {" "}
                  Location{" "}
                </Badge>
              </Typography>
            )}
          </Button>
          <Menu
            anchorEl={anchorElLocation}
            open={Boolean(anchorElLocation)}
            onClose={() => setAnchorElLocation(null)}
          >
            {locations.map((option) => (
              <MenuItem key={option}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={location.includes(option)}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setLocation((prev) => [...prev, option]);
                        } else {
                          setLocation((prev) => prev.filter((item) => item !== option));
                        }
                      }}
                    />
                  }
                  label={option}
                />
              </MenuItem>
            ))}
            <Button onClick={() => setLocation([])}>Clear filters</Button>
          </Menu>

          <Button
            startIcon={!isSmallScreen && <AddCircleOutlineIcon />}
            variant="outlined"
            color="primary"
            sx={{ padding: "4.3px" }}
            onClick={(event) => setAnchorElStrength(event.currentTarget)}
          >
            {!isSmallScreen && (
              <Badge badgeContent={range.length} color="success">
                {" "}
                Investment Range{" "}
              </Badge>
            )}
            {isSmallScreen && (
              <Typography variant="caption">
                <Badge badgeContent={range.length} color="success">
                  {" "}
                  Investment Range{" "}
                </Badge>
              </Typography>
            )}
          </Button>
          <Menu
            anchorEl={anchorElStrength}
            open={Boolean(anchorElStrength)}
            onClose={() => setAnchorElStrength(null)}
          >
            {strengths.map((option) => (
              <MenuItem key={option}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={range.includes(option)}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setRange((prev) => [...prev, option]);
                        } else {
                          setRange((prev) => prev.filter((item) => item !== option));
                        }
                      }}
                    />
                  }
                  label={option}
                />
              </MenuItem>
            ))}
            <Button onClick={() => setRange([])}>Clear filters</Button>
          </Menu>
        </Box>
      </Card>

      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <TableSortLabel
                        active={sortColumn === column.id}
                        direction={sortColumn === column.id ? sortDirection : "asc"}
                        onClick={() => handleSortClick(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredRows
                  .filter((profile) => location.length === 0 || location.includes(profile.location))
                  .filter((profile) => range.length === 0 || range.includes(profile.range))
                  .map((match) => {
                    // Convert the last_active string to a Date object
                    const dateObject = new Date(match.last_active);

                    // Format the date and time
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
                      <TableRow
                        hover
                        type="checkbox"
                        tabIndex={-1}
                        key={match.id}
                        onClick={handleView}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell>{match.name}</TableCell>
                        <TableCell>{match.location}</TableCell>
                        <TableCell>{match.range}</TableCell>
                        <TableCell>{match.interest}</TableCell>
                        <TableCell>{match.contact}</TableCell>
                        <TableCell>{`${date}, ${time}`}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={(event) => setAnchorElActions(event.currentTarget)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id="long-menu"
                            anchorEl={anchorElActions}
                            open={Boolean(anchorElActions)}
                            onClose={() => setAnchorElActions(null)}
                          >
                            <MenuItem
                              onClick={() => {
                                setOpen(true);
                                setAnchorElActions(null);
                              }}
                            >
                              View
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setAnchorElActions(null);
                              }}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setAnchorElActions(null);
                              }}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={profiles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {/* Contact Dialog Box */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <ContactForm setOpen={setOpen} />
      </Dialog>
      {/* Investor Details Dialog Box */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="xl">
        <InvestorDetails setOpenDetails={setOpenDetails} />
      </Dialog>
    </>
  );
};
