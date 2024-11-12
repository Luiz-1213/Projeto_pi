import { createContext, ReactNode } from "react";
import useAuth from "../hooks/useAuth.tsx";

interface AuthContextType {
  login: (user: { email: string; senha: string }) => Promise<any>;
}

const Context = createContext<any>(UserProvider);
interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const { authenticated, userRole, login, logout } = useAuth();
  return (
    <Context.Provider value={{ authenticated, userRole, login, logout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider,};
