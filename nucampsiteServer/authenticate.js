const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

// localstrategy compares against locally stored auth vals - passed a callback
exports.local = passport.use(new LocalStrategy(User.authenticate()));

// {{{sessions used for now - later will setup tokens. }}}
// grabbed user-data from the req obj - need to store session data via serialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());