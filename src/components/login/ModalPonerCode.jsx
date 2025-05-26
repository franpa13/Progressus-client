import React, { useState, useEffect } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { Title } from "../ui/title/Title";
import ConfirmCode from "../auth/confirmCode/ConfirmCode";
import { recuperarVerificarCodigoValidacion } from "../../service/auth/use-RecuperarVerificarCodigoValidacion";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { ErrorAuth } from "../ui/errorAuth/ErrorAuth";
import { ModalChangePassword } from "./ModalChangePassword";
import { RiLockPasswordLine } from "react-icons/ri";
export const ModalPonerCode = ({setOpenCorreo , open, setOpen, email }) => {
  const [code, setCode] = useState(Array(4).fill(""));
  const [loading, setLoading] = useState(false);
  const [sendCodeSuccess, setSendCodeSuccess] = useState(false);
  const [sendCodeFailed, setSendCodeFailed] = useState(false);

  const [tokenResponse, setTokenResponse] = useState("");
  const sendCode = async () => {
    const codeString = code.join("");
    setLoading(true);
    try {
      const response = await recuperarVerificarCodigoValidacion(
        email,
        codeString
      );
      

      if (response && response.status == 200) {
        
        setSendCodeSuccess(true);
        setTokenResponse(response.data.token);
      } else {
        setSendCodeFailed(true);
      }
    } catch (e) {
      console.log(e, "errores");
    } finally {
      setLoading(false);
    }
  };
  return (
    <ModalLayout Icon={RiLockPasswordLine} open={open} setOpen={setOpen}>
      <div className="flex flex-col justify-center items-center mr-2 md:mr-3">
        <Title
          className={"text-medium md:text-lg"}
          title={"Ingrese el código que enviamos a su email."}
        ></Title>
        <ConfirmCode code={code} setCode={setCode}></ConfirmCode>
        <ButtonSpinner
          onClick={sendCode}
          loading={loading}
          label="Enviar código"
        ></ButtonSpinner>
        {sendCodeFailed && (
          <ErrorAuth
            messageError={"Código inválido !"}
            className="flex justify-center items-center"
          ></ErrorAuth>
        )}
        <ModalChangePassword
        setOpenCorreo = {setOpenCorreo}
         setOpenPonerCode = {setOpen}
          open={sendCodeSuccess}
          setOpen={setSendCodeSuccess}
          email={email}
          token={tokenResponse}
        ></ModalChangePassword>
      </div>
    </ModalLayout>
  );
};
