import express from "express";
import bodyParser from "body-parser";
import {DatabaseModel} from "./src/models/database.model";
import bookRouter from "./src/routers/book.router";
import passport from "./src/middlewares/passport";
import loginRouter from "./src/routers/login.router";
import session from "express-session";

const port = 8000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(bodyParser.json());
app.use('/book', bookRouter);
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(loginRouter);

DatabaseModel.connectDB()
    .then(() => console.log('DB connected!'))
    .catch(error => console.log('DB connection error', error.message));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});