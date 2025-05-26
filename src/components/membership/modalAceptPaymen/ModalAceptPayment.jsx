import React, { useState } from "react";
import { ModalLayout } from "../../../layout/ModalLayout";
import { ButtonSpinner } from "../../ui/buttons/ButtonSpinner";
import { FaCheck } from "react-icons/fa6";
import { useGetRequestPaymentSocio } from "../../../service/membership/useGetRequestPaymentSocio";
import { useRegisterPayment } from "../../../service/membership/useRegisterPayment";
export const ModalAceptPayment = ({
  open,
  setOpen,
  setAlertConfirmRequest,
  dataUserBuscado,
  setAlertError,
}) => {
  const [loadingConfirmarPago, setLoadingConfirmarPago] = useState(false);

  //   CONFIRMAR PAGO DEL LADO DE VENTANILLA
  const handleRegisterPayment = async () => {
    setLoadingConfirmarPago(true);
    setAlertConfirmRequest(false);
    try {
      const requestPayment = await useGetRequestPaymentSocio(
        dataUserBuscado.identityUserId
      );


      const registerPayment = await useRegisterPayment(requestPayment?.data.id);



      if (registerPayment && registerPayment.status === 200) {
        setOpen(false);
        setAlertConfirmRequest(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingConfirmarPago(false);
    }
  };

  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <form
        action=""
        className="w-full flex items-center justify-center flex-col gap-1"
      >
        <h1 className="font-semibold text-lg">¿Confirmar pago?</h1>
        <ButtonSpinner
          onClick={handleRegisterPayment}
          Icon={FaCheck}
          className="w-1/3"
          label="Confirmar"
          loading={loadingConfirmarPago}
        ></ButtonSpinner>
      </form>
    </ModalLayout>
  );
};
