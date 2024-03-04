// External imports
import {
  Box,
  Card,
  Dialog,
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
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Icon imports
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// Local imports
import { Scrollbar } from "src/components/scrollbar";
import { ContactForm } from "src/dynamic/matches/contact-form";
import { InvestorDetails } from "src/dynamic/matches/investor-details";

const columns = [
  { id: "name", label: "Business\u00a0Name", minWidth: 150, align: "left" },
  { id: "description", label: "Description", minWidth: 150, align: "left" },
  { id: "sector", label: "Sector", minWidth: 150, align: "left" },
  { id: "location", label: "Location", minWidth: 150, align: "left" },
  { id: "status", label: "Status", minWidth: 150, align: "left" },
  { id: "Amount", label: "Amount", minWidth: 150, align: "left" },
  { id: "Actions", label: "Actions", minWidth: 100, align: "left" },
];

export const ProfileTable = ({ matches }) => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState([]);
  const [strength, setStrength] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filteredRows, setFilteredRows] = useState(matches);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [anchorElActions, setAnchorElActions] = useState(null);

  const [anchorElLocation, setAnchorElLocation] = useState(null);
  const [anchorElStrength, setAnchorElStrength] = useState(null);

  const locations = [...new Set(matches.map((match) => match.location))];
  const strengths = [...new Set(matches.map((match) => match.strength))];

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

  // !Search Function
  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue === "") {
      setFilteredRows(
        matches.slice().sort((a, b) => {
          if (a.id < b.id) return 1;
          if (a.id > b.id) return -1;
          return 0;
        })
      );
    } else {
      setFilteredRows(
        matches.filter((row) =>
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
        matches.slice().sort((a, b) => {
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

  const isSmallScreen = useMediaQuery("(max-width:1400px)");

  return (
    <>
      <Card sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search for Opportunity"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />{" "}
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
          onChange={handleSearchChange}
        />
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
                  .filter((match) => location.length === 0 || location.includes(match.location))
                  .filter((match) => strength.length === 0 || strength.includes(match.strength))
                  .map((match) => (
                    <TableRow hover type="checkbox" tabIndex={-1} key={match.id}>
                      <TableCell>{match.name}</TableCell>
                      <TableCell
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: 200,
                        }}
                      >
                        {match.description}
                      </TableCell>
                      <TableCell>{match.sector}</TableCell>
                      <TableCell>{match.location}</TableCell>
                      <TableCell>{match.status}</TableCell>
                      <TableCell>{match.amount}</TableCell>
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
                              // setOpen(true);
                              setAnchorElActions(null);
                            }}
                          >
                            View Details
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              // setOpenDetails(true);
                              setAnchorElActions(null);
                            }}
                          >
                            Remove
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={matches.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {/* Contact Dialog Box */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
        <ContactForm setOpen={setOpen} />
      </Dialog>
      {/* Investor Details Dialog Box */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="md">
        <InvestorDetails setOpenDetails={setOpenDetails} />
      </Dialog>
    </>
  );
};
