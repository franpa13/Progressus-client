import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { MainLayout } from "../../layout/MainLayout";
import { SnackbarDefault } from "../../components";
import { useSpinnerStore } from "../../store";
import { useSendAsist } from "../../service/users/useSendAsist";

export const CodeScanner = () => {
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
  const [result, setResult] = useState(null);
  const [scanLog, setScanLog] = useState([]);
  const [confirmAsist, setConfirmAsist] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const sendAsistencia = async (idUser) => {
    showSpinner();

    try {
      const responseSendAsist = await useSendAsist(
        idUser
      );
      
      
      if (responseSendAsist && responseSendAsist.status === 200) {
        setAlertSuccess(true);

      } else {
        // Si no tiene turno, mostrar el modal
        setAlertError(true);

      }
    } catch (e) {
      console.log(e, "errorrrrs");
    } finally {
      hideSpinner()
    }
  };

  const handleScan = (data) => {
    console.log("QR Escaneado:", data[0].rawValue
    ); // Log en la consola
    sendAsistencia(data[0].rawValue)

  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
        <div className="w-[400px] h-[400px] md:w-[800px] md:h-[800px] border border-gray-300 rounded-lg overflow-hidden">
          <Scanner
            onScan={handleScan}
            onError={(error) => console.error("Error del scanner:", error)}
          />
        </div>

        {/* Resultado del último scan */}
        {result && (
          <div className="mt-4 p-4 bg-white shadow rounded w-full max-w-md">
            <p className="text-lg font-semibold">Último código escaneado:</p>
            <p className="text-blue-500 break-all">{result}</p>
          </div>
        )}

        {/* Historial de scans (log) */}
        {scanLog.length > 0 && (
          <div className="mt-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2">Historial de Scans:</h2>
            <div className="bg-white p-4 rounded shadow max-h-60 overflow-y-auto">
              {scanLog.map((scan, index) => (
                <div key={index} className="mb-2 pb-2 border-b border-gray-100">
                  <p className="text-sm text-gray-500">{scan.timestamp}</p>
                  <p className="break-all">{scan.data}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* ALERT ERRORR!! CONFIRMAR ASISTENCIA */}
      <SnackbarDefault
        message={
          "No se encontró ninguna reserva válida para este usuario en el horario actual."
        }
        open={alertError}
        setOpen={setAlertError}
        severity={"warning"}
      ></SnackbarDefault>

      {/* ALERT success CONFIRMAR ASISTENCIA */}
      <SnackbarDefault
        message={"¡Asistencia confirmada correctamente!"}
        open={alertSuccess}
        setOpen={setAlertSuccess}
        severity={"success"}
      ></SnackbarDefault>
    </MainLayout>
  );
};