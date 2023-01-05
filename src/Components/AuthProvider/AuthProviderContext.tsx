import { createContext } from "react";
import { AuthUser } from "../Types/AuthUserContext";

const AuthProviderContext = createContext<AuthUser>({
  user: {
    auth: false,
    role: ""
  },
  login: function (): { auth: boolean; role: any; } {
    throw new Error("Function not implemented.");
  },
  logout: function (): void {
    throw new Error("Function not implemented.");
  }
});

export default AuthProviderContext;