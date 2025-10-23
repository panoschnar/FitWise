import axios from "axios";
import {
  storeObject,
  retrieveObject,
  deleteObject,
} from "../utils/localStorage";
import { IUser } from "../utils/interfaces";


// Get user from localStorage (or null if not logged in)
export async function getUser(): Promise<IUser | null> {
  const user = retrieveObject("fitwise-user");
  return user ?? null;
}

export async function login(email: string, password: string): Promise<IUser> {
  const res = await axios.post("/api/login", { email, password });
  const user = res.data.data;
  storeObject("fitwise-user", user);
  return user;
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<IUser> {
  const res = await axios.post("/api/register", { name, email, password });
  const user = res.data.data;
  storeObject("fitwise-user", user);
  return user;
}

export async function logout(): Promise<void> {
  deleteObject("fitwise-user");
}
