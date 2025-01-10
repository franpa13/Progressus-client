import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import {
  Button,
  CustomInput,
  ErrorAuth,
  Checkbox,

  ModalOlvidarContraseña,

} from "../../components";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";


import { loginUser } from "../../service/auth/use-login";
import {
  useStoreUser,
  useStoreAlert,
  useStoreUserData,
  useSpinnerStore,
} from "../../store";

export const Login = () => {
  // OLVIDAR CONTRASEÑA
  const [openOlvidarPassword, setOpenOlvidarPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const closeAlert = useStoreAlert((state) => state.closeAlert);

  // SPINNER LOGIN
  const { showSpinner, hideSpinner } = useSpinnerStore();
  // TOKEN DEL USER
  const localToken = localStorage.getItem("auth-token");
  const storeLocalToken = useStoreUser((state) => state.setToken);
  const setEmail = useStoreUserData((state) => state.setEmail);
  // RECORDAR USUARIO
  const remember = useStoreUser((state) => state.remember);
  const setRemember = useStoreUser((state) => state.setRemember);
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [check, setChecked] = useState(remember);

  useEffect(() => {
    // VERIFICAR SI EL USUARIO ES RECORDADO O NO

    if (localToken) {
      navigate("/home");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleCheck = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    // CAMBIAR EL RECORDAR EN EL STORE
    setRemember(isChecked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // VALIDACION EN EL FRONT
    let formErrors = {};
    if (!formLogin.email) {
      formErrors.email = "El campo email es obligatorio.";
    }
    if (!formLogin.password) {
      formErrors.password = "El campo contraseña es obligatorio.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      showSpinner();

      const enviarUser = await loginUser(formLogin.email, formLogin.password);

      if (enviarUser?.status === 200 && enviarUser?.data?.accessToken) {
        if (enviarUser?.data?.accessToken) {
          storeLocalToken(enviarUser?.data);
        }
        setEmail(formLogin.email);

        closeAlert();
        navigate("/home");
      } else {
        // VALIDACION EN EL BACK
        setErrorLogin(true);
      }
    } catch (e) {
      console.log("error", e);
    } finally {
      hideSpinner();
    }
  };
  const dontRememberPassword = () => {
    setOpenOlvidarPassword(true);
  };
  return (
    <form
      onSubmit={handleLogin}
      className="w-3/4 animate-fade-in-right gap-2 flex flex-col justify-center items-center md:w-1/3 md:gap-2 md:items-center mt-4"
    >
      {/* Inputs */}
      <CustomInput
        className="my-1"
        iconColor={"text-customTextGreen"}
        onChange={handleChange}
        placeholder="Usuario"
        Icon={FiUser}
        name="email"
        type="email"
      />
      {errors.email && <ErrorAuth messageError={errors.email} />}

      <CustomInput
        className="my-1"
        iconColor={"text-customTextGreen"}
        onChange={handleChange}
        placeholder="Contraseña"
        name="password"
        type="password"
        Icon={RiLockPasswordLine}
      />
      {errors.password && <ErrorAuth messageError={errors.password} />}

      {/* Checkbox */}
      <div className="w-full flex justify-start gap-2 items-center mt-2">
        <Checkbox check={check} onChange={handleCheck} />
        <span>Recordarme</span>
      </div>

      {errorLogin && (
        <span className="text-red-500 w-full text-center font-medium flex justify-center my-2 items-center text-sm md:text-base md:gap-2">
          Credenciales inválidas
          <MdErrorOutline width={15} />
        </span>
      )}

      <Button type="submit" label="Ingresar" />
      <span
        onClick={dontRememberPassword}
        className="text-blue-500 hover:text-blue-700 cursor-pointer font-semibold underline transition duration-200 text-sm"
      >
        Olvidé mi contraseña
      </span>
      <ModalOlvidarContraseña
        open={openOlvidarPassword}
        setOpen={setOpenOlvidarPassword}
      ></ModalOlvidarContraseña>
    </form>
  );
};
