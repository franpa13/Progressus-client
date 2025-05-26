import React, { useState } from "react";
import { ModalLayout } from "../../../layout/ModalLayout";
import { CustomInput } from "../../ui/input/CustomInput";
import { ButtonSpinner } from "../../ui/buttons/ButtonSpinner";
import { usePersonalMembership } from "../../../service/membership/usePersonalMembership";
import { useGetUltimateId } from "../../../service/membership/useGetUltimateId";

export const ModalAddMembership = ({ setPlanElegido, open, setOpen }) => {
    const [form, setForm] = useState({
        idPlan: 15,
        mesesDuracion: 0,
        nombre: "",
        precio: 0,
        descripcion: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await usePersonalMembership(
                form.mesesDuracion,
                form.nombre,
                form.precio,
                form.descripcion
            );

            if (response.status == 200 || response.status == "200") {
                const traerData = await useGetUltimateId();
                console.log(traerData.data, "traerData");
                
                setOpen(false);
                setPlanElegido({ ...form, id: traerData.data });
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalLayout open={open} setOpen={setOpen}>
            <form>
                <div>
                    <label className="font-semibold text-start w-full" htmlFor="nombre">
                        Nombre
                    </label>
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
                    <label className="font-semibold text-start w-full" htmlFor="mesesDuracion">
                        Meses de duración:
                    </label>
                    <CustomInput
                        type="number"
                        name="mesesDuracion"
                        value={form.mesesDuracion}
                        onChange={handleChange}
                        placeholder="Meses de duración"
                        label="Meses de duración"
                        className="mb-4"
                    />
                </div>
                <div>
                    <label className="font-semibold text-start w-full" htmlFor="precio">
                        Precio:
                    </label>
                    <CustomInput
                        type="number"
                        name="precio"
                        value={form.precio}
                        onChange={handleChange}
                        placeholder="Precio"
                        label="Precio"
                        className="mb-4"
                    />
                </div>
                <div>
                    <label className="font-semibold text-start w-full" htmlFor="descripcion">
                        Descripción:
                    </label>
                    <CustomInput
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        placeholder="Descripción"
                        label="Descripción"
                        className="mb-4"
                    />
                </div>
                <ButtonSpinner onClick={handleSubmit} loading={loading} label="Guardar Cambios" />
            </form>
        </ModalLayout>
    );
};
