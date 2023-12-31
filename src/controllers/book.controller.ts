import {Book} from "../models/schemas/book.schema";
import {Category} from "../models/schemas/category.schema";
import {PublishingHouse} from "../models/schemas/publishingHouse.schema";

export class BookController {
    static async createBook(req, res) {
        try {
            const newCategory = new Category({
                name: req.body.category
            });
            const newPublishingHouse = new PublishingHouse({
                name: req.body.publishingHouse
            });
            const newBook = new Book({
                category: newCategory,
                name: req.body.name,
                author: req.body.author,
                publishingHouse: newPublishingHouse
            });
            newBook.keywords.push({keyword: req.body.keyword});
            const p1 = newCategory.save();
            const p2 = newPublishingHouse.save();
            const p3 = newBook.save();
            let [category, publishingHouse, book] = await Promise.all([p1, p2, p3]);
            if (book) {
                res.render('success');
            } else {
                res.render('error');
            }
        } catch (err) {
            res.render('error');
        }
    }

    static async getListPage(req, res) {
        try {
            let query = {};
            if (req.query.keyword && req.query.keyword != '') {
                let keywordFind = req.query.keyword || '';
                query = {
                    "keywords.keyword": {
                        $regex: keywordFind
                    }
                }
            }
            if (req.query.publishingHouse && req.query.publishingHouse != '') {
                let publishingHouseFind = req.query.publishingHouse || '';
                let publishingHouse = await PublishingHouse.find({name: {$regex: publishingHouseFind}});
                query = {
                    ...query,
                    publishingHouse
                }
            }
            const books = await Book.find(query).populate('category').populate('publishingHouse');
            res.render('listBook', {books});
        } catch (err) {
            res.render('error');
        }
    }
}