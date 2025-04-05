import { useState, useEffect } from 'react';
import { api } from '../../service/api';

export const useNotificacionesUsuario = (idUser) => {
    const [notificaciones, setNotificaciones] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotificaciones = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/api/NotificacionesUsuario/${idUser}`);
                setNotificaciones(response.data);
                setError(null);
            } catch (e) {
                console.error("Error al obtener notificaciones:", e);
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        if (idUser) {
            fetchNotificaciones();
        } else {
            setLoading(false);
        }

    }, [idUser]);

    return { notificaciones, loading, error };
};