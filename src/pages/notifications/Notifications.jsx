import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layout/MainLayout';
import { Location, Title, AcordeonNotis } from '../../components';
import { getNotisUser } from '../../service/notifications/getNotisUser';
import { useSpinnerStore, useStoreUserData } from '../../store';
import { NotisAdmin } from './NotisAdmin';


export const Notifications = () => {

  const dataUser = useStoreUserData((state) => state.userData);


  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location route="Notificaciones" subroute="Mis notificaciones" />
          <Title title="Notificaciones" />
        </div>
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <section className="p-3 mb-4">
          {dataUser.roles[0] == "SOCIO" || dataUser.roles[0] == "ENTRENADOR" ? (
            <AcordeonNotis />
          ) : (
            <NotisAdmin />
          )}
        </section>
      </section>
    </MainLayout>
  );
};
