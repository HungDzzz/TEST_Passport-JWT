const passport = require('passport')
const FacebookTokenStrategy = require('passport-facebook')
const GoogleTokenStrategy = require('passport-google-token').Strategy
const jwt = require('./utils/jwt')
const config = require('./utils/config')

module.exports = async function () {
    passport.use(new FacebookTokenStrategy({

            clientID: config.facebookAuth.clientID,

            clientSecret: config.facebookAuth.clientSecret

        },

        async function (accessToken, refreshToken, profile, done) {
            try
            {
                //Xem username tồn tại không?
                //let result = await User.checkExistsEmailAndUsername("FB" + profile.id)
                let token = await jwt.assignToken({user_id : 1, username: "FB" + profile.id, email: profile._json.email })
                //Không tồn tại thì tạo mới
                // if(result == 0)
                // {
                //     let id = await User.insertUserBySocial(
                //         "FB" + profile.id, 
                //         profile._json.email, 
                //         profile._json.name, 
                //         '@@!Fcar*^',
                //         profile.photos[0].value)

                //     token = await jwt.assignToken({user_id : id, username: "FB" + profile.id, email: profile._json.email })
                // }
                
                return done(token)
            }
            catch(e)
            {
                return done(e.message)
            }
        }));



    passport.use(new GoogleTokenStrategy({
            clientID: config.googleAuth.clientID,
            clientSecret: config.googleAuth.clientSecret
        },
        async function (accessToken, refreshToken, profile, done) {
            //Xem username tồn tại không?
            //let result = await User.checkExistsEmailAndUsername("GG" + profile.id)
            let token = await jwt.assignToken({user_id : 1, username: "GG" + profile.id, email: profile._json.email })
            //Không tồn tại thì tạo mới
            // if(result == 0)
            // {
            //     let id = await User.insertUserBySocial(
            //         "GG" + profile.id, 
            //         profile._json.email,
            //         profile._json.name, 
            //         '@@!Fcar*^',
            //         profile._json.picture)

            //     token = await jwt.assignToken({user_id : id, username: "GG" + profile.id, email: profile._json.email })
            //     return done(token);
            // }

            return done(token);
        }));

};