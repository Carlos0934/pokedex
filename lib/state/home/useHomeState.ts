import { useContext } from "preact/hooks";
import { HomeStateContext } from "./context.ts";

export const useHomeState = () => {
  const context = useContext(HomeStateContext);

  if (!context) {
    throw new Error("useHomeState must be used within a HomeStateProvider");
  }
  return context;
};
