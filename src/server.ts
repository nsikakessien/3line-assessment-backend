import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { userRoles, activeRoles } from "./data.js";
import {
  ApiError,
  ApiResponse,
  CreateRoleBody,
  RoleListQuery,
  RoleType,
  UpdateRoleBody,
  UserRole,
  ActiveRole,
} from "./types/index.js";

const app = express();
const PORT: number = Number(process.env.PORT) || 3001;

const VALID_TYPES: RoleType[] = ["DEFAULT", "CUSTOM", "SYSTEM-CUSTOM"];

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get(
  "/api/roles",
  (
    req: Request<{}, ApiResponse<UserRole[]>, {}, RoleListQuery>,
    res: Response,
  ) => {
    const { status, type, search } = req.query;
    let filtered: UserRole[] = [...userRoles];

    if (status) {
      filtered = filtered.filter(
        (r) => r.status.toLowerCase() === status.toLowerCase(),
      );
    }
    if (type) {
      filtered = filtered.filter(
        (r) => r.type.toLowerCase() === type.toLowerCase(),
      );
    }
    if (search) {
      filtered = filtered.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    res.json({ data: filtered, total: filtered.length, page: 1 });
  },
);

app.get(
  "/api/roles/active/list",
  (_req: Request, res: Response<ApiResponse<ActiveRole[]>>) => {
    res.json({ data: activeRoles });
  },
);

app.get(
  "/api/roles/:id",
  (
    req: Request<{ id: string }>,
    res: Response<ApiResponse<UserRole> | ApiError>,
  ) => {
    const role = userRoles.find((r) => r.id === req.params.id);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.json({ data: role });
  },
);

app.post(
  "/api/roles",
  (
    req: Request<{}, ApiResponse<UserRole> | ApiError, CreateRoleBody>,
    res: Response<ApiResponse<UserRole> | ApiError>,
  ) => {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ error: "name and type are required" });
    }
    if (!VALID_TYPES.includes(type)) {
      return res
        .status(400)
        .json({ error: `type must be one of ${VALID_TYPES.join(", ")}` });
    }

    const newRole: UserRole = {
      id: String(userRoles.length + 1),
      name,
      type,
      dateCreated: new Date().toISOString().split("T")[0],
      status: "Active",
      users: [],
    };
    userRoles.push(newRole);
    res.status(201).json({ data: newRole });
  },
);

app.patch(
  "/api/roles/:id",
  (
    req: Request<
      { id: string },
      ApiResponse<UserRole> | ApiError,
      UpdateRoleBody
    >,
    res: Response<ApiResponse<UserRole> | ApiError>,
  ) => {
    const role = userRoles.find((r) => r.id === req.params.id);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    const { status, name } = req.body;
    if (status) role.status = status;
    if (name) role.name = name;
    res.json({ data: role });
  },
);

app.delete(
  "/api/roles/:id",
  (
    req: Request<{ id: string }>,
    res: Response<{ data: UserRole; message: string } | ApiError>,
  ) => {
    const index = userRoles.findIndex((r) => r.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Role not found" });
    }
    const [removed] = userRoles.splice(index, 1);
    res.json({ data: removed, message: "Role deleted" });
  },
);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

export { app };

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`✅ Settings API running on http://localhost:${PORT}`);
  });
}
