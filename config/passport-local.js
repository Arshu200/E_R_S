
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email',
    },
    async (email, password, done)=> {
        // find the user and stablish the identity
        
        try {
            const user = await User.findOne({ email });

            if (!user || user.password !== password) {
                console.log('Invalid username or password');
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            console.error('Error while finding user in passport:', error);
            return done(error);
        }
        // User.findOne({ email: email }, function (err, user) {
        //     if (err) {
        //         console.log('Error while finding user in passport');
        //         return done(err); 
        //     }
        //     if (!user || user.password != password) { 
        //         console.log('Invalid user ame or password');
        //         return done(null, false); 
        //     }
            
        //     return done(null, user);
        // });
    }
));
  

// serializing user to decide what is in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key into the cookie
passport.deserializeUser(async(id, done)=>{
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (error) {
        console.log('Error while finding user in deserializing:', error);
        return done(error);
    }
});


// check if user authenticated then pass the request to next
passport.checkAuthentication = function(req, res, next){
    // if user is sign in then pass on the req to next(controller action)
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not sign in
    
    return res.redirect('/users/login');
}


passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // user is authenticated then req.user is contains the curr login user from the session cookie
        // and we are just sending this to locals for views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;
