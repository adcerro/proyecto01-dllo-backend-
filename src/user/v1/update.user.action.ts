import { UserModel, UserType } from "./user.model";
import { UpdateUserType } from "./user.types";

// DECLARE ACTION FUNCTION
async function updateUserAction(id: string, userData: UpdateUserType): Promise<UserType | null> {

    const result = await UserModel.findByIdAndUpdate(id, userData, { returnDocument: 'after', new: true });
    return result;

}

// EXPORT ACTION FUNCTION
export default updateUserAction;
