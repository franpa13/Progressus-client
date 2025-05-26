import React, { useEffect, useState } from 'react';
import { ButtonSpinner, CustomInput } from '../../components';
import { SelectNotis } from './SelectNotis';
import { getPlantIllas } from '../../service/notifications/getPlatinllas';
import { useGetAllUsers } from '../../service/auth/use-getAllUsers';
import { SendNotification } from '../../service/notifications/SendNotification';
import { SnackbarDefault } from '../../components';

export const NotisAdmin = () => {
    const [plantillas, setPlantillas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [plantillaSeleccionada, setPlantillaSeleccionada] = useState(null);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [usuarioDeterminado, setUsuarioDeterminado] = useState('');
    const [loadingEnvio, setLoadingEnvio] = useState(false);
    const [loadingEnvioManual, setLoadingEnvioManual] = useState(false);
    
    // Estados para Snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    // Función para truncar texto
    const truncarTexto = (texto, porcentaje = 10) => {
        if (!texto) return '';
        const longitud = Math.max(1, Math.floor(texto.length * (porcentaje / 100)));
        return texto.substring(0, longitud) + (texto.length > longitud ? '...' : '');
    };

    // Función para mostrar notificación
    const mostrarNotificacion = (message, severity = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    // Cargar datos al montar el componente
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Cargar plantillas
                const responsePlantillas = await getPlantIllas();
                if (responsePlantillas.data) {
                    setPlantillas(responsePlantillas.data);
                }

                // Cargar usuarios usando el hook
                const { data } = await useGetAllUsers();
                if (data) {
                    setUsuarios(data);
                }
            } catch (error) {
                console.error('Error al cargar datos:', error);
                mostrarNotificacion('Error al cargar datos', 'error');
            }
        };

        cargarDatos();
    }, []);

    // Manejar cambio de plantilla seleccionada
    const handleChangePlantilla = (event) => {
        const selectedId = event.target.value;
        const selectedPlantilla = plantillas.find(p => p.id === selectedId);
        setPlantillaSeleccionada(selectedPlantilla);
    };

    // Enviar notificación a usuario seleccionado
    const handleEnviarNotificacion = async () => {
        if (!plantillaSeleccionada || !usuarioSeleccionado) {
            mostrarNotificacion('Por favor seleccione una plantilla y un usuario', 'warning');
            return;
        }

        setLoadingEnvio(true);
        try {
            const response = await SendNotification(
                plantillaSeleccionada.id,
                usuarioSeleccionado.identityUserId
            );

            if (response) {
                mostrarNotificacion('Notificación enviada con éxito');
            } else {
                mostrarNotificacion('Error al enviar notificación', 'error');
            }
        } catch (error) {
            console.error('Error al enviar notificación:', error);
            mostrarNotificacion('Error al enviar notificación', 'error');
        } finally {
            setLoadingEnvio(false);
        }
    };

    // Enviar notificación manual por ID
    const handleEnviarNotificacionManual = async () => {
        if (!plantillaSeleccionada || !usuarioDeterminado) {
            mostrarNotificacion('Por favor seleccione una plantilla e ingrese un ID de usuario', 'warning');
            return;
        }

        setLoadingEnvioManual(true);
        try {
            const response = await SendNotification(
                plantillaSeleccionada.id,
                usuarioDeterminado
            );

            if (response) {
                mostrarNotificacion('Notificación enviada con éxito');
                setUsuarioDeterminado('');
            } else {
                mostrarNotificacion('Error al enviar notificación', 'error');
            }
        } catch (error) {
            console.error('Error al enviar notificación:', error);
            mostrarNotificacion('Error al enviar notificación', 'error');
        } finally {
            setLoadingEnvioManual(false);
        }
    };

    return (
        <>
            <section className='w-full flex  justify-center'>
                <div className='w-full pr-4 flex flex-col items-center justify-center '>
                    <h2 className='text-xl font-semibold'>Enviar notificación a usuario específico</h2>
                    <section className='w-full flex flex-wrap justify-center gap-4 my-6'>
                        <div className='w-[300px]'>
                            <SelectNotis
                                fullWidth
                                label='Elija una plantilla'
                                value={plantillaSeleccionada?.id || ''}
                                onChange={handleChangePlantilla}
                                options={plantillas.map(plantilla => ({
                                    value: plantilla.id,
                                    label: `${plantilla.titulo} - ${truncarTexto(plantilla.cuerpo)}`
                                }))}
                            />
                        </div>

                        <div className='w-[300px]'>
                            <SelectNotis
                                fullWidth
                                label='Seleccione un usuario'
                                value={usuarioSeleccionado?.identityUserId || ''}
                                onChange={(e) => {
                                    const selectedId = e.target.value;
                                    const selectedUser = usuarios.find(u => u.identityUserId === selectedId);
                                    setUsuarioSeleccionado(selectedUser);
                                }}
                                options={usuarios.map(user => ({
                                    value: user.identityUserId,
                                    label: `${user.nombre} ${user.apellido}`
                                }))}
                            />
                        </div>
                        <div className='w-full mt-6'>
                            {plantillaSeleccionada && (
                                <p>
                                    {plantillaSeleccionada.cuerpo}
                                </p>)}
                        </div>
                    </section>
                    <ButtonSpinner
                        className='bg-blue-600'
                        label='Enviar notificación'
                        onClick={handleEnviarNotificacion}
                        loading={loadingEnvio}
                    />
                </div>

                
            </section>

            <SnackbarDefault
                open={openSnackbar}
                setOpen={setOpenSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
                position={{ vertical: 'bottom', horizontal: 'center' }}
                duration={6000}
            />
        </>
    );
};