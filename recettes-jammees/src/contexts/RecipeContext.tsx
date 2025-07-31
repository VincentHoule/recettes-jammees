import React, { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type User from "../interfaces/User";

export interface GlobalContextTypes {
  user : User |undefined
  setUser : Dispatch<SetStateAction<User |undefined>>
}

interface AppContextProps {
  children: ReactNode;
}


const RecipeContext = createContext<GlobalContextTypes>({} as GlobalContextTypes);


type Props = { children: ReactNode }

export default function RecipeContextProvider({ children }: Props) {
  const [user, setUser] = useState<User>();

  const context: GlobalContextTypes = { user, setUser };

  return (
    // <ExampleContext value={context}> // v19
    <RecipeContext.Provider value={context}>
      {children}
    </RecipeContext.Provider>
  );
}

export { RecipeContext, RecipeContextProvider };