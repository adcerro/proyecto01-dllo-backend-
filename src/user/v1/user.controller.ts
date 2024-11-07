import createUserAction from "./create.user.action";
import {readUsersAction,readUserAction} from "./read.user.action";
import { UserType } from "./user.model";
import { CreateUserType } from "./user.types";

// DECLARE CONTROLLER FUNCTIONS
async function readUsers(filter:{}={}): Promise<UserType[]> {
  const users = await readUsersAction(filter);

  return users;
}
async function readUser(email:string): Promise<UserType|null> {
  const user = await readUserAction(email);

  return user;
}
async function createUser(userData: CreateUserType): Promise<UserType> {
  const createdUser = await createUserAction(userData);

  return createdUser;
}

// EXPORT CONTROLLER FUNCTIONS
export { readUsers,readUser, createUser };
