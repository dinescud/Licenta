// import React, { createContext, useContext, useState, useEffect } from "react";
// import { UserContext } from "../types";
// import { registerProfile } from "../services/authService";

// interface AuthState {
//     loggedIn: boolean | null;
//     user: UserContext | null;
// }

// interface AuthContextType {
//     auth: AuthState;
//     login: (userContext: UserContext) => void;
//     logout: () => void;
//     loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [auth, setAuth] = useState<AuthState>({ loggedIn: null, user: null });
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const initializeAuth = async () => {
//             try {
//                 const userContext = await registerProfile();
//                 setAuth({ loggedIn: true, user: userContext });
//             } catch (error) {
//                 console.error('Failed to initialize auth:', error);
//                 setAuth({ loggedIn: false, user: null });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         initializeAuth();
//     }, []);

//     const login = (userContext: UserContext) => {
//         setAuth({ loggedIn: true, user: userContext });
//     };

//     const logout = () => {
//         setAuth({ loggedIn: false, user: null });
//     };

//     return (
//         <AuthContext.Provider value={{ auth, login, logout, loading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };