import { useAuthStore } from "../store/authStore";
import type { AuthRole } from "../types";

export function useHasRole(roles: AuthRole[]): boolean {
  const user = useAuthStore((state) => state.user);
  return !!user && roles.includes(user.role.code);
}