import React, { useState, useEffect } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { Title } from "../ui/title/Title";
import ConfirmCode from "../auth/confirmCode/ConfirmCode";
import { recuperarVerificarCodigoValidacion } from "../../service/auth/use-RecuperarVerificarCodigoValidacion";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { ErrorAuth } from "../ui/errorAuth/ErrorAuth";
import { CustomInput } from "../ui/input/CustomInput";
import { useEditPassword } from "../../service/auth/use-EditPassword";
import { useAlertStore } from "../../store/useAlertChangePassword";
import { RiLockPasswordLine } from "react-icons/ri";
export const ModalChangePassword = ({
  open,
  setOpen,
  email,
  token,
  setOpenCorreo,
  setOpenPonerCode,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setAlertSuccess = useAlertStore((state) => state.setAlertSuccess);

  const setAlertDanger = useAlertStore((state) => state.setAlertDanger);
  const changePassword = async () => {
    setLoading(true);
    try {
      const responseEditPassword = await useEditPassword(
        email,
        token,
        newPassword
      );
      if (responseEditPassword && responseEditPassword.status == 200) {
        setAlertSuccess(true);
        setOpen(false);
        setOpenPonerCode(false);
        setOpenCorreo(false);
      } else {
        setAlertDanger(true);
        setOpen(false);
        setOpenPonerCode(false);
        setOpenCorreo(false);
      }
      
    } catch (e) {
      console.log(e, "errores");
    } finally {
      setLoading(false);
    }
  };
  const onChange = (e) => {
    setNewPassword(e.target.value);
  };
  return (
    <ModalLayout Icon={RiLockPasswordLine} open={open} setOpen={setOpen}>
      <div className="flex flex-col gap-6 justify-center items-center mr-2 py-4 md:mr-3">
        <Title
          className={"text-medium md:text-lg"}
          title={"Nueva contraseña : "}
        ></Title>
        <CustomInput
          value={newPassword}
          required={true}
          type="password"
          placeholder="Nueva contraseña"
          onChange={onChange}
        ></CustomInput>
        <ButtonSpinner
          label="Cambiar contraseña"
          onClick={changePassword}
          loading={loading}
        ></ButtonSpinner>
      </div>
    </ModalLayout>
  );
};
