import {Schema, model} from "mongoose";

interface IBook {
    category: object;
    name: string;
    author: string;
    keywords: object[];
    publishingHouse: object;
}

const keywordSchema = new Schema({
    keyword: String
});

const bookSchema = new Schema<IBook>({
    category: {type: Schema.Types.ObjectId, ref: "Category"},
    name: String,
    author: String,
    keywords: [keywordSchema],
    publishingHouse: {type: Schema.Types.ObjectId, ref: "PublishingHouse"}
});

const Book = model<IBook>('Book', bookSchema);

export {Book};