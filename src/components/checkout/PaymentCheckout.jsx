import React from 'react'
import PaidIcon from '@mui/icons-material/Paid';
import logoMp from "/logomp.png";
export const PaymentCheckout = () => {
    return (
        <div className='mt-8 md:mt-24 '>
            <div className='flex md:flex-row flex-col gap-3 mb-4'>
                <button
                    style={{
                        backgroundColor: "#009EE3", // Azul característico de Mercado Pago
                        color: "white", // Texto blanco
                        padding: "8px 15px", // Espaciado interno
                        borderRadius: "5px", // Bordes redondeados
                        fontWeight: "600", // Texto en negrita
                        fontSize: "16px", // Tamaño de fuente
                        border: "none", // Sin borde
                        cursor: "pointer", // Manito al pasar el cursor
                        display: "flex", // Para alinear el contenido
                        alignItems: "center", // Centrar verticalmente
                        justifyContent: "center", // Centrar horizontalmente
                        gap: "10px", // Espacio entre el ícono y el texto
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra ligera
                        transition: "background-color 0.3s ease", // Animación suave al pasar el cursor
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#007BBE")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#009EE3")
                    }
                >
                    <img
                        src={logoMp}
                        alt="Mercado Pago"
                        className="w-7 md:w-10"
                    />
                    Pagar con Mercado Pago
                </button>
                <p className='w-full md:w-1/2 md:ml-3 font-semibold'>
                    Si selecciona Mercado Pago una vez reciba el mail de confirmación, ya puede pasar a retirar su pedido.

                </p>

            </div>
            <div className='flex  md:flex-row flex-col gap-3 mt-12'>
                <button

                    style={{
                        backgroundColor: "#7CB305",
                        color: "white", // Texto blanco
                        padding: "8px 15px", // Espaciado interno
                        borderRadius: "5px", // Bordes redondeados
                        fontWeight: "600", // Texto en negrita
                        fontSize: "16px", // Tamaño de fuente
                        border: "none", // Sin borde
                        cursor: "pointer", // Manito al pasar el cursor
                        display: "flex", // Para alinear el contenido
                        alignItems: "center", // Centrar verticalmente
                        justifyContent: "center", // Centrar horizontalmente
                        gap: "10px", // Espacio entre el ícono y el texto
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra ligera
                        transition: "background-color 0.3s ease", // Animación suave al pasar el cursor
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#5B8C00")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#7CB305")
                    }
                >
                    <PaidIcon sx={{ fontSize: "33px" }} ></PaidIcon>
                    Pagar con efectivo
                </button>
                <p className='w-full md:w-1/2 md:ml-3 font-semibold'>
                    Si selecciona efectivo su pedido quedará pendiente hasta que se presente al gimnasio a efectuar el pago y retiro del mismo.
                </p>

            </div>


        </div>
    )
}
