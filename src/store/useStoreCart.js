import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStoreCart = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        console.log(product, "product en store");


        const currentCart = get().cart;
        const existingProduct = currentCart.find((item) => item.id === product.id);

        if (existingProduct) {
          // Incrementar cantidad si ya está en el carrito
          set({
            cart: currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity  }
                : item
            ),
          });
        } else {
          // Agregar nuevo producto al carrito
          set({
            cart: [...currentCart, { ...product }],
          });
        }
      },
      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((item) => item.id !== id),
        });
      },
      updateQuantity: (id, quantity) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, quantity } : { ...item, quantity }
          ),
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
