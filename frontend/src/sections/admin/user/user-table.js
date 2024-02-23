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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Icon imports
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// Local imports
import useMediaQuery from "@mui/material/useMediaQuery";
import { Scrollbar } from "src/components/scrollbar";
import { ContactForm } from "src/dynamic/matches/contact-form";
import { InvestorDetails } from "src/dynamic/matches/investor-details";

const columns = [
  { id: "user", label: "User\u00a0Name", minWidth: 150, align: "left" },
  { id: "email", label: "Email", minWidth: 150, align: "left" },
  { id: "role", label: "Role", minWidth: 150, align: "left" },
  { id: "entity_type", label: "Entity\u00a0Type", minWidth: 150, align: "left" },
  { id: "last_active", label: "Last\u00a0Active", minWidth: 150, align: "left" },
  { id: "Actions", label: "Actions", minWidth: 100, align: "left" },
];

export const UserTable = ({ users }) => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filteredRows, setFilteredRows] = useState(users);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const isSmallScreen = useMediaQuery("(max-width:1400px)");
  const [anchorElActions, setAnchorElActions] = useState(null);

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
        users.slice().sort((a, b) => {
          if (a.id < b.id) return 1;
          if (a.id > b.id) return -1;
          return 0;
        })
      );
    } else {
      setFilteredRows(
        users.filter((row) =>
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
        users.slice().sort((a, b) => {
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
          placeholder="Search by username or email"
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
                {filteredRows.map((match) => {
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
                    <TableRow hover type="checkbox" tabIndex={-1} key={match.id}>
                      <TableCell>{match.user}</TableCell>
                      <TableCell>{match.email}</TableCell>
                      <TableCell>{match.role}</TableCell>
                      <TableCell>{match.entity_type}</TableCell>
                      <TableCell>{`${date}, ${time}`}</TableCell>
                      {/* <TableCell>
                        <Box sx={{ display: "flex", flexDirection: ["column", "row"], gap: 1 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ padding: "4px" }}
                            // onClick={() => setOpenDetails(true)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ padding: "4px" }}
                            // onClick={() => setOpenDetails(true)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell> */}
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {/* Contact Dialog Box */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl">
        <ContactForm setOpen={setOpen} />
      </Dialog>
      {/* Investor Details Dialog Box */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="xl">
        <InvestorDetails setOpenDetails={setOpenDetails} />
      </Dialog>
    </>
  );
};
