import React, { useState, useEffect } from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { CustomInput, Location, Title, TableOrders } from '../../components'
import { useGetPedidos } from '../../service/requestShop/getRequest'
import { useGetAllUsers } from '../../service/auth/use-getAllUsers'
import { CiSearch } from 'react-icons/ci'
import { useSpinnerStore } from '../../store'

const columns = ["ID", "Fecha de pago", "Nombre del cliente", "Precio", "Estado del pago", "Opciones"]

export const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
      } finally {
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
        const transformedData = response.data
          .map(pedido => {
            const user = usersList.find(u => u.identityUserId === pedido.usuarioId);
            const fechaCreacion = new Date(pedido.fechaCreacion);
  
            return {
              id: pedido.id,
              fecha: fechaCreacion.toLocaleDateString() + " " + fechaCreacion.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              nombreCliente: user ? `${user.nombre} ${user.apellido}` : 'Cliente no encontrado',
              carrito: pedido.carrito.items,
              precio: `$${pedido.total.toLocaleString()}`,
              estado: pedido.estado,
              modificar: "Editar",
              originalData: pedido,
              fechaCreacionObj: fechaCreacion 
            };
          })
          .sort((a, b) => b.fechaCreacionObj - a.fechaCreacionObj);
  
        setOrdersData(transformedData);
        setFilteredData(transformedData);
      }
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };
  
  
  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term) {
      setFilteredData(ordersData);
      return;
    }

    const filtered = ordersData.filter(order => {
      return (
        order.id.toLowerCase().includes(term) ||
        order.nombreCliente.toLowerCase().includes(term) ||
        order.fecha.toLowerCase().includes(term) ||
        order.estado.toLowerCase().includes(term) ||
        order.precio.toLowerCase().includes(term)
      );
    });
    
    setFilteredData(filtered);
  };


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
            <div className="w-full md:w-64">
              <CustomInput
                classNameInput="md:p-1.5 w-full"
                className="border-gray-300 md:p-0 w-full"
                Icon={CiSearch}
                placeholder="Buscar por ID, nombre, fecha, estado..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </section>
        <TableOrders 
          onUpdate={() => fetchPedidos(users)} 
          arregloColumns={columns} 
          arreglo={filteredData}
        />
      </section>
    </MainLayout>
  )
}