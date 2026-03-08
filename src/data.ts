import { UserRole, ActiveRole } from "./types/index.js";

export const userRoles: UserRole[] = [
  {
    id: "1",
    name: "Superadmin",
    type: "DEFAULT",
    dateCreated: "2023-01-01",
    status: "Active",
    users: [
      { id: "u1", name: "Alice Brown", avatar: "AB" },
      { id: "u2", name: "Mark Evans", avatar: "ME" },
      { id: "u3", name: "Kim Lee", avatar: "KL" },
      { id: "u4", name: "Omar Park", avatar: "OP" },
      { id: "u5", name: "Quinn Ross", avatar: "QR" },
      { id: "u6", name: "Sara Todd", avatar: "ST" },
      { id: "u7", name: "Tom Upton", avatar: "TU" },
    ],
  },
  {
    id: "2",
    name: "Merchantadmin",
    type: "DEFAULT",
    dateCreated: "2023-02-01",
    status: "Active",
    users: [
      { id: "u8", name: "Nora Black", avatar: "NB" },
      { id: "u9", name: "Owen Clark", avatar: "OC" },
      { id: "u10", name: "Paula Diaz", avatar: "PD" },
      { id: "u11", name: "Quinn Evans", avatar: "QE" },
      { id: "u12", name: "Ryan Ford", avatar: "RF" },
      { id: "u13", name: "Sara Green", avatar: "SG" },
    ],
  },
  {
    id: "3",
    name: "supportadmin",
    type: "DEFAULT",
    dateCreated: "2023-02-01",
    status: "Active",
    users: [
      { id: "u14", name: "Sam Adams", avatar: "SA" },
      { id: "u15", name: "Tara Brown", avatar: "TB" },
      { id: "u16", name: "Uma Clark", avatar: "UC" },
      { id: "u17", name: "Vera Davis", avatar: "VD" },
    ],
  },
  {
    id: "4",
    name: "sales personnel",
    type: "CUSTOM",
    dateCreated: "2023-03-01",
    status: "Active",
    users: [
      { id: "u18", name: "Sam Parker", avatar: "SP" },
      { id: "u19", name: "Wendy Baker", avatar: "WB" },
      { id: "u20", name: "Xavier Cole", avatar: "XC" },
    ],
  },
  {
    id: "5",
    name: "Deputy sales personnel",
    type: "CUSTOM",
    dateCreated: "2023-04-01",
    status: "InActive",
    users: [
      { id: "u21", name: "Dana Peters", avatar: "DP" },
      { id: "u22", name: "Yara Blake", avatar: "YB" },
      { id: "u23", name: "Zoe Craig", avatar: "ZC" },
      { id: "u24", name: "Adam Dean", avatar: "AD" },
    ],
  },
  {
    id: "6",
    name: "Developeradmin",
    type: "SYSTEM-CUSTOM",
    dateCreated: "2023-05-01",
    status: "Active",
    users: [
      { id: "u25", name: "Dev Anand", avatar: "DA" },
      { id: "u26", name: "Beth Bryan", avatar: "BB" },
      { id: "u27", name: "Carl Cole", avatar: "CC" },
      { id: "u28", name: "Diana Clark", avatar: "DC" },
    ],
  },
  {
    id: "7",
    name: "Developer-basic",
    type: "SYSTEM-CUSTOM",
    dateCreated: "2023-06-01",
    status: "Active",
    users: [
      { id: "u29", name: "Dev Basic", avatar: "DB" },
      { id: "u30", name: "Eva Brown", avatar: "EB" },
      { id: "u31", name: "Frank Cole", avatar: "FC" },
      { id: "u31", name: "Michael Ade", avatar: "MA" },
    ],
  },
];

export const activeRoles: ActiveRole[] = [
  { id: "r1", name: "Superadmin", lastActive: "06/2023", isDefault: true },
  { id: "r2", name: "Developeradmin", lastActive: "01/2023", isDefault: false },
  { id: "r3", name: "Supportadmin", lastActive: "10/2022", isDefault: false },
];
