import * as passport from "passport";
import * as passportLocal from "passport-local";
import _ from "lodash";
import User from "../Models/MongooseModels/UserSchema";
import { verify } from 'password-hash'

const LocalStrategy = passportLocal.Strategy;

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email }, (err, user: any) => {
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        const isPasswordCorrect = verify(password, user.password)
        if (isPasswordCorrect) {
            return done(undefined, user);
        }
        return done(undefined, false, { message: "Invalid email or password." });
    });
}));

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

export default passport
