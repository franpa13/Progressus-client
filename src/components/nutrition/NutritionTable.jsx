import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { ModalAsignPlan } from "./ModalAsignPlan";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useEditPlan, useStoreNutrition, useStorePlanForView } from "../../store/useStoreNutrition";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useEffect } from "react";

import { Link } from "react-router-dom";
import { LoadingSkeleton } from "../ui/skeleton/LoadingSkeleton";
import { ModalDeletePlan } from "./ModalDeletePlan";


export const NutritionTable = ({
    arreglo = [],
    arregloColumns = [],
    loading, setAlertAsignedPlan ,
    setPlans
}) => {
    const cargarPlanEditado = useEditPlan((state) => state.cargarPlanParaEditar);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const setNombre = useStoreNutrition(state => state.setNombre);
    const [deletePlan, setDeletePlan] = useState(false)
    const [planAsign, setPlanAsign] = useState(null)
    const setPlanForView = useStorePlanForView((state) => state.setPlanForView);
    const setIsEditable = useStorePlanForView((state) => state.setIsEditable);
    const [asign, setAsign] = useState(false)

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
    const handleClick = (plan, edit) => {


        setNombre(null)
        setPlanForView(plan)
        // para ver si se puede editar o no el plan
        if (edit) {
            setIsEditable(true)
            cargarPlanEditado(plan)
        } else {

            setIsEditable(false)
        }
    }
    const handleClickAsign = (plan) => {
        setAsign(true)
        setPlanAsign(plan)
    }
    const handleDelete = (plan) => {
        setPlanAsign(plan)
        setDeletePlan(true)
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
                                                    column === "Peso(kg)" || column == "Acciones"

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


                        {loading ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <LoadingSkeleton
                                            width={"100%"}
                                            height={40}
                                            count={10}
                                        ></LoadingSkeleton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>) : arreglo.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={2}
                                        sx={{ fontSize: "18px" }}
                                        align="center"
                                    >
                                        {` No se encontraron planes`}
                                    </TableCell>
                                </TableRow>)}
                        {/* {loading ? (
                                 <TableBody>
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
                        <TableBody>
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




                                    <TableCell sx={{ fontSize: "16px" }} align="right">
                                        <div className="flex font-semibold  text-sm gap-3 justify-end  ">
                                            <Link to={"/plansnutrition/createplannutrition"} onClick={() => handleClick(user, false)} className="text-customTextBlue  cursor-pointer"> <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon></Link>
                                            <Link to={"/plansnutrition/editPlan"} onClick={() => handleClick(user, true)} className="cursor-pointer  text-customNavBar "><CreateOutlinedIcon></CreateOutlinedIcon> </Link>
                                            <div
                                                onClick={() => handleClickAsign(user)}
                                                className="text-black underline cursor-pointer"
                                            >
                                                Asignar
                                            </div>
                                            <div onClick={() => handleDelete(user)} className="text-red-600  cursor-pointer"> <DeleteOutlineIcon></DeleteOutlineIcon> </div>
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

            {/* MODAL PARA  ASIGNAR PLAN PACIENTES */}
            < ModalAsignPlan setAlertAsignedPlan={setAlertAsignedPlan} open={asign} plan={planAsign} setOpen={setAsign}></ ModalAsignPlan>
            <ModalDeletePlan setPlans={setPlans} plan={planAsign} open={deletePlan} setOpen={setDeletePlan}></ModalDeletePlan>
        </>
    );
};
