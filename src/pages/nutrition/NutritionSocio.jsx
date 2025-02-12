import React, { useEffect, useState } from 'react';
import { MainLayout } from "../../layout/MainLayout";

import { useGetPlanByIdUser } from '../../service/nutrition/useGetPlanByIdUser';

import { useSpinnerStore, useStoreUserData } from '../../store';
import { useGetPlanById } from '../../service/nutrition/useGetPlanById';
import { SectionPaymentNutritionPlan } from '../../components/nutrition/SectionPaymentNutritionPlan';
import { SectionPlanSocio } from '../../components/nutrition/SectionPlanSocio';
export const NutritionSocio = () => {
  const dataUser = useStoreUserData((state) => state.userData);
  const [dataPlanUser, setDataPlanUser] = useState();
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const [loading, setLoading] = useState(true);
  const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
  useEffect(() => {
    showSpinner()
    const fetchPlanData = async () => {
      try {

        const dataPlan = await useGetPlanByIdUser(dataUser.identityUserId);

        if (dataPlan.status === 200 || dataPlan.status === "200") {
          const idPlan = dataPlan.data[0].planNutricionalId;


          const dataPlanDetails = await useGetPlanById(idPlan);
          setDataPlanUser(dataPlanDetails.data);
        }

      } catch (e) {
        console.log(e);
      } finally {
        hideSpinner()
        setLoading(false)
      }
    };

    fetchPlanData();
  }, [dataUser.identityUserId]);



  return (
    <MainLayout>
      {!dataPlanUser && !loading ? (
        <SectionPaymentNutritionPlan></SectionPaymentNutritionPlan>
      ) : (
        <>
          <SectionPlanSocio plan={dataPlanUser}></SectionPlanSocio>


        </>


      )}
    </MainLayout>
  );
};
