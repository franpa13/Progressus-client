import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStoreCart = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const currentCart = get().cart;
        const existingProduct = currentCart.find((item) => item.id === product.id);

        if (existingProduct) {
          // Incrementar cantidad si ya está en el carrito
          set({
            cart: currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Agregar nuevo producto al carrito
          set({
            cart: [...currentCart, { ...product, quantity: 1 }],
          });
        }
      },
      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((item) => item.id !== id),
        });
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "shopping-cart", // Nombre clave en localStorage
    }
  )
);

export default useStoreCart;
