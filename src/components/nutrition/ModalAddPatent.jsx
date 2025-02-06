import React, { useEffect, useState } from 'react'
import { ModalLayout } from '../../layout/ModalLayout'
import { Title } from '../ui/title/Title'
import { CustomInput } from '../ui/input/CustomInput'
import { ButtonSpinner } from '../ui/buttons/ButtonSpinner'
import { createPatent } from '../../service/nutrition/createPatent'
import { useGetPatents } from '../../service/nutrition/useGetPatents'
export const ModalAddPatent = ({ open, setOpen, setPatents }) => {
    const [loading, setLoading] = useState(false)


    const [form, setForm] = useState({
        nombre: "",
        edad: 0,
        objetivo: "",
        peso: 0,
        porcentajeDeGrasa: 0,

    });

    useEffect(() => {

        setForm({
            nombre: "",
            edad: 0,
            objetivo: "",
            peso: 0,
            porcentajeDeGrasa: 0,

        });
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            const response = await createPatent(form)
            console.log(response, "response al crear patent");
            if (response.status == 201 || response.status == 200) {

                const data = await useGetPatents();
                setPatents(data.data);
                setOpen(false);
            }

        } catch (e) {
            console.log(e, "errores");

        } finally {
            setLoading(false)
        }
    }
    return (
        <ModalLayout open={open} setOpen={setOpen} >
            <div className="flex justify-center items-center gap-1 mb-4">
                <Title title={"Añadir paciente"}></Title>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="font-semibold text-start w-full" htmlFor="">Nombre : </label>
                    <CustomInput
                        name="nombre"

                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Nombre"
                        label="Nombre"
                        className="mb-4"
                    />
                </div>
                <div>
                    <label className="font-semibold text-start w-full" htmlFor="">Edad : </label>
                    <CustomInput
                        name="edad"
                        type="number"
                        value={form.edad}
                        onChange={handleChange}
                        placeholder="Edad"
                        label="Edad"
                        className="mb-4"
                    />
                </div>
                <div>
                    <label className="font-semibold text-start w-full" htmlFor="">Objetivo : </label>
                    <CustomInput
                        name="objetivo"
                        value={form.objetivo}
                        onChange={handleChange}
                        placeholder={form.objetivo || "Agregue un objetivo"}
                        label="Objetivo"
                        className="mb-4"
                    />
                </div>

                <div>
                    <label className="font-semibold text-start w-full" htmlFor="">Peso(kg) : </label>
                    <CustomInput
                        name="peso"
                        type="number"
                        value={form.peso}
                        onChange={handleChange}
                        placeholder="Peso"
                        label="Peso"
                        className="mb-4"
                    />


                </div>
                <div>
                    <label className="font-semibold text-start w-full" htmlFor="">Grasa(%) : </label>
                    <CustomInput
                        name="porcentajeDeGrasa"
                        type="number"
                        value={form.porcentajeDeGrasa
                        }
                        onChange={handleChange}
                        placeholder="Grasa"
                        label="Peso"
                        className="mb-4"
                    />


                </div>

                <ButtonSpinner
                    loading={loading}
                    type='submit'
                    label="Guardar Cambios"


                >

                </ButtonSpinner>
            </form>
        </ModalLayout>
    )
}
