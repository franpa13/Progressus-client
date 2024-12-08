// Usar persistencia en Zustand (opcional)
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

export const useStoreCheckEx = create(persist(
  (set) => ({
    checkedExercises: {},
    toggleCheck: (ejercicioId, dia) => set((state) => {
      const key = `${ejercicioId}-${dia}`;
      const newCheckedExercises = { ...state.checkedExercises };
      newCheckedExercises[key] = !newCheckedExercises[key];
      return { checkedExercises: newCheckedExercises };
    }),
  }),
  { name: 'checked-exercises' } // Persistir en localStorage con esta clave
));
