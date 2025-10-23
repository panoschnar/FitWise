"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, login, register, logout } from "../services/Auth";
import {
  LoginData,
  LoginSchema,
  RegisterData,
  RegisterSchema,
} from "../utils/validationSchemas";
import { IUser } from "../utils/interfaces";

export function useAuth() {
  const queryClient = useQueryClient();

  // 🔹 Load user (initially from localStorage)
  const userQuery = useQuery<IUser | null>({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
  });

  // 🔹 Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      // Zod validation before sending
      const parsed = LoginSchema.safeParse(credentials);
      if (!parsed.success) {
        const message = parsed.error.issues.map((e) => e.message).join(", ");
        throw new Error(message);
      }
      return login(credentials.email, credentials.password);
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
    },
  });

  // 🔹 Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      // Zod validation
      const parsed = RegisterSchema.safeParse(data);
      if (!parsed.success) {
        const message = parsed.error.issues.map((e) => e.message).join(", ");
        throw new Error(message);
      }
      return register(data.name, data.email, data.password);
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
    },
  });

  // 🔹 Logout
  const logoutMutation = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    loginMutation,
    registerMutation,
    logoutMutation,
  };
}
