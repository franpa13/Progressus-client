import React, { useState, useEffect } from 'react';
import { ModalLayout } from '../../layout/ModalLayout';
import { api } from '../../service/api';
import { ButtonSpinner } from '../ui/buttons/ButtonSpinner';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Box,
    Typography,
    Button
} from '@mui/material';
import { useGetAllProducts } from '../../service/shop/useGetAllProducts';

export const ModalEditProd = ({ open, setOpen, editable, setData }) => {
    // Estado del formulario
    const [formData, setFormData] = useState({
        id: 0,
        nombre: '',
        descripcion: '',
        categoria: '',
        marca: '',
        stock: 0,
        talle: '',
        precio: 0,
        popular: false,
        imagenUrl: ''
    });

    // Estados para manejo de la UI
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Cargar datos del producto cuando cambia 'editable'
    useEffect(() => {
        if (editable) {
            setFormData({
                id: editable.id || 0,
                nombre: editable.nombre || '',
                descripcion: editable.descripcion || '',
                categoria: editable.categoria || '',
                marca: editable.marca || '',
                stock: editable.stock || 0,
                talle: editable.talle || '',
                precio: editable.precio || 0,
                popular: editable.popular || false,
                imagenUrl: editable.imagenUrl || ''
            });
        }
    }, [editable]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.put(
                `https://progressuscenter.azurewebsites.net/api/Merch/Editar/${formData.id}`,
                formData
            );

            if (response.status === 200) {
                setSuccess(true);
                setTimeout(async () => {
                    const traerProd = await useGetAllProducts();
                    const allProducts = traerProd?.data.value || [];

                    setData(allProducts);
                    setOpen(false);
                    setSuccess(false);

                }, 1500);
            }
        } catch (err) {
            console.error('Error al editar producto:', err);

        } finally {
            setLoading(false);
        }
    };

    // Categorías y talles predefinidos (puedes modificarlos según tus necesidades)
    const categorias = ['Ropa', 'Accesorios', 'Calzado', 'Otros'];
    const talles = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Único'];

    return (
        <ModalLayout
            Icon=""
            open={open}
            setOpen={setOpen}

        >
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                {success ? (
                    <Typography color="success.main" textAlign="center">
                        ¡Producto actualizado correctamente!
                    </Typography>
                ) : (
                    <>
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="Descripción"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={3}
                        />

                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Categoría</InputLabel>
                                <Select
                                    name="categoria"
                                    value={formData.categoria}
                                    label="Categoría"
                                    onChange={handleChange}
                                    required
                                >
                                    {categorias.map((cat) => (
                                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Marca"
                                name="marca"
                                value={formData.marca}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleChange}
                                margin="normal"
                                inputProps={{ min: 0 }}
                            />

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Talle</InputLabel>
                                <Select
                                    name="talle"
                                    value={formData.talle}
                                    label="Talle"
                                    onChange={handleChange}
                                >
                                    {talles.map((talle) => (
                                        <MenuItem key={talle} value={talle}>{talle}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Precio"
                                name="precio"
                                type="number"
                                value={formData.precio}
                                onChange={handleChange}
                                margin="normal"
                                inputProps={{ min: 0, step: "0.01" }}
                            />
                        </Box>

                        <TextField
                            fullWidth
                            label="URL de la imagen"
                            name="imagenUrl"
                            value={formData.imagenUrl}
                            onChange={handleChange}
                            margin="normal"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="popular"
                                    checked={formData.popular}
                                    onChange={handleChange}
                                />
                            }
                            label="Producto popular"
                            sx={{ mt: 2 }}
                        />

                        {error && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}

                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                onClick={() => setOpen(false)}
                                variant="outlined"
                            >
                                Cancelar
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"

                            >
                                {loading ? "..." : 'Guardar Cambios'}

                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </ModalLayout>
    );
};