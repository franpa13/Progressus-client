import React, { useState, useEffect } from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { CustomInput, Location, Title, TableOrders } from '../../components'
import { useGetPedidos } from '../../service/requestShop/getRequest'
import { useGetAllUsers } from '../../service/auth/use-getAllUsers'
import { CiSearch } from 'react-icons/ci'
import { useSpinnerStore } from '../../store'

const columns = ["ID", "Fecha de pago", "Nombre del cliente",  "Precio", "Estado del pago", "Opciones"]

export const Orders = () => {
  const [findElement, setFindElement] = useState("");
  const [ordersData, setOrdersData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [users, setUsers] = useState([]);
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
  // Obtener usuarios primero
  useEffect(() => {
    const fetchUsers = async () => {
      showSpinner();
      try {
        const response = await useGetAllUsers();
        if (response && response.data) {
          setUsers(response.data);
          // Una vez que tenemos los usuarios, obtenemos los pedidos
          fetchPedidos(response.data);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }finally{
        hideSpinner();
      }
    };

    fetchUsers();
  }, []);

  // Obtener pedidos y combinar con datos de usuarios
  const fetchPedidos = async (usersList) => {
    try {
      const response = await useGetPedidos();
      if (response && response.data) {
        // Transformar los datos de la API al formato que necesita la tabla
        const transformedData = response.data.map(pedido => {
          // Buscar el usuario correspondiente
          const user = usersList.find(u => u.identityUserId === pedido.usuarioId);
          
          return {
            id: pedido.id, // Tomamos solo los primeros 8 caracteres del ID
            fecha: new Date(pedido.fechaCreacion).toLocaleDateString(),
            nombreCliente: user ? `${user.nombre} ${user.apellido}` : 'Cliente no encontrado',
            carrito : pedido.carrito.items,
            precio: `$${pedido.total.toLocaleString()}`,
            estado: pedido.estado,
            modificar: "Editar",
            originalData: pedido // Guardamos los datos originales por si los necesitamos
          };
        });
        
        setOrdersData(transformedData);
        setFilteredData(transformedData);
      }
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFindElement(searchTerm);
    
    if (searchTerm === "") {
      setFilteredData(ordersData);
    } else {
      const filtered = ordersData.filter(order => 
        order.id.toLowerCase().includes(searchTerm) ||
        order.nombreCliente.toLowerCase().includes(searchTerm) ||
        order.email.toLowerCase().includes(searchTerm) ||
        order.estado.toLowerCase().includes(searchTerm) ||
        order.precio.toLowerCase().includes(searchTerm)
      );
    
      
      setFilteredData(filtered);
    }
  };
  console.log(filteredData, "filtered data");
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location
            route={`Pedidos`}
            subroute={"Gestionar pedidos"}
          ></Location>

          <Title title={"Pedidos"}></Title>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        {/* ////////////////////////////////////////////// */}
        <section className="p-3 mb-4">
          <div className='flex md:flex-row flex-col justify-end items-start md:items-center md:gap-3 w-full'>
            <div>
              <CustomInput
                classNameInput="md:p-1.5"
                className="border-gray-300 md:p-0"
                Icon={CiSearch}
                placeholder="Buscar"
                value={findElement}
                onChange={handleChange}
              ></CustomInput>
            </div>
          </div>
        </section>
        <TableOrders onUpdate={() => fetchPedidos(users)} arregloColumns={columns} arreglo={filteredData}></TableOrders>
      </section>
    </MainLayout>
  )
}