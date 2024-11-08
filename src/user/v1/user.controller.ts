import createUserAction from "./create.user.action";
import {readUserAction} from "./read.user.action";
import { UserType } from "./user.model";
import { CreateUserType , UpdateUserType} from "./user.types";
import updateUserAction from "./update.user.action";
import deleteUserAction from "./delete.user.action";

// DECLARE CONTROLLER FUNCTIONS

async function readUser(email:string, active:boolean=true): Promise<UserType|null> {
  const user = await readUserAction(email,active);

  return user;
}
async function deleteUser(email:string): Promise<UserType|null> {
  const user = await deleteUserAction(email);

  return user;
}
async function createUser(userData: CreateUserType): Promise<UserType> {
  const createdUser = await createUserAction(userData);

  return createdUser;
}
async function updateUser(email:string,userData:UpdateUserType): Promise<UserType|null> {
  const updatedUser = await updateUserAction(email,userData);

  return updatedUser;
}
// EXPORT CONTROLLER FUNCTIONS
export {readUser, createUser,updateUser, deleteUser};
