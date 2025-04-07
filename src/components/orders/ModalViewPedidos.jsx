import React, { useState, useEffect } from 'react';
import { ModalLayout } from '../../layout/ModalLayout';
import { useGetProd } from '../../service/requestShop/getProduct';

export const ModalViewPedidos = ({ open, setOpen, dataPedido ,total }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (open) {
            setProductos([]); // Limpiar productos anteriores
            setLoading(true);

            const fetchProductos = async () => {
                if (dataPedido?.length > 0) {
                    try {
                        const promesas = dataPedido.map(async (item) => {
                            const response = await useGetProd({ idProd: item.productoId });
                            if (response?.data?.value) {
                                return {
                                    ...response.data.value,
                                    cantidad: item.cantidad,
                                    precioUnitario: item.precioUnitario,
                                    subtotal: item.subtotal
                                };
                            }
                            return null;
                        });

                        const productosData = await Promise.all(promesas);
                        setProductos(productosData.filter(Boolean));
                    } catch (error) {
                        console.error("Error al obtener productos:", error);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    setLoading(false);
                }
            };

            fetchProductos();
        }
    }, [open, dataPedido]);

    return (
        <ModalLayout open={open} setOpen={setOpen} Icon="">
            {loading ? (
                <div className="text-center py-4">Cargando productos...</div>
            ) : productos.length === 0 ? (
                <div className="text-center py-4">No se encontraron productos</div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {productos.map((producto) => (
                        <li key={producto.id} className="p-2 flex flex-col gap-8 border-2 border-gray-300">
                            <div className="flex justify-between items-center w-full">
                                <div className=' w-4/5 md:w-2/3'>

                                    <h2 className="text-lg font-semibold">{producto.nombre}</h2>
                                    <p className="text-gray-600 mt-1">{producto.descripcion}</p>
                                </div>
                                <div className='flex w-1/5 md:w-1/3 flex-col justify-end items-end gap-2'>
                                    <img className='w-11/12 md:w-1/6' src={producto.imagenUrl} alt={`imagen de ${producto.nombre}`} />
                                    <span className="text-gray-600">Cantidad: {producto.cantidad}</span>

                                </div>
                            </div>
                            <div className="mt-2 flex justify-between items-center w-full">
                                <p>
                                    <span className="font-medium">Precio unitario:</span> ${producto.precioUnitario.toLocaleString()}
                                </p>
                                <p>
                                    <span className="font-medium">Subtotal:</span> ${producto.subtotal.toLocaleString()}
                                </p>
                                {producto.talle && (
                                    <p>
                                        <span className="font-medium">Talle:</span> {producto.talle}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                    <li className='mt-8'>
                        <h2 className='font-semibold text-lg'>Total : {total && total}</h2>
                    </li>
                </ul>
              
            )}
            
        </ModalLayout>
    );
};
