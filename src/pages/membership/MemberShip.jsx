import { MainLayout } from "../../layout/MainLayout";
import { useLocation } from "react-router-dom";
import { SnackbarDefault } from "../../components";
import { useState } from "react";
import { Title, Location, PricingPrices, Alert } from "../../components";
import { useStoreUserData } from "../../store";
import { Stack } from "@mui/material";
export const MemberShip = () => {
  const [alertPlanElegido, setAlertPlanElegido] = useState(false);
  const [mesaggePlanElegido, setMessagePlanElegido] = useState("");
  const [alertConfirmRequest, setAlertConfirmRequest] = useState(false);
  const [alertCancelPayment, setAlertCancelPayment] = useState(false);
  const [openErrorMemb, setOpenErrorMemb] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [textAlert , setTextAlert] = useState("Usted")
  const dataUser = useStoreUserData((state) => state.userData);
  const roleUser = dataUser.roles[0];
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          {/* HARDCODE */}
          <Location
            route={`Membresía`}
            subroute={roleUser === "ADMIN" ? "" : `Abonar`}
          ></Location>

          <Title
            title={roleUser === "ADMIN" ? "Gestión de membresías" : `Membresía`}
          ></Title>
          {/* ///////////////////////////// */}
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>

        <div className=" mt-2">
          <PricingPrices
          setTextAlert={setTextAlert}
            setOpenErrorMemb={setOpenErrorMemb}
            setAlertError={setAlertError}
            setMesaggePlanElegido={setMessagePlanElegido}
            setAlertConfirmRequest={setAlertConfirmRequest}
            setAlertCancelPayment={setAlertCancelPayment}
            setAlertPlanElegido={setAlertPlanElegido}
          ></PricingPrices>
        </div>
      </section>

      <SnackbarDefault
        open={alertPlanElegido}
        setOpen={setAlertPlanElegido}
        severity="success"
        message={`${mesaggePlanElegido} agregada! `}
        position={{ vertical: "center", horizontal: "center" }}
      ></SnackbarDefault>

      <SnackbarDefault
        open={alertConfirmRequest}
        setOpen={setAlertConfirmRequest}
        severity="success"
        message="¡Pago confirmado!"
        position={{ vertical: "center", horizontal: "center" }}
      ></SnackbarDefault>

      <SnackbarDefault
        position={{ vertical: "center", horizontal: "center" }}
        open={alertCancelPayment}
        setOpen={setAlertCancelPayment}
        message="¡Pago cancelado!"
        severity="info"
      ></SnackbarDefault>

      <SnackbarDefault
        open={alertError}
        setOpen={setAlertError}
        message={"Ha ocurrido un error, inténtelo de nuevo más tarde"}
        severity={"warning"}
        position={{ vertical: "bottom", horizontal: "center" }}
      ></SnackbarDefault>

      <SnackbarDefault
        position={{ vertical: "center", horizontal: "center" }}
        severity={"warning"}
        message={`${textAlert} ya posee membresías activas`}
        open={openErrorMemb}
        setOpen={setOpenErrorMemb}
      ></SnackbarDefault>
    </MainLayout>
  );
};
