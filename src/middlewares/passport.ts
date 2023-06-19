import passport from "passport";
import {User} from "../models/schemas/user.schema";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth2";

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use('local', new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({username});
    if (!user) {
        return done(null, false);
    } else {
        if (user.password === password) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
}));

passport.use(new GoogleStrategy({
        clientID: '959089008601-hi1j1uo9rqeg7j7e0q3vte6lvmbgkvo2.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8000/google/callback',
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({'google.id': profile.id});
            if (existingUser) {
                return done(null, existingUser);
            }
            const newUser = new User({
                google: {
                    id: profile.id
                },
                username: profile.email[0].value,
                password: null
            });
            await newUser.save();
            return done(null, newUser);
        } catch (err) {
            return done(null, false);
        }
    }
));

export default passport;