import { roles } from "../models/roles";

export const createRole = async (role: string) => {
  try {
    const newRole = await roles.create({
      role,
    });
    console.log("Role created with id= "+newRole.id);
    return newRole.id;
  } catch (error) {
    console.error(error);

  }
};
