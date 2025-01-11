import React from 'react'
import { MainLayout } from '../../layout/MainLayout'

import { Location, Title , AcordeonNotis } from '../../components'
export const Notifications = () => {
  return (

    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location
            route={`Notificaciones`}
            subroute={"Mis notificaciones"}
          ></Location>

          <Title title={"Notificaciones"}></Title>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        {/* ////////////////////////////////////////////// */}
        <section className="p-3 mb-4">
          <AcordeonNotis></AcordeonNotis>
        </section>
      </section>
    </MainLayout>
  )
}
