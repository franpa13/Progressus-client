import React, { useEffect, useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { CustomInput } from "../ui/input/CustomInput";
import { SelectDef } from "../ui/select/SelectDef"; // Importa SelectDef
import { useGetCategories } from "../../service/shop/useGetCategories";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { useCreateProd } from "../../service/shop/useCreateProd";
import { useGetAllProducts } from "../../service/shop/useGetAllProducts";

export const ModalAddProd = ({ setAlertAddProd, open, setOpen, setProd , setFilteredProducts }) => {
  // Estado inicial del producto
  const [load, setLoad] = useState(false);
  const [categories, setCategories] = useState([]); // Categorías desde el backend
  const [formData, setFormData] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    categoria: "",
    marca: "",
    stock: 0,
    talle: "",
    precio: 0,
    popular: false,
    imagenUrl: "",
  });
  const initialFormState = {
    id: 0,
    nombre: "",
    descripcion: "",
    categoria: "",
    marca: "",
    stock: 0,
    talle: "",
    precio: 0,
    popular: false,
    imagenUrl: "",
  };
  // Obtener categorías
  useEffect(() => {
    const traerCategorias = async () => {
      try {
        const res = await useGetCategories();
        setCategories(res?.data || []);
      } catch (error) {
        console.error("Error al traer categorías:", error);
      }
    };
    traerCategorias();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseInt(value, 10)
          : value,
    });
  };

  // Manejar cambio de categoría
  const handleCategoryChange = (e) => {
    setFormData({ ...formData, categoria: e.target.value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    try {
      const sendForm = await useCreateProd(formData);
      console.log(sendForm, "send form");
      if ((sendForm && sendForm.status == 200) || sendForm.status == 201) {
        const traerProd = await useGetAllProducts();
        const allProducts = traerProd?.data.value || [];
        setProd(allProducts);
        setFilteredProducts(allProducts);
        setOpen(false);
        setAlertAddProd(true);
        setFormData(initialFormState);
      }
    } catch (e) {
      console.log(e, "error");
    } finally {
      setLoad(false);
    }
  };

  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <form
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="mb-2 mt-1" htmlFor="nombre">
            Nombre
          </label>
          <CustomInput
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
        </div>
        <div>
          <label className="mb-2" htmlFor="descripcion">
            Descripción
          </label>
          <CustomInput
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
        </div>
        <div>
          <label className="mb-2" htmlFor="categoria">
            Categoría
          </label>
          <SelectDef
            sx={{ bgcolor: "white" }}
            value={formData.categoria}
            onChange={handleCategoryChange}
            label=""
            options={categories.map((cat) => cat.nombre)}
          />
        </div>
        <div>
          <label className="mb-2" htmlFor="marca">
            Marca
          </label>
          <CustomInput
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            placeholder="Marca"
            required
          />
        </div>
        <div>
          <label className="mb-2" htmlFor="stock">
            Stock
          </label>
          <CustomInput
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />
        </div>
        <div>
          <label className="mb-2" htmlFor="talle">
            Talle
          </label>
          <CustomInput
            name="talle"
            value={formData.talle}
            onChange={handleChange}
            placeholder="Talle"
            required
          />
        </div>
        <div>
          <label className="mb-2" htmlFor="precio">
            Precio
          </label>
          <CustomInput
            name="precio"
            type="number"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Precio"
            required
          />
        </div>
        <div>
          <label htmlFor="imagenUrl">URL de la imagen</label>
          <CustomInput
            name="imagenUrl"
            value={formData.imagenUrl}
            onChange={handleChange}
            placeholder="URL de la Imagen"
          />
        </div>
        <div className="flex justify-end p-4">
          <ButtonSpinner
            loading={load}
            type="submit"
            label="Agregar producto"
          />
        </div>
      </form>
    </ModalLayout>
  );
};
