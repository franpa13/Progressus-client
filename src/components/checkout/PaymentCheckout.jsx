import React, { useState } from 'react';
import PaidIcon from '@mui/icons-material/Paid';
import logoMp from "/logomp.png";
import { useCreatePayment } from '../../service/shop/useCreatePayment';
import { useStoreUserData } from '../../store';
import { CircularProgress } from '@mui/material';

export const PaymentCheckout = ({ cart }) => {
    const [load, setLoad] = useState(false)
    const dataUser = useStoreUserData((state) => state.userData);
    // Transformar el carrito al formato requerido
    const cartFormatted = cart.map(item => ({
        id: item.id,
        cantidad: item.quantity
    }));

    const handlePay = async () => {
        try {
            setLoad(true)
            const response = await useCreatePayment(dataUser.identityUserId, cartFormatted)
            console.log(response.data, "data");

            if (response?.status == "200" || response.status == 200) {

                // REDIRECCIÓN AL INIT POINT
                const initPoint = response?.data?.preference?.initPoint;
                if (initPoint) {

                    window.location.href = initPoint; // Redirige al usuario
                } else {
                    console.error("InitPoint no encontrado en la respuesta.");
                }
            }
        } catch (e) {
            console.log(e, "errores");

        } finally {
            setLoad(false)
        }


    }

    return (
        <div className='mt-8 md:mt-24 '>
            <div className='flex md:flex-row flex-col gap-3 mb-4'>
                <button
                    onClick={handlePay}
                    style={{
                        backgroundColor: "#009EE3",
                        color: "white",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        fontWeight: "600",
                        fontSize: "16px",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#007BBE")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#009EE3")
                    }
                    disabled={load}
                >
                    {load ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        <img src={logoMp} alt="Mercado Pago" className="w-7 md:w-10" />
                    )}

                    Pagar con Mercado Pago
                </button>
                <p className='w-full md:w-1/2 md:ml-3 font-semibold'>
                    Si selecciona Mercado Pago una vez reciba el mail de confirmación, ya puede pasar a retirar su pedido.
                </p>
            </div>

            <div className='flex md:flex-row flex-col gap-3 mt-12'>
                <button
                    style={{
                        backgroundColor: "#7CB305",
                        color: "white",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        fontWeight: "600",
                        fontSize: "16px",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#5B8C00")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#7CB305")
                    }
                >
                    <PaidIcon sx={{ fontSize: "33px" }} />
                    Pagar con efectivo
                </button>
                <p className='w-full md:w-1/2 md:ml-3 font-semibold'>
                    Si selecciona efectivo su pedido quedará pendiente hasta que se presente al gimnasio a efectuar el pago y retiro del mismo.
                </p>
            </div>
        </div>
    );
};
