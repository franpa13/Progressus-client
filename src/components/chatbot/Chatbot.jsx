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
                'Tienes alguna duda o consulta en lo que te pueda ayudar ? '
            ], defaultLanguage: 'es', i18n: {
                es: {
                    title: '🏋️‍♂️🏋️‍♀️',
                    subtitle: "Empieza a chatear , estamos aqui para ayudarte 24/7",
                    footer: '',
                    getStarted: 'Nueva conversacion',
                    inputPlaceholder: 'Ingresa tu pregunta..',
                },
            },
        });

        return () => {

            const chatContainer = document.querySelector('#n8n-chat');
            if (chatContainer) chatContainer.remove();
        };
    }, []);
}
