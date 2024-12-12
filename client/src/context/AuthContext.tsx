// AuthContext.tsx
import React, { createContext } from "react";
import { User } from "../types";

type AuthContextType = {
  user?: User | null;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  logout?: () => void;
};

export const AuthContext = createContext<AuthContextType>({});
