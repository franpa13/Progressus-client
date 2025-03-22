import * as React from "react";
import { useState, useEffect } from "react"; // Asegúrate de importar useEffect
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useCrearPlan, useEditPlan, useStorePlanForView } from "../../store/useStoreNutrition";
import { useFoodById } from "../../service/nutrition/useFoodById";
import { useSpinnerStore } from '../../store';
export const TableDays = ({
    openAdd,
    editable,
    tipoComida,
    day,
    arreglo = [],
    arregloColumns = [],
}) => {
    const [foodData, setFoodData] = useState([]); // Estado para almacenar los datos de los alimentos
    const eliminarAlimento = useCrearPlan((state) => state.eliminarAlimento);
    const isEditable = useStorePlanForView((state) => state.isEditable);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const eliminarEditable = useEditPlan((state) => state.eliminarAlimentoEnPlanEditado);
    const showSpinner = useSpinnerStore((state) => state.showSpinner);
    const hideSpinner = useSpinnerStore((state) => state.hideSpinner);

    useEffect(() => {
        showSpinner();
        const fetchFoodData = async () => {
            try {

                const data = await Promise.all(
                    arreglo.map(async (food) => {
                        const response = await useFoodById(food.alimentoId);
                        return response.data

                    })
                );
                setFoodData(data);
            } catch (error) {
                console.log(error);

            } finally {
                hideSpinner();
            }
        };

        fetchFoodData();
    }, [arreglo, openAdd]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const ejerciciosPaginados = arreglo.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const deleteFood = (comida) => {
        if (editable) {
            eliminarEditable(day, tipoComida, comida.alimentoId);
        }
        eliminarAlimento(day, tipoComida, comida.alimentoId);
    };

    return (
        <>
            <Paper>
                <TableContainer>
                    <Table sx={{ minWidth: { xl: 1500 } }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {arregloColumns.map((column, index) => (
                                    <TableCell
                                        key={index}
                                        align={

                                            column == "Porcion(gr)" ||
                                                column === "Kcal" || column === "Grasas" || column === "Carbohidratos" || column === "Proteinas"
                                                ? "center"
                                                : "left"
                                        }
                                        sx={{ fontWeight: "bold", fontSize: "16px" }}
                                    >
                                        {column}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ejerciciosPaginados.map((user, index) => {
                                // Buscar el alimento correspondiente en foodData
                                const alimento = foodData.find(
                                    (food) => food.id === user.alimentoId
                                );

                                return (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                            "&:hover": {
                                                backgroundColor: "#E4F5D0",
                                            },
                                        }}
                                    >
                                        <TableCell sx={{ fontSize: "16px" }} align="left">
                                            {alimento ? alimento.nombre : <h1 className="text-lg font-bold ">
                                                ...
                                            </h1>}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="left">
                                            <span className="w-full text-center ml-6">

                                                {user.cantidad}
                                            </span>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="center">
                                            {alimento ? alimento.porcion : <h1 className="text-lg font-bold">
                                                ...
                                            </h1>}
                                        </TableCell>
                                        {/* <TableCell sx={{ fontSize: "16px" }} align="center">
                                            {alimento ? alimento.calorias : <h1  className="text-lg font-bold">
                                                ...
                                            </h1> }
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="center">
                                            {alimento ? alimento.grasas :  <h1  className="text-lg font-bold">
                                                ...
                                            </h1> }
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="center">
                                            {alimento ? alimento.carbohidratos :  <h1  className="text-lg font-bold">
                                                ...
                                            </h1> }
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="center">
                                            {alimento ? alimento.proteinas : <h1 className="text-lg font-bold">
                                                ...
                                            </h1> }
                                        </TableCell> */}
                                        {isEditable && (
                                            <TableCell sx={{ fontSize: "16px" }} align="right">
                                                <div className="flex font-semibold flex-col text-sm gap-2 items-end justify-end ">
                                                    <span
                                                        onClick={() => deleteFood(user)}
                                                        className="text-red-600 text-xl  md:text-2xl cursor-pointer"
                                                    >
                                                        <MdOutlineDeleteOutline />
                                                    </span>
                                                </div>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
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