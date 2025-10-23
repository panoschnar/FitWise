// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuthQueries } from "../hooks/useAuth";
// import { retrieveObject } from "../utils/localStorage";

// const AuthContext = createContext<any>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<any>(null);
//   const { loginMutation, registerMutation, logout } = useAuthQueries();

//   // restore user from localStorage
//   useEffect(() => {
//     const stored = retrieveObject("user");
//     if (stored) setUser(stored);
//   }, []);

//   // sync when login/register success
//   useEffect(() => {
//     if (loginMutation.isSuccess) setUser(loginMutation.data);
//     if (registerMutation.isSuccess) setUser(registerMutation.data);
//   }, [loginMutation.isSuccess, registerMutation.isSuccess]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isLoading: loginMutation.isPending || registerMutation.isPending,
//         login: (email: string, password: string) =>
//           loginMutation.mutateAsync({ email, password }),
//         register: (email: string, password: string, name: string) =>
//           registerMutation.mutateAsync({ email, password, name }),
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
