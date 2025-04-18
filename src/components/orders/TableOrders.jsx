import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { ModalEditState } from "./ModalEditState";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";


import { useEffect } from "react";
import { ModalViewPedidos } from "./ModalViewPedidos";


export const TableOrders = ({
    arreglo = [],
    arregloColumns = [],
    onUpdate
}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [open, setOpen] = useState(false)
    const [pedido, setPedido] = useState({})
    const [openModalView, setOpenModalView] = useState(false)
    const [price, setPrice] = useState(0)
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
    const ordenadoPorFechaReciente = [...arreglo].sort((a, b) => {
        const [diaA, mesA, anioA] = a.fecha.split('/').map(Number);
        const [diaB, mesB, anioB] = b.fecha.split('/').map(Number);

        const fechaA = new Date(anioA, mesA - 1, diaA);
        const fechaB = new Date(anioB, mesB - 1, diaB);

        return fechaB - fechaA;
    });


    const ejerciciosPaginados = ordenadoPorFechaReciente?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    const modal = (user, name) => {

        setPrice(user?.precio)

        if (name == "edit") {
            setPedido(user)
            setOpen(true)

        } else {
            setOpenModalView(true)
            setPedido(user.carrito)
        }
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
                                                    column == "Precio" ||
                                                    column === "Estado del pago"

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
                            {ejerciciosPaginados?.map((user, index) => (
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
                                        #{user.id.substring(0, 8)}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "16px" }} align="left">
                                        {user.fecha}
                                    </TableCell>

                                    <TableCell sx={{ fontSize: "16px" }} align="left">
                                        {user.nombreCliente}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "16px" }} align="right">
                                        {user.precio}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "16px" }} align="right">
                                        {user.estado}
                                    </TableCell>

                                    <TableCell sx={{ fontSize: "16px" }} align="right">
                                        <div className="flex font-semibold flex-col text-sm gap-2 justify-end ">
                                            <span onClick={() => modal(user, "edit")} className="text-customTextBlue  cursor-pointer">Editar</span>
                                            <span onClick={() => modal(user, "view")} className="text-customTextGreen cursor-pointer"> Ver Productos</span>

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
            <ModalEditState onUpdate={onUpdate} dataPedido={pedido} open={open} setOpen={setOpen}></ModalEditState>
            <ModalViewPedidos dataPedido={pedido} open={openModalView} total={price} setOpen={setOpenModalView}></ModalViewPedidos>
        </>
    );
};