import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { ModalDeleteItem } from "./ModalDeleteItem";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useGetExerciseById } from "../../service/plans/useGetExerciseById";
import { useSpinnerStore } from "../../store";
import { Dialog } from "@mui/material";
import { CgGym } from "react-icons/cg";
import { SiTruenas } from "react-icons/si";
import { ModalEditModalGroupMuscle } from "./ModalEditModalGroupMuscle";
import { LoadingSkeleton } from "../ui/skeleton/LoadingSkeleton";
import { ModalEditMuscle } from "./ModalEditMuscle";
import { ModalEditExercise } from "./ModalEditExercise";
export const TableExercices = ({
  selectNav,
  arreglo = [],
  arregloColumns = [],
  setOpenAlertEditGroup,
  loading = false,
  textSinEjercicios = "no se encontraron ejercicios",
  setGroupMuscles,
  setOpenAlertEditMuscle,
  setMuscles,
  gruposMusculares,
  muscles,
  setAlertExerciseEdit,
  setExercices
}) => {

  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
  // DIALOG DE INFO
  const [openVideo, setOpenVideo] = useState(false);
  const [exercise, setExercise] = useState();
  const [videoUrl, setVideoUrl] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const [itemEditable, setEditableItem] = useState();

  const [openDeleteItem, setOpenDeleteItem] = useState(false);
  const [openEditModalGroup, setOpenEditModalGroup] = useState(false);
  const [openEditMuscle, setOpenEditMuscle] = useState(false);
  const [openEditExercise, setOpenEditExercise] = useState(false);
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
  // ABRIR Y CERRAR VIDEO DE YT
  const handleOpen = async (link, ejercicio) => {
    showSpinner();
    console.log(ejercicio, "ejercoicocp");

    try {
      const resp = await useGetExerciseById(ejercicio.id);
      setExercise(resp.data);
    } catch (e) {
      console.log(e, "errores");
    } finally {
      setOpenVideo(true);
      setVideoUrl(link);
      hideSpinner();
    }
  };
  const handleClose = () => {
    setOpenVideo(false);
    setVideoUrl("");
  };
  const musclesPractique = [
    "Biceps",
    "Triceps",
    "Gluteos",
    "Aductores",
    "Hombro posterior",
  ];

  const edit = (item) => {
    setEditableItem(item);
    if (selectNav == "Grupo muscular") {
      setOpenEditModalGroup(true);
    } else if (selectNav == "Musculo") {
      setOpenEditMuscle(true);
    } else {
      setOpenEditExercise(true);
    }
  };
  const deleteItemm = (item) => {
    setOpenDeleteItem(true);
    setEditableItem(item);
  };

  return (
    <div className="w-full">
      <Paper>
        <TableContainer sx={{}}>
          <Table
            sx={{
              tableLayout: {
                xs: "auto",
                md: "fixed",
              },
              width: "100%", // Asegúrate de que la tabla ocupe todo el ancho
            }}
          >
            <TableHead>
              <TableRow>
                {arregloColumns?.map((column, index) => (
                  <TableCell
                    key={index}
                    align={
                      [
                        "Músculos por ejercicio",
                        "Acciones",
                        "Músculos del grupo",
                        "Imagen",
                        "Grupo muscular",
                      ].includes(column)
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={arregloColumns?.length} align="center">
                    <LoadingSkeleton
                      width={"100%"}
                      height={50}
                      count={5}
                    ></LoadingSkeleton>
                  </TableCell>
                </TableRow>
              ) : ejerciciosPaginados?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={arregloColumns?.length}
                    align="center"
                    sx={{ fontSize: "18px" }}
                  >
                    {textSinEjercicios}
                  </TableCell>
                </TableRow>
              ) : (
                ejerciciosPaginados?.map((exercise, index) =>
                  selectNav === "Grupo muscular" ? (
                    // GRUPO MUSCULAR
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
                        {exercise.nombre}
                      </TableCell>
                      <TableCell sx={{ fontSize: "16px" }} align="left">
                        {exercise.descripcion}
                      </TableCell>
                      <TableCell sx={{ fontSize: "16px" }} align="center">
                        <ul>
                          {exercise?.musculosDelGrupo?.map((musculo, idx) => (
                            <li
                              className="list-none "
                              key={idx}
                              style={{ marginLeft: "16px" }}
                            >
                              {musculo.nombre}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell sx={{ fontSize: "16px" }} align="center">
                        <div className="flex justify-center">
                          <img
                            className="w-1/2 md:w-1/3"
                            src={exercise.imagenGrupoMuscular}
                            alt="img grupo muscular"
                          />
                        </div>
                      </TableCell>
                      <TableCell sx={{ fontSize: "16px" }} align="center">
                        <div className="flex justify-center gap-3">
                          <div
                            onClick={() => edit(exercise)}
                            className="p-[2px] bg-customButtonGreen hover:bg-green-700 rounded cursor-pointer"
                          >
                            <MdOutlineEdit className="text-white text-xl" />
                          </div>
                          <div
                            onClick={() => deleteItemm(exercise)}
                            className="p-[2px] bg-red-600 hover:bg-red-800 rounded cursor-pointer"
                          >
                            <MdDeleteOutline className="text-white text-xl" />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : /////////////////////////////////////////////
                  selectNav === "Ejercicio" ? (
                    // EJERCICIOS
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
                        {exercise.nombre}
                      </TableCell>
                      <TableCell sx={{ fontSize: "16px" }} align="left">
                        {exercise.descripcion}
                      </TableCell>
                      <TableCell sx={{ fontSize: "16px" }} align="center">
                        <ul>
                          {exercise.musculosDeEjercicio.map((musculo, idx) => (
                            <li
                              className="list-none "
                              key={idx}
                              style={{ marginLeft: "16px" }}
                            >
                              {musculo?.musculo?.nombre}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell sx={{ fontSize: "16px" }} align="center">
                        <div className="flex justify-center items-center gap-3">
                          <span
                            onClick={() => edit(exercise)}
                            className="p-[2px] w-full md:w-1/12 h-full flex justify-center items-center bg-customButtonGreen hover:bg-green-800 rounded  cursor-pointer"
                          >
                            <MdOutlineEdit className="text-white text-2xl"></MdOutlineEdit>
                          </span>
                          <span
                            onClick={() => deleteItemm(exercise)}
                            className="p-[2px] w-full md:w-1/12 h-full flex justify-center items-center bg-red-600  hover:bg-red-800 rounded  cursor-pointer"
                          >
                            <MdDeleteOutline className="text-white text-2xl"></MdDeleteOutline>
                          </span>
                          <span
                            onClick={() => {
                              handleOpen(
                                "https://www.youtube.com/watch?v=rT7DgCr-3pg",
                                exercise
                              );
                            }}
                            className={`p-[2px] w-full md:w-1/12 h-full flex justify-center items-center bg-gray-700  hover:bg-gray-800 rounded  cursor-pointer `}
                          >
                            <IoInformationCircleOutline className="text-2xl text-white font-semibold"></IoInformationCircleOutline>
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    ////////////////////////////////////////////
                    // MUSCULOS
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
                        {exercise.nombre}
                      </TableCell>
                      <TableCell sx={{ fontSize: "16px" }} align="left">
                        {exercise.descripcion}
                      </TableCell>
                      <TableCell sx={{ fontSize: "16px" }} align="center">
                        {exercise.grupoMuscular.nombre}
                      </TableCell>
                      <TableCell sx={{ fontSize: "16px" }} align="center">
                        <div className="flex justify-center">
                          <img
                            className="w-1/2 md:w-1/2"
                            src={exercise.imagenMusculo}
                            alt="img musxulo"
                          />
                        </div>
                      </TableCell>
                      <TableCell sx={{ fontSize: "16px" }} align="center">
                        <div className="flex justify-center gap-3">
                          <div
                            onClick={() => edit(exercise)}
                            className="p-[2px] bg-customButtonGreen hover:bg-green-700 rounded cursor-pointer"
                          >
                            <MdOutlineEdit className="text-white text-xl" />
                          </div>
                          <div
                            onClick={() => deleteItemm(exercise)}
                            className="p-[2px] bg-red-600 hover:bg-red-800 rounded cursor-pointer"
                          >
                            <MdDeleteOutline className="text-white text-xl" />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10]}
          component="div"
          count={arreglo?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={() => ""}
        />
      </Paper>
      <Dialog open={openVideo} onClose={handleClose} fullWidth maxWidth="md">
        <div className="bg-customGreenLigth">
          <div className="flex items-center gap-3 p-2 md:px-4 md:py-3">
            <CgGym className="text-2xl md:text-3xl"></CgGym>
            <h2 className="text-lg md:text-xl font-semibold">
              {exercise?.nombre}{" "}
            </h2>
          </div>

          {exercise?.videoEjercicio ? (
            <div className="md:h-[400px] h-72 px-3 md:pb-4 pb-3 md:px-4">
              <iframe
                width="100%"
                className="w-full h-full"
                src={exercise?.videoEjercicio.replace("watch?v=", "embed/")}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onError={(e) => setVideoError(true)} // Captura el error si el video falla
              ></iframe>
            </div>
          ) : (
            <div className="flex items-center justify-center h-72 md:h-[400px] bg-gray-200 text-red-600 font-bold">
              No se pudo cargar el video. Por favor, verifica el enlace o intenta más tarde.
            </div>
          )}

          <div className="flex flex-col justify-center gap-2 items-center mb-2 px-3 md:px-4">
            <h2 className="text-lg text-start w-full md:text-xl font-semibold">
              {exercise?.descripcion}{" "}
            </h2>

            <div className="flex justify-between w-full md:mt-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 mb-4 md:text-xl justify-center font-semibold text-customTextBlue w-1/2">
                <h2 className="text-black underline font-semibold col-span-full">
                  Músculos involucrados
                </h2>
                {exercise?.musculosDeEjercicio?.length > 0 ? (
                  exercise.musculosDeEjercicio?.map((muscle, index) => (
                    <li key={index}>-{muscle.musculo.nombre}</li>
                  ))
                ) : (
                  <>
                    {/* <li>-Gemelos</li>
                    <li>-Cuádriceps</li>
                    <li>-Femorales</li>
                    <li>-Bíceps</li>
                    <li>-Tríceps</li>
                    <li>-Pectorales</li>
                    <li>-Dorsales</li> */}
                    <li>-No se encontraron musculos en el ejercicio.</li>
                  </>
                )}
              </ul>

              <div className="flex w-1/2 justify-center">
                <img
                  className="w-2/3 object-contain rounded"
                  src={`${
                    exercise?.imagenMaquina?.length > 0
                      ? exercise.imagenMaquina
                      : "/progressus.png"
                  }`}
                  alt={`Maquina para ${exercise?.nombre}`}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      ;{/* EDITAR GRUPO MUSCAULAR */}
      <ModalEditModalGroupMuscle
        setOpenAlertEditGroup={setOpenAlertEditGroup}
        setGroupMuscles={setGroupMuscles}
        open={openEditModalGroup}
        itemEditable={itemEditable}
        setOpen={setOpenEditModalGroup}
      ></ModalEditModalGroupMuscle>
      {/* ELIMINAR ITEM */}
      <ModalDeleteItem
        setExercices={setExercices}
        selectNav={selectNav}
        setGroupMuscles={setGroupMuscles}
        elementEditable={itemEditable}
        open={openDeleteItem}
        setOpen={setOpenDeleteItem}
        setMuscles={setMuscles}
      ></ModalDeleteItem>
      {/* EDITAR MUSCULO */}
      <ModalEditMuscle
        setOpenAlertEditMuscle={setOpenAlertEditMuscle}
        gruposMusculares={gruposMusculares}
        itemEditable={itemEditable}
        open={openEditMuscle}
        setMuscles={setMuscles}
        setOpen={setOpenEditMuscle}
      ></ModalEditMuscle>
      {/* MODAL EDIT EJERCICIOS */}
      <ModalEditExercise
        setAlertExerciseEdit={setAlertExerciseEdit}
        setExercices={setExercices}
        itemEditable={itemEditable}
        muscles={muscles}
        open={openEditExercise}
        setOpen={setOpenEditExercise}
      ></ModalEditExercise>
    </div>
  );
};
