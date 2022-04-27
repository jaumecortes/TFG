const passport = require("passport") //npm install passport
const LocalStrategy = require("passport-local").Strategy //npm install passport

const User = require("../models/user")

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    const user = await User.findOne({email: email})
    const passwordDB = await User.findOne({password: password})
    if (!user) {
        return done(null, false, {message: "Not User found"})
    } else {
        //const match = await users.matchPassword(password)
        if (passwordDB) {
            return done(null, user)
        } else {
            return done(null, false, {message: "Contraseña Incorrecta"})
        }
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})