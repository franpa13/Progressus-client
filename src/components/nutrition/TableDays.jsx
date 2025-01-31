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
import { MdOutlineDeleteOutline } from "react-icons/md";

import { useEffect } from "react";
import { useCrearPlan, useEditPlan, useStorePlanForView } from "../../store/useStoreNutrition";


export const TableDays = ({
    editable,
    tipoComida,
    day,
    arreglo = [],
    arregloColumns = [],

}) => {
    console.log(tipoComida, "tipocomida");
    
    const eliminarAlimento = useCrearPlan((state) => state.eliminarAlimento);
    const isEditable = useStorePlanForView((state) => state.isEditable);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const eliminarEditable = useEditPlan((state) => state.eliminarAlimentoEnPlanEditado);

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
    const deleteFood = (comida) => {
        if (editable) {
            console.log(comida , "comida");
            
            eliminarEditable(day, tipoComida, comida.alimentoId            );
            console.log("entr aqui");

        }
        eliminarAlimento(day, tipoComida, comida.alimentoId);

    }

    return (
        <>
            <Paper>
                <TableContainer>
                    <Table sx={{ minWidth: { xl: 1200 } }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {arregloColumns.map((column, index) => {
                                    return (
                                        <TableCell
                                            key={index}
                                            align={
                                                column == "Cantidad" ||
                                                    column == "Medida" ||
                                                    column === "Peso"

                                                    ? "center" : "left"

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
                                        {user.alimentoNombre}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "16px" }} align="center">
                                        {user.cantidad}
                                    </TableCell>

                                    <TableCell sx={{ fontSize: "16px" }} align="center">
                                        {user.medida}
                                    </TableCell>
                                    {isEditable && (

                                        <TableCell sx={{ fontSize: "16px" }} align="right">
                                            <div className="flex font-semibold flex-col text-sm gap-2 items-end justify-end ">
                                                <span onClick={() => deleteFood(user )} className="text-red-600 text-xl  md:text-2xl cursor-pointer"><MdOutlineDeleteOutline></MdOutlineDeleteOutline> </span>


                                            </div>
                                        </TableCell>
                                    )}
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


        </>
    );
};