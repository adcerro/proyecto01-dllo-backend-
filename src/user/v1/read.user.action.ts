import { UserModel, UserType } from "./user.model";

// DECLARE ACTION FUNCTION
async function readUserAction(filter:{}={}): Promise<UserType[]> {
  const results = await UserModel.find(filter);

  return results;
}

// EXPORT ACTION FUNCTION
export default readUserAction;
