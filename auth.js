import passport from "passport";
import { Strategy as GoogleStragety } from "passport-google-oauth2";
import dotenv from "dotenv";

dotenv.config();

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
	new GoogleStragety(
		{
			clientID: googleClientID,
			clientSecret: googleClientSecret,
			callbackURL: "http://localhost:5173/google/callback",
			passReqToCallback: true,
		},
		function (request, accessToken, refreshToken, profile, done) {
			return done(null, profile);
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});
