export const internalUserPermissions = {
  "company": { create: false, edit: false, view: false, delete: false },
  "users": { create: false, edit: false, view: false, delete: false },
  "permissions": { create: false, edit: false, view: false, delete: false },
  "departments": { create: false, edit: false, view: false, delete: false },
};

export const defaultPermissions = [
  {
    screen: "company",
    name: "Empresas",
  },
  {
    screen: "users",
    name: "Usuarios",
  },
  {
    screen: "permissions",
    name: "Perfiles",
  },
  {
    screen: "departments",
    name: "Departamentos",
  },
  {
    screen: "municipalities",
    name: "Municipios",
  },
];
