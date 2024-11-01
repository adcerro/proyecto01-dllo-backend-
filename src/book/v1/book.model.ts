import { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
type BookType = {
    _id: string;
    title: string;
    author: string;
};

// DECLARE MONGOOSE SCHEMA
const BookSchema = new Schema<BookType>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false,
});

// DECLARE MONGO MODEL
const BookModel = model<BookType>("Book", BookSchema);

// EXPORT ALL
export { BookModel, BookSchema, BookType};