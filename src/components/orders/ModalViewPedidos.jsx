import React, { useState, useEffect } from 'react'
import { ModalLayout } from '../../layout/ModalLayout'
import { useGetProd } from '../../service/requestShop/getProduct';

export const ModalViewPedidos = ({ open, setOpen, dataPedido }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (open && dataPedido?.length > 0) {
            const fetchProductos = async () => {
                setLoading(true);
                try {
                    // Crear un array de promesas para obtener todos los productos
                    const promesas = dataPedido.map(async (item) => {
                        const response = await useGetProd({ idProd: item.productoId });
                        console.log(response , "reponse");
                        
                        if (response?.data) {
                            return {
                                ...response.data.value,
                                cantidad: item.cantidad,
                                precioUnitario: item.precioUnitario,
                                subtotal: item.subtotal
                            };
                        }
                        return null;
                    });

                    // Esperar a que todas las promesas se resuelvan
                    const productosData = await Promise.all(promesas);
                    setProductos(productosData.filter(Boolean)); // Filtrar posibles valores nulos
                } catch (error) {
                    console.error("Error al obtener productos:", error);
                } finally {
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
                        <li key={producto.id} className="p-4 border-2 border-gray-300">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold">{producto.nombre}</h2>
                                <span className="text-gray-600">Cantidad: {producto.cantidad}</span>
                            </div>
                            <p className="text-gray-600 mt-1">{producto.descripcion}</p>
                            <div className="mt-2 grid grid-cols-3 gap-4">
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
                </ul>
            )}
        </ModalLayout>
    )
}