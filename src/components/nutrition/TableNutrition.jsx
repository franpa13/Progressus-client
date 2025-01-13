import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";


import { useEffect } from "react";
import { ModalEditUserNutri } from "./ModalEditUserNutri";


export const TableNutrition = ({
    arreglo = [],
    arregloColumns = [],

}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const [edit, setEdit] = useState(false)
    const [userToEdit, setUserToEdit] = useState()
    // MUSCULO POR EJERCICIO

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    // const ejerciciosFiltrados = arreglo.filter(
    //   (exercise) => exercise.dia === selectedDay
    // );

    const ejerciciosPaginados = arreglo.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const editUser = (user) => {
        setEdit(true)
        setUserToEdit(user)
    }
    return (
        <>
            <Paper>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {arregloColumns.map((column, index) => {
                                    return (
                                        <TableCell
                                            key={index}
                                            align={
                                                column == "Opciones" ||
                                                    column == "Plan" ||
                                                    column === "Peso"

                                                    ? "right" : "left"

                                            }
                                            sx={{ fontWeight: "bold", fontSize: "16px" }}
                                        >
                                            {column}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <div></div>
                        <TableBody>
                            {/* {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <LoadingSkeleton
                                            width={"100%"}
                                            height={100}
                                            count={5}
                                        ></LoadingSkeleton>
                                    </TableCell>
                                </TableRow>
                            ) : arreglo.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={myplans ? 8 : 6}
                                        sx={{ fontSize: "18px" }}
                                        align="center"
                                    >
                                        {` ${textSinEjercicios}`}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                ejerciciosPaginados.map((exercise, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                            "&:hover": {
                                                backgroundColor: "#E6F7FF",
                                            },
                                        }}
                                    >
                                        <TableCell
                                            sx={{ fontSize: "16px" }}
                                            component="th"
                                            scope="row"
                                        >
                                            Espalda
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="left">
                                            {exercise.nombre}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="left">
                                            {exercise.descripcion}
                                        </TableCell>
                                      
                                  
                                    </TableRow>
                                ))
                            )} */}
                            {ejerciciosPaginados.map((user, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        "&:last-child td, &:last-child th": { border: 0 },
                                        "&:hover": {
                                            backgroundColor: "#E6F7FF",
                                        },
                                    }}
                                >

                                    <TableCell sx={{ fontSize: "16px" }} align="left">
                                        {user.nombre}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "16px" }} align="left">
                                        {user.edad}
                                    </TableCell>

                                    <TableCell sx={{ fontSize: "16px" }} align="left">
                                        {user.objetivo}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "16px" }} align="right">
                                        {user.peso}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "16px" }} align="right">
                                        {user.plan}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "16px" }} align="right">
                                        <div className="flex font-semibold flex-col text-sm gap-2 justify-end ">
                                            <span onClick={() => editUser(user)} className="text-customTextBlue  cursor-pointer">Editar</span>
                                            <span className="cursor-pointer  text-customNavBar ">Crear/Modificar plan</span>

                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
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
            <ModalEditUserNutri open={edit} setOpen={setEdit} elementEditable={userToEdit}></ModalEditUserNutri>
        </>
    );
};
