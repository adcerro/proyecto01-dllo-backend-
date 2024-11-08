import { UserModel, UserType } from "./user.model";

// DECLARE ACTION FUNCTION
async function deleteUserAction(email: string): Promise<UserType|null> {
  const user = await UserModel.findOneAndUpdate({email:email},{active:false},{returnDocument:'after',new:true});

  return user;
}

// EXPORT ACTION FUNCTION
export default deleteUserAction;
