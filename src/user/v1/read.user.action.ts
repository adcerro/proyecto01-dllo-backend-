import { UserModel, UserType } from "./user.model";

// DECLARE ACTION FUNCTION
async function readUsersAction(filter:{}={}): Promise<UserType[]> {
  const results = await UserModel.find(filter);

  return results;
}

async function readUserAction(email:string): Promise<UserType|null> {
  const result = await UserModel.findOne({email:email});

  return result;
}

// EXPORT ACTION FUNCTION
export {readUsersAction, readUserAction};
