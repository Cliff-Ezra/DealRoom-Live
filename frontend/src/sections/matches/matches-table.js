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
} from "@mui/material";
// Icon imports
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
// Local imports
import { Scrollbar } from "src/components/scrollbar";
import { ContactForm } from "src/dynamic/matches/contact-form";
import { InvestorDetails } from "src/dynamic/matches/investor-details";

const columns = [
  { id: "name", label: "Investor\u00a0Name", minWidth: 150, align: "left" },
  { id: "location", label: "Location", minWidth: 150, align: "left" },
  { id: "range", label: "Investment\u00a0Range", minWidth: 150, align: "left" },
  { id: "interest", label: "Investment\u00a0Area", minWidth: 150, align: "left" },
  { id: "strength", label: "Match\u00a0Strength", minWidth: 150, align: "left" },
  { id: "Actions", label: "Actions", minWidth: 100, align: "left" },
];

export const MatchesTable = ({ matches }) => {
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
          placeholder="Search for Investor"
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
          <Button startIcon={<AddCircleOutlineIcon />} variant="outlined" color="primary">
            Location
          </Button>
          <Button
            startIcon={<AddCircleOutlineIcon />}
            variant="outlined"
            color="primary"
            style={{ marginLeft: "10px" }}
          >
            Strength
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
                {filteredRows.map((match) => (
                  <TableRow hover type="checkbox" tabIndex={-1} key={match.id}>
                    <TableCell>{match.name}</TableCell>
                    <TableCell>{match.location}</TableCell>
                    <TableCell>{match.range}</TableCell>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: 200,
                      }}
                    >
                      {match.interest}
                    </TableCell>
                    <TableCell>{match.strength}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", flexDirection: ["column", "row"], gap: 1 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ padding: "4px" }}
                          onClick={() => setOpen(true)}
                        >
                          Contact
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ padding: "4px" }}
                          onClick={() => setOpenDetails(true)}
                        >
                          More Info
                        </Button>
                      </Box>
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
