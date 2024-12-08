import { create } from "zustand";

const alertToCartStore = create((set) => ({
  alertToCart: JSON.parse(localStorage.getItem("alertToCart")) || false, // Leer desde localStorage
  setAlertToCart: (value) => {
    localStorage.setItem("alertToCart", JSON.stringify(value)); // Guardar en localStorage
    set({ alertToCart: value });
  },
}));

export default alertToCartStore;
