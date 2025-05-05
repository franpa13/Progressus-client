import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import SpellcheckOutlinedIcon from "@mui/icons-material/SpellcheckOutlined";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import dayjs from "dayjs";

export const TableAsist = ({ data, columns }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

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
  console.log(data, "date");
  return (
    <div className="w-full md:w-1/2 border">
      <Paper>
        <TableContainer>
          {data.length === 0 ? ( // Condición para mostrar un mensaje si no hay datos
            <div className="p-4 text-center text-gray-500">
              No se encontraron asistencias registradas.
            </div>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell
                        key={index}
                        align={column === "Fecha" ? "left" : "right"}
                        sx={{ fontWeight: "bold" }}
                      >
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: "16px" }} align="left">
                        {dayjs(row?.fechaAsistencia).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell sx={{ fontSize: "16px" }} align="right">
                        {dayjs(row?.fechaAsistencia).subtract(3, "hour").format("HH:mm")}
                      </TableCell>

                      <TableCell sx={{ fontSize: "16px" }} align="right">
                        <SpellcheckOutlinedIcon sx={{ color: "#1890FF", fontWeight: "bold" }} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Filas por página"
                labelDisplayedRows={() => ""}
              />
            </>
          )}
        </TableContainer>
      </Paper>
    </div>
  );
};
