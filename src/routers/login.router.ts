import {Router} from "express";
import multer from "multer";
import passport from "../middlewares/passport";
import {LoginController} from "../controllers/login.controller";

const loginRouter = Router();
const upload = multer();

loginRouter.get('/login', (req, res) => {
    res.render('login');
});

loginRouter.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));

loginRouter.get(
    '/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/book/list');
    }
)

loginRouter.post('/login', upload.none(), LoginController.traditionalLogin);
export default loginRouter;