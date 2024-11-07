import { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
type UserType = {
    _id: string;
    name: string;
    email: string;
    password: string;
    book_creator: boolean;
    book_modifier: boolean;
    book_deleter: boolean;
    user_modifier: boolean;
    user_deleter: boolean;
    active: boolean;
};

// DECLARE MONGOOSE SCHEMA
const UserSchema = new Schema<UserType>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    book_creator: {
        type: Boolean,
        default: false
    },
    book_modifier: {
        type: Boolean,
        default: false
    },
    book_deleter: {
        type: Boolean,
        default: false
    },
    user_modifier: {
        type: Boolean,
        default: false
    },
    user_deleter: {
        type: Boolean,
        default: false
    },
    active:{
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false,
});

// DECLARE MONGO MODEL
const UserModel = model<UserType>("User", UserSchema);

// EXPORT ALL
export { UserModel, UserSchema, UserType };
