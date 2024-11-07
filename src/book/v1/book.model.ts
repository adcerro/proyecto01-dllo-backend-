import { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
type BookType = {
    _id: string;
    title: string;
    author: string;
    genre: string;
    pub_date: Date;
    editor_house: string;
    active: boolean;
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
    },
    genre:{
        type: String,
        required: true
    },
    pub_date:{
        type:Date,
        required : true
    },
    editor_house: {
        type:String,
        required: true,
    },
    active:{
        type:Boolean,
        default: true
    }

},{
    timestamps: true,
    versionKey: false,
});

// DECLARE MONGO MODEL
const BookModel = model<BookType>("Book", BookSchema);

// EXPORT ALL
export { BookModel, BookSchema, BookType};