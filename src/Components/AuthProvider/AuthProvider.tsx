import  React, {useState, useContext, FC, PropsWithChildren, useMemo, useCallback } from "react";
import { AuthUser } from "../Types/AuthUserContext";
import AuthProviderContext from "./AuthProviderContext";

function useAuthProvide() : AuthUser {
    const [user, setUser] = useState(
        {
            auth: false,
            role: "",
        });

    let login = useCallback(() => {
        const token = localStorage.getItem("token");

        if (Boolean(token) && token !== "undefined" && token !== "null") {
            let data = token?.split(".")[1] ?? '';
            let decodedData = JSON.parse(window.atob(data));

            let role = decodedData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            let receivedUser = { auth: true, role };

            setUser(receivedUser);
            return receivedUser;
        }

        return user;
    },[user]);

    let logout = () => {
        setUser({ auth: false, role: "" });
        localStorage.removeItem("token");
    }

    return useMemo(() => ({ user, login, logout }),[login, user]);
}

export function useAuth() {
    return useContext(AuthProviderContext);
}



const AuthProvider : FC<PropsWithChildren> = ({ children }) => {

    const authUser = useAuthProvide();

    return (
        <AuthProviderContext.Provider value={authUser}>
            {children}
        </AuthProviderContext.Provider>
    );
}

export default AuthProvider;

