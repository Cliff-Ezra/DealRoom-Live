import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

const columns = [
  { id: "name", label: "Users", minWidth: 150, align: "left" },
  { id: "email", label: "Email", minWidth: 150, align: "left" },
  { id: "title", label: "Title of Inquiry", minWidth: 150, align: "left" },
  { id: "date_of_inquiry", label: "Date of Inquiry", minWidth: 150, align: "left" },
  { id: "location", label: "Location", minWidth: 150, align: "left" },
  { id: "action", label: "Action", minWidth: 100, align: "left" },
];

export const OverviewRecentMessages = (props) => {
  const { inquiries = [], sx } = props;
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filteredRows, setFilteredRows] = useState(inquiries);
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

  // Handle edit action
  const handleEdit = () => {
    console.log("Edit row", selectedRow);
    handleMenuClose();
  };

  // Handle view action
  const handleView = () => {
    router.push("/properties/" + selectedRow.id + "/view");
    handleMenuClose();
  };

  // !Search Function
  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue === "") {
      setFilteredRows(
        inquiries.slice().sort((a, b) => {
          if (a.id < b.id) return 1;
          if (a.id > b.id) return -1;
          return 0;
        })
      );
    } else {
      setFilteredRows(
        inquiries.filter((row) =>
          columns.some((column) => {
            if (column.id === "action" || row[column.id] === undefined) return false;
            const cellValue = row[column.id].toString().toLowerCase();
            return cellValue.includes(searchValue);
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
        inquiries.slice().sort((a, b) => {
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
    <Card sx={sx}>
      <CardHeader title="Recent Inquiries & Feedback" />
      <Scrollbar sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Box>
          <Table>
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
              {inquiries.map((inquiry) => {
                const dateObject = new Date(inquiry.date_of_inquiry);
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
                    <TableCell>{inquiry.title}</TableCell>
                    <TableCell>{`${date} ${time}`}</TableCell>
                    <TableCell>{inquiry.location}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", flexDirection: ["column", "row"], gap: 1 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ padding: "4px" }}
                          onClick={() => setOpenDetails(true)}
                        >
                          View More
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
        count={inquiries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

OverviewRecentMessages.prototype = {
  inquiries: PropTypes.array,
  sx: PropTypes.object,
};
