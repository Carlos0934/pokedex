import { createContext } from "preact";
import { homeState, HomeStateType } from "./state.ts";

export const HomeStateContext = createContext<HomeStateType>(
  homeState,
);
