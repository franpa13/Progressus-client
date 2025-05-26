import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { LoadingSkeleton } from "../ui/skeleton/LoadingSkeleton";

export const TableContability = ({ data, columns, loading, setTotal }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Sumar el precio de todas las membresías
  const totalPrice = data.reduce((acc, row) => {
    return acc + (row.precioMembresia || 0);
  }, 0);

  // Pasar el totalPrice al estado setTotal
  useEffect(() => {
    setTotal(totalPrice);
  }, [data, setTotal, totalPrice]);

  return (
    <div className="w-full ">
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={
                      column === "Nombre" || column === "Fecha"
                        ? "left"
                        : "center"
                    }
                    sx={{ fontWeight: "bold" }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableCell colSpan={4}>
                  <LoadingSkeleton
                    height={35}
                    width={"100%"}
                    className={"p-3"}
                    count={5}
                  ></LoadingSkeleton>
                </TableCell>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    sx={{ fontSize: "18px" }}
                    align="center"
                    colSpan={4}
                  >
                    No se encontraron pagos este mes.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      {row.nombre} {row.apellido}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      {new Date(row.fechaPago).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="center">
                      {row?.nombreMembresia && row.nombreMembresia}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="center">
                      ${row?.precioMembresia && row.precioMembresia}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[3, 5, 10]}
            component="div"
            count={data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página"
            labelDisplayedRows={() => ""}
        />
      </Paper>
      {/* Mostrar el total calculado */}
      {!loading && (
        <div className="mt-2 text-lg md:text-xl mr-3 p-3 text-center md:text-right font-bold">
          <span>Total: ${totalPrice.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};
