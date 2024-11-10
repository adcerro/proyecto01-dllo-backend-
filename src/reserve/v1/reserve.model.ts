import { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
type ReserveType = {
    _id: string;
    name: string;
    email: string;
    title: string;
    book_id: string;
    reserve_date: Date;
    returned: boolean;
    return_date:Date;
};

// DECLARE MONGOOSE SCHEMA
const ReserveSchema = new Schema<ReserveType>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    book_id:{
        type: String,
        required: true
    },
    returned:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: "reserve_date",
        updatedAt: "return_date"
    },
    versionKey: false,
});

// DECLARE MONGO MODEL
const ReserveModel = model<ReserveType>("Reserve", ReserveSchema);

// EXPORT ALL
export { ReserveModel, ReserveSchema, ReserveType };