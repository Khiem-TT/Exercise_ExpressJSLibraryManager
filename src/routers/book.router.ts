import {Router} from "express";
import multer from "multer";
import {Book} from "../models/schemas/book.schema";
import {BookController} from "../controllers/book.controller";

const bookRouter = Router();
const upload = multer();

bookRouter.get('/create', (req, res) => {
    res.render('createBook');
});

bookRouter.post('/create', upload.none(), BookController.createBook);

bookRouter.get('/list', BookController.getListPage);

export default bookRouter;