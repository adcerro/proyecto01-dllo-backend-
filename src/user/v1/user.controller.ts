import createUserAction from "./create.user.action";
import readUserAction from "./read.user.action";
import { UserType } from "./user.model";
import { CreateUserType } from "./user.types";

// DECLARE CONTROLLER FUNCTIONS
async function readUsers(filter:{}={}): Promise<UserType[]> {
  const users = await readUserAction(filter);

  return users;
}
async function createUser(userData: CreateUserType): Promise<UserType> {
  const createdUser = await createUserAction(userData);

  return createdUser;
}

// EXPORT CONTROLLER FUNCTIONS
export { readUsers, createUser };
