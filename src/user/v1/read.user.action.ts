import { UserModel, UserType } from "./user.model";

// DECLARE ACTION FUNCTION

async function readUserAction(email:string,active:boolean=true): Promise<UserType|null> {

  const result = await UserModel.findOne({email:email,active:active});
  
  return result;
}

// EXPORT ACTION FUNCTION
export {readUserAction};
