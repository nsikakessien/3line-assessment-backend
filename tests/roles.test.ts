import request from "supertest";
import app from "../src/server";
import { UserRole, ActiveRole } from "../src/types/index";

describe("Settings API", () => {
  describe("GET /api/health", () => {
    it("returns status ok with timestamp", async () => {
      const res = await request(app).get("/api/health");
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("ok");
      expect(typeof res.body.timestamp).toBe("string");
    });
  });

  describe("GET /api/roles", () => {
    it("returns all roles with data and total", async () => {
      const res = await request(app).get("/api/roles");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(typeof res.body.total).toBe("number");
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("each role has the required typed fields", async () => {
      const res = await request(app).get("/api/roles");
      (res.body.data as UserRole[]).forEach((role) => {
        expect(typeof role.id).toBe("string");
        expect(typeof role.name).toBe("string");
        expect(["DEFAULT", "CUSTOM", "SYSTEM-CUSTOM"]).toContain(role.type);
        expect(typeof role.dateCreated).toBe("string");
        expect(["Active", "InActive"]).toContain(role.status);
        expect(Array.isArray(role.users)).toBe(true);
      });
    });

    it("filters by status=Active", async () => {
      const res = await request(app).get("/api/roles?status=Active");
      expect(res.status).toBe(200);
      (res.body.data as UserRole[]).forEach((r) =>
        expect(r.status).toBe("Active"),
      );
    });

    it("filters by status=InActive", async () => {
      const res = await request(app).get("/api/roles?status=InActive");
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
      (res.body.data as UserRole[]).forEach((r) =>
        expect(r.status).toBe("InActive"),
      );
    });

    it("filters by type=DEFAULT", async () => {
      const res = await request(app).get("/api/roles?type=DEFAULT");
      expect(res.status).toBe(200);
      (res.body.data as UserRole[]).forEach((r) =>
        expect(r.type).toBe("DEFAULT"),
      );
    });

    it("filters by type=SYSTEM-CUSTOM", async () => {
      const res = await request(app).get("/api/roles?type=SYSTEM-CUSTOM");
      expect(res.status).toBe(200);
      (res.body.data as UserRole[]).forEach((r) =>
        expect(r.type).toBe("SYSTEM-CUSTOM"),
      );
    });

    it("filters by search term (case-insensitive)", async () => {
      const res = await request(app).get("/api/roles?search=admin");
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
      (res.body.data as UserRole[]).forEach((r) =>
        expect(r.name.toLowerCase()).toContain("admin"),
      );
    });

    it("returns empty array for non-matching search", async () => {
      const res = await request(app).get("/api/roles?search=xyznonexistent");
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(0);
    });
  });

  describe("GET /api/roles/active/list", () => {
    it("returns active roles list with correct shape", async () => {
      const res = await request(app).get("/api/roles/active/list");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      (res.body.data as ActiveRole[]).forEach((r) => {
        expect(typeof r.id).toBe("string");
        expect(typeof r.name).toBe("string");
        expect(typeof r.lastActive).toBe("string");
        expect(typeof r.isDefault).toBe("boolean");
      });
    });
  });

  describe("GET /api/roles/:id", () => {
    it("returns a single role by id", async () => {
      const res = await request(app).get("/api/roles/1");
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe("1");
      expect(res.body.data.name).toBe("Superadmin");
    });

    it("returns 404 for unknown id", async () => {
      const res = await request(app).get("/api/roles/9999");
      expect(res.status).toBe(404);
      expect(res.body.error).toBe("Role not found");
    });
  });

  describe("POST /api/roles", () => {
    it("creates a new role with correct defaults", async () => {
      const res = await request(app)
        .post("/api/roles")
        .send({ name: "TestRole", type: "CUSTOM" });
      expect(res.status).toBe(201);
      const role: UserRole = res.body.data;
      expect(role.name).toBe("TestRole");
      expect(role.type).toBe("CUSTOM");
      expect(role.status).toBe("Active");
      expect(Array.isArray(role.users)).toBe(true);
      expect(role.users.length).toBe(0);
      expect(typeof role.dateCreated).toBe("string");
    });

    it("returns 400 when name is missing", async () => {
      const res = await request(app)
        .post("/api/roles")
        .send({ type: "CUSTOM" });
      expect(res.status).toBe(400);
      expect(typeof res.body.error).toBe("string");
    });

    it("returns 400 when type is missing", async () => {
      const res = await request(app)
        .post("/api/roles")
        .send({ name: "NoType" });
      expect(res.status).toBe(400);
    });

    it("returns 400 when type is invalid", async () => {
      const res = await request(app)
        .post("/api/roles")
        .send({ name: "Test", type: "INVALID_TYPE" });
      expect(res.status).toBe(400);
      expect(res.body.error).toContain("type must be one of");
    });
  });

  describe("PATCH /api/roles/:id", () => {
    it("updates a role status", async () => {
      const res = await request(app)
        .patch("/api/roles/2")
        .send({ status: "InActive" });
      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe("InActive");
    });

    it("updates a role name", async () => {
      const res = await request(app)
        .patch("/api/roles/3")
        .send({ name: "UpdatedName" });
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("UpdatedName");
    });

    it("returns 404 for unknown id", async () => {
      const res = await request(app)
        .patch("/api/roles/9999")
        .send({ status: "InActive" });
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/roles/:id", () => {
    it("deletes a role and returns it", async () => {
      const res = await request(app).delete("/api/roles/6");
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Role deleted");
      expect(typeof res.body.data.id).toBe("string");
    });

    it("returns 404 for already-deleted or unknown id", async () => {
      const res = await request(app).delete("/api/roles/9999");
      expect(res.status).toBe(404);
    });
  });
});
