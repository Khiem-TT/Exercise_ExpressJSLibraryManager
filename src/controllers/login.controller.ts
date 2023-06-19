import passport from "../middlewares/passport";

export class LoginController {
    static async traditionalLogin(req, res, next) {
        passport.authenticate('local', (err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send("Wrong email or password");
            }
            req.login(user, () => {
                res.redirect('/book/list');
            })
        })(req, res, next)
    }
}