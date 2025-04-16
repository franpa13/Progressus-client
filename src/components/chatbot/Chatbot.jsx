import React from 'react'
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import { useStoreUserData } from '../../store';
import { CgGym } from "react-icons/cg";
export const Chatbot = () => {
    const dataUser = useStoreUserData((state) => state.userData);
    useEffect(() => {
        const chatInstance = createChat({
            webhookUrl: 'https://n8n.srv792715.hstgr.cloud/webhook/c6b23824-2baf-43aa-8b06-6c4a140ffec0/chat',
            initialMessages: [
                `Hola ${dataUser?.nombre + " " + dataUser?.apellido} ! 👋`,
                'Soy tu asistente virtual de Progressus 💪. Por ahora estoy en fase beta, así que solo puedo ayudarte con planes nutricionales o de entrenamiento 🥗🏋‍♂. ¡Pero pronto podré asistirte con todo lo que necesites del sistema! ¿En qué puedo ayudarte hoy '
            ], defaultLanguage: 'es', i18n: {
                es: {
                    title: '🏋‍♂ Progressus Assistant 🥗',
                    subtitle: "Empezá a chatear, estoy disponible 24/7 para ayudarte en tus objetivos",
                    footer: '',
                    getStarted: 'Nueva conversación',
                    inputPlaceholder: 'Escribí tu consulta acá...',
                  }
                
            },
        });

        return () => {

            const chatContainer = document.querySelector('#n8n-chat');
            if (chatContainer) chatContainer.remove();
        };
    }, []);
}
