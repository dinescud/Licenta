import React, { createContext, useContext, useEffect, useState } from "react";
import { GET_REQUEST } from "../services/requests";
import { UserContext } from "../types.ts";

const whoamiRequest = async () => {
    return GET_REQUEST('/auth/whoami');
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthState {
    loggedIn: boolean | null;
    user: UserContext| null;
}

interface AuthContextType {
    auth: AuthState;
    login: (userContext: UserContext) => void;
    logout: () => void;
    loading: boolean;
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider!');
    }
    return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<AuthState>({ loggedIn: null, user: null });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        whoamiRequest()
            .then(async (response) => {
                if(response.status === 200) {
                    const data = await response.json();
                    setAuth({ loggedIn: true, user: { id: data.id, name: data.name, mail: data.mail }});
                } else {
                    setAuth({ loggedIn: false, user: null });
                }
            })
            .catch(() => setAuth({ loggedIn: false, user: null }))
            .finally(() => setLoading(false));
    }, []);

    const login = (userContext: UserContext) => {
        setAuth({ loggedIn: true, user: userContext });
    };

    const logout = () => {
        setAuth({ loggedIn: false, user: null });
    }

    return <AuthContext.Provider value={{ auth, login, logout, loading }}>{children}</AuthContext.Provider>;
}