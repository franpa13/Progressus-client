import { useMemo } from "react";

export const useFindElement = (array, id) => {
  return useMemo(() => {
    return array.find((element) => element.id === id) || null;
  }, [array, id]);
};
