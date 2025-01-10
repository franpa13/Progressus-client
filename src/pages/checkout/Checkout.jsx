import React from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardReturn } from 'react-icons/md'
import { AlertCheckout } from '../../components'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import useStoreCart from '../../store/useStoreCart'
import { PaymentCheckout } from '../../components'
export const Checkout = () => {
  const cart = useStoreCart((state) => state.cart);
  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  };
  return (
    <MainLayout>

      <div className="min-h-screen  animate-fade-in-down md:mx-auto  rounded shadow-xl w-full overflow-hidden mb-20 p-3 ">
        <Link
          className="w-1/12  md:w-[50px] flex justify-center items-center py-1 rounded text-white  bg-customNavBar hover:bg-customTextGreen"
          to={"/shopsocio/cart"}
        >
          <MdOutlineKeyboardReturn className="text-lg font-semibold md:text-2xl " />
        </Link>
        <div className=" md:w-full  flex flex-col md:flex-row md:items-center gap-3 md:justify-around md:px-12  justify-center items-start ">
          <div className='w-full   '>

            <h1 className="text-2xl font-semibold mb-4 mt-3">
              Checkout
            </h1>
            <div className='md:w-5/6 w-full'>

              <AlertCheckout text={"Los pedidos únicamente se retiran por el gimnasio. No realizamos envíos, una vez confirmado el pago o reserva se puede retirar"} severity="info" ></AlertCheckout>
            </div>
            <PaymentCheckout></PaymentCheckout>
          </div>
          {/* Resumen del carrito */}
          <div className="w-full mt-6 md:mt-0 md:w-1/3">

            <div className=" rounded-lg shadow-md p-6">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold mb-1">Resumen</h2>
                <SellOutlinedIcon className='text-customTextBlue'></SellOutlinedIcon>
              </div>

              <hr className="py-[1px] rounded-lg bg-gray-300" />
              {cart?.length > 0 && cart.map((prod, i) => {
                return (

                  <div key={i} className="flex justify-between items-center mb-2 mt-2">
                    <img src={prod.imagenUrl} className='w-[50px]' alt="" />
                    <span className="font-semibold">{prod.nombre}</span>
                    <span className="font-semibold">
                      ${prod?.precio * prod?.quantity}
                    </span>
                  </div>
                )
              })}
              <hr className="py-[1px] rounded-lg bg-gray-300" />
              <div className="flex justify-between  text-2xl mb-6 mt-2 bg ">

                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  ${calculateSubtotal().toFixed(2)}
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

    </MainLayout>
  )
}
