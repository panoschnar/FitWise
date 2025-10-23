"use cient";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IUser, IMetrics } from "../utils/interfaces";
import { storeObject } from "../utils/localStorage";

export function useUserDetails(userId?: string) {
  const queryClient = useQueryClient();

  // Fetch user
  const userQuery = useQuery({
    queryKey: ["fullUser", userId],
    queryFn: async () => {
      if (!userId) return null;
      const res = await axios.get(`/api/user/${userId}`);
      return res.data.data as IUser;
    },
    enabled: !!userId,
  });

  // Update user
  const updateUser = useMutation({
    mutationFn: async (updatedData: Partial<IUser>) => {
      const res = await axios.put(`/api/user/${userId}`, { ...updatedData });
      // Update User to localStorgae
      const updatedUser = res.data.data as IUser;

      storeObject("fitwise-user", {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        metrics: !!updatedUser.metrics?.length,
        preferences: !!updatedUser.preferences,
        goals: !!updatedUser.goals,
      });
      return updatedUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fullUser", userId] });
    },
  });

  // Add Metric to user
  const addMetricToUser = useMutation({
    mutationFn: async (metricData: Partial<IMetrics>) => {
      if (!userId) throw new Error("User ID is required");
      const res = await axios.post(`/api/user/${userId}`, metricData);
      return res.data.data as IMetrics;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fullUser", userId] });
    },
  });
// Generate AI Plans
  const generateAiPlans = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User ID is required for AI plan generation");
      const res = await axios.post("/api/ai", { id: userId });
      return res.data.data; 
    },
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["fullUser", userId] });
  },
  });
  return {
    ...userQuery,
    updateUser,
    addMetricToUser,
    generateAiPlans
  };
}
