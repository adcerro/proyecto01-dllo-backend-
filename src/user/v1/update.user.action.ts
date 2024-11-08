import { UserModel, UserType } from "./user.model";
import { UpdateUserType } from "./user.types";

// DECLARE ACTION FUNCTION
async function updateUserAction(email: string, userData: UpdateUserType): Promise<UserType | null> {

    const updatedUser = await UserModel.findOneAndUpdate({email:email}, userData, { returnDocument: 'after', new: true });
    return updatedUser;

}

// EXPORT ACTION FUNCTION
export default updateUserAction;
