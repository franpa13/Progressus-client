import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { LoadingSkeleton } from "../ui/skeleton/LoadingSkeleton";
import dayjs from "dayjs";

export const TableMetrics = ({ loading, arreglo, arregloColumns }) => {
  console.log(arreglo);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = arreglo.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {arregloColumns.map((column, index) => (
                <TableCell
                  key={index}
                  align={`${column === "Altura" || column === "Grasa (%)" ? "center" : "left"}`}
                  sx={{ fontWeight: "bold", fontSize: "16px" }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={arregloColumns.length} align="center">
                  <LoadingSkeleton width={"100%"} height={55} count={10} />
                </TableCell>
              </TableRow>
            ) : arreglo.length === 0 ? (
              <TableRow>
                <TableCell colSpan={arregloColumns.length} align="center">
                  No hay datos disponibles.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => {
                const formattedDate = dayjs(row.fecha).format("YYYY-M-D"); // Se declara la variable antes del JSX

                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": { backgroundColor: "#E6F7FF" },
                    }}
                  >
                    <TableCell align="left" sx={{ fontSize: "16px" }}>
                      {formattedDate}{" "}
                      {/* Aquí se usa la variable formattedDate */}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: "16px" }}>
                      {row.peso}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "16px" }}>
                      {row.altura}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "16px" }}>
                      {row.porcentajeDeGrasa}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={arreglo.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={() => ""}
      />
    </Paper>
  );
};
