export interface RoleUser {
  id: string;
  name: string;
  avatar: string;
}

export type RoleStatus = "Active" | "InActive";
export type RoleType = "DEFAULT" | "CUSTOM" | "SYSTEM-CUSTOM";

export interface UserRole {
  id: string;
  name: string;
  type: RoleType;
  dateCreated: string;
  status: RoleStatus;
  users: RoleUser[];
}

export interface ActiveRole {
  id: string;
  name: string;
  lastActive: string; // e.g. "06/2023"
  isDefault: boolean;
}

export interface CreateRoleBody {
  name: string;
  type: RoleType;
}

export interface UpdateRoleBody {
  name?: string;
  status?: RoleStatus;
}

export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
}

export interface ApiError {
  error: string;
}

export interface RoleListQuery {
  status?: string;
  type?: string;
  search?: string;
}
