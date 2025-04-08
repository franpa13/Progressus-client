import React, { useEffect, useState } from 'react';
import { MainLayout } from "../../layout/MainLayout";

import { useGetPlanByIdUser } from '../../service/nutrition/useGetPlanByIdUser';
import { useSpinnerStore, useStoreUserData } from '../../store';
import { useGetPlanById } from '../../service/nutrition/useGetPlanById';
import { SectionPaymentNutritionPlan } from '../../components/nutrition/SectionPaymentNutritionPlan';
import { SectionPlanSocio } from '../../components/nutrition/SectionPlanSocio';
import { useGetMembershipUser } from '../../service/nutrition/useGetMembershipUser';
import { WaitPlan } from '../../components/nutrition/WaitPlan';
import { useNavigate } from 'react-router-dom';

export const NutritionSocio = () => {
  const dataUser = useStoreUserData((state) => state.userData);
  const [dataPlanUser, setDataPlanUser] = useState(null);
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
  const [loading, setLoading] = useState(true);
  const [havePlan, setHavePlan] = useState(null);

    const navigate = useNavigate();
  useEffect(() => {
    if(dataUser.membresiaActiva ){
  
  
      showSpinner();
      const fetchPlanData = async () => {
        try {
          const havePlanRes = await useGetMembershipUser(dataUser.identityUserId);
  
          console.log(havePlanRes, "haveplanres");
  
          const dataPlanRes = await useGetPlanByIdUser(dataUser.identityUserId);
  
          if (havePlanRes != undefined && havePlanRes?.status === 200) {
            console.log(havePlanRes, "haveplan");
            setHavePlan(havePlanRes.data.historialSolicitudDePagos[1]?.estadoSolicitud?.nombre || null);
          }
  
  
          if (dataPlanRes.status === 200 && dataPlanRes.data.length > 0) {
            const idPlan = dataPlanRes.data[0].planNutricionalId;
            const dataPlanDetails = await useGetPlanById(idPlan);
            setDataPlanUser(dataPlanDetails.data);
          }
        } catch (e) {
          console.log(e);
        } finally {
          hideSpinner();
          setLoading(false);
        }
      };
  
      fetchPlanData();
    }else{
      navigate("/membership")
    }
  }, [dataUser.identityUserId]);


  return (
    <MainLayout>
      {loading ? (
        <div className='w-full flex justify-center '>Cargando..</div>
      ) : havePlan === "Pendiente" || havePlan === null || !havePlan ? (
        <SectionPaymentNutritionPlan />
      ) : havePlan === "Confirmado" && !dataPlanUser ? (
        <WaitPlan></WaitPlan>
      ) : (
        <SectionPlanSocio plan={dataPlanUser} />
      )}

    </MainLayout>
  );
};