// External imports
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  OutlinedInput,
  InputAdornment,
  SvgIcon,
  TableSortLabel,
  Button,
  Dialog,
  DialogContent,
  Badge,
} from "@mui/material";
// Icon imports
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
// Local imports
import { Scrollbar } from "src/components/scrollbar";
import { ContactForm } from "src/dynamic/matches/contact-form";
import { InvestorDetails } from "src/dynamic/matches/investor-details";
import useMediaQuery from "@mui/material/useMediaQuery";

const columns = [
  { id: "name", label: "Business\u00a0Name", minWidth: 150, align: "left" },
  { id: "location", label: "Location", minWidth: 150, align: "left" },
  { id: "description", label: "Description", minWidth: 150, align: "left" },
  { id: "sector", label: "Sector", minWidth: 150, align: "left" },
  { id: "status", label: "Status", minWidth: 150, align: "left" },
  { id: "sought_amount", label: "Sought\u00a0Amount", minWidth: 150, align: "left" },
  { id: "date_listed", label: "Date\u00a0Listed", minWidth: 150, align: "left" },
  { id: "Actions", label: "Actions", minWidth: 100, align: "left" },
];

export const OpportunityTable = ({ matches }) => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filteredRows, setFilteredRows] = useState(matches);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const isSmallScreen = useMediaQuery("(max-width:1400px)");

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

  return (
    <>
      <Card sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search by name, sector, location, etc."
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
        <Box>
          <Button
            startIcon={!isSmallScreen && <AddCircleOutlineIcon />}
            variant="outlined"
            color="primary"
            sx={{ padding: "4.3px" }}
            onClick={(event) => setAnchorElPriceRange(event.currentTarget)}
          >
            {!isSmallScreen && (
              <Badge
                // badgeContent={}
                color="success"
              >
                {" "}
                Sector{" "}
              </Badge>
            )}
            {isSmallScreen && (
              <Typography variant="caption">
                <Badge
                  // badgeContent={}
                  color="success"
                >
                  {" "}
                  Sector{" "}
                </Badge>
              </Typography>
            )}
          </Button>
          <Button
            startIcon={!isSmallScreen && <AddCircleOutlineIcon />}
            variant="outlined"
            color="primary"
            sx={{ padding: "4.3px", ml: 2 }}
            onClick={(event) => setAnchorElPriceRange(event.currentTarget)}
          >
            {!isSmallScreen && (
              <Badge
                // badgeContent={}
                color="success"
              >
                {" "}
                Location{" "}
              </Badge>
            )}
            {isSmallScreen && (
              <Typography variant="caption">
                <Badge
                  // badgeContent={}
                  color="success"
                >
                  {" "}
                  Location{" "}
                </Badge>
              </Typography>
            )}
          </Button>
          <Button
            startIcon={!isSmallScreen && <AddCircleOutlineIcon />}
            variant="outlined"
            color="primary"
            sx={{ padding: "4.3px", ml: 2 }}
            onClick={(event) => setAnchorElPriceRange(event.currentTarget)}
          >
            {!isSmallScreen && (
              <Badge
                // badgeContent={}
                color="success"
              >
                {" "}
                Funding Status{" "}
              </Badge>
            )}
            {isSmallScreen && (
              <Typography variant="caption">
                <Badge
                  // badgeContent={}
                  color="success"
                >
                  {" "}
                  Funding Status{" "}
                </Badge>
              </Typography>
            )}
          </Button>
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
                {filteredRows.map((match) => {
                  // Convert the last_active string to a Date object
                  const dateObject = new Date(match.date_listed);

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
                      <TableCell>{match.name}</TableCell>
                      <TableCell>{match.location}</TableCell>
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
                      <TableCell>{match.status}</TableCell>
                      <TableCell>{match.sought_amount}</TableCell>
                      <TableCell>{`${date}, ${time}`}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", flexDirection: ["column", "row"], gap: 1 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ padding: "4px" }}
                            onClick={() => setOpen(true)}
                          >
                            View
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ padding: "4px" }}
                            onClick={() => setOpenDetails(true)}
                          >
                            Delete
                          </Button>
                        </Box>
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
          count={matches.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {/* Contact Dialog Box */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="false">
        <DialogContent sx={{ minWidth: "50vw" }}>
          <ContactForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
      {/* Investor Details Dialog Box */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="xl">
        <DialogContent sx={{ minWidth: "60vw" }}>
          <InvestorDetails setOpenDetails={setOpenDetails} />
        </DialogContent>
      </Dialog>
    </>
  );
};
