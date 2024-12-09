// Usar persistencia en Zustand (opcional)
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStoreCheckEx = create(
  persist(
    (set, get) => ({
      checkedExercises: {}, // { "exerciseId-day": true/false }
      disabledCheckboxes: {}, // { "day": true/false }

      toggleCheck: (exerciseId, day) => {
        const key = `${exerciseId}-${day}`;
        set((state) => ({
          checkedExercises: {
            ...state.checkedExercises,
            [key]: !state.checkedExercises[key], // Alternar estado
          },
        }));
      },

      isChecked: (exerciseId, day) => {
        const key = `${exerciseId}-${day}`;
        return !!get().checkedExercises[key];
      },

      setDisabledForDay: (day, disabled) => {
        set((state) => ({
          disabledCheckboxes: {
            ...state.disabledCheckboxes,
            [day]: disabled,
          },
        }));
      },

      isDisabledForDay: (day) => {
        return !!get().disabledCheckboxes[day];
      },
      clearStorage: () => {
        set({ checkedExercises: {}, disabledCheckboxes: {} });
        localStorage.removeItem("exercise-check-storage"); // Borra la persistencia
      },
    }),
    {
      name: "exercise-check-storage", // Clave en localStorage
    }
  )
);
