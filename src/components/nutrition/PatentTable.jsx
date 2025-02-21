import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useEffect } from "react";
import { ModalEditUserNutri } from "./ModalEditUserNutri";
import { ModalEditFood } from "./ModalEditFood";
import { Link } from "react-router-dom";
import { LoadingSkeleton } from "../ui/skeleton/LoadingSkeleton";
import { ModalDeletePatent } from "./ModalDeletePatent";
// TABLA EN PACIENTES Y FOOD
export const PatentTable = ({
    setPatents,
    loading = false,
    arreglo = [],
    arregloColumns = [],
    alimentos = false
}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // PARTE DE PACIENTES
    const [deletePatent, setDeletePatent] = useState(false)
    const [edit, setEdit] = useState(false)
    const [userToEdit, setUserToEdit] = useState()

    // PARTE DE COMIDAS
    const [editFood, setEditFood] = useState(false)
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
        if (alimentos) {
            setEditFood(true)
        } else {

            setEdit(true)
        }
        setUserToEdit(user)
    }
    const deleteUser = (user) => {

        setUserToEdit(user)
        setDeletePatent(true)
    }
    console.log(arreglo , "arreglo");
    
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
                                                    column == "%Grasa" ||
                                                    column == "Plan" ||
                                                    column == "Acciones" ||
                                                    column === "Peso(kg)"

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
                        <TableBody>
                            {loading ? (
                                <TableCell colSpan={6}>
                                    <LoadingSkeleton height={35} width={"100%"} className={"p-3"} count={rowsPerPage} />
                                </TableCell>
                            ) : alimentos ? (
                                ejerciciosPaginados.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                            "&:hover": { backgroundColor: "#E6F7FF" },
                                        }}
                                    >
                                        <TableCell sx={{ fontSize: "16px" }} align="left">
                                            {item.alimento}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="left">
                                            {item.porcion}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="left">
                                            {item.calorias}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="left">
                                            {item.carbohidratos}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="left">
                                            {item.proteinas}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="left">
                                            {item.grasas}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="right">
                                            <span onClick={() => editUser(item)} className="text-customTextBlue cursor-pointer">
                                                Modificar
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                ejerciciosPaginados.map((user, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                            "&:hover": { backgroundColor: "#E6F7FF" },
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
                                            {user.porcentajeDeGrasa}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="right">
                                            {user.peso}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="right">
                                            <div className="flex font-semibold  text-sm gap-3 justify-end  ">
                                                <button onClick={() => deleteUser(user)} className="cursor-pointer  text-red-500 "><DeleteOutlinedIcon></DeleteOutlinedIcon> </button>
                                                <button onClick={() => editUser(user)} className="text-customNavBar  cursor-pointer"> <CreateOutlinedIcon ></CreateOutlinedIcon ></button>

                                            </div>
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
                    count={arreglo.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Filas por página"
                    labelDisplayedRows={() => ""}
                />


            </Paper>
            {/* MODAL PARA  EDITAR PACIENTES */}
            <ModalEditUserNutri setPatents={setPatents} open={edit} setOpen={setEdit} elementEditable={userToEdit}></ModalEditUserNutri>
            {/* MODAL PARA EDITAR ALIMENTO */}
            <ModalEditFood open={editFood} setOpen={setEditFood} elementEditable={userToEdit}></ModalEditFood>

            {/* MODAL PARA ELIMINAR PACIENTE */}
            <ModalDeletePatent setPatents={setPatents} open={deletePatent} setOpen={setDeletePatent} elementEditable={userToEdit}></ModalDeletePatent>
        </>
    );
};
