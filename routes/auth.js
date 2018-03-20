var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;



passport.serializeUser(function (user, done) {
    console.log('---serializeUser---')
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    console.log('---deserializeUser---')
    done(null, obj);
});


// passport.use(new GitHubStrategy({
//     clientID: '5bd3bdd34f6749f1125b',
//     clientSecret: '9fb123716afc7cd756389f12f5187151f70cb772',
//     callbackURL: "http://localhost:3000/auth/github/callback"
// },
//以上是本地测试的ID，钥匙



passport.use(new GitHubStrategy({
    clientID: '698ec9e08032842584ee',
    clientSecret: 'e44ed3ed36bddecb3f99ae81bf2a3b1136f1a072',
    callbackURL: "http://yangjeremy.xyz/auth/github/callback"
},

//以上是线上的ID
    function (accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        // });
        done(null, profile);
    }
));


router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
})

router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        };
        res.redirect('/');
    });



module.exports = router;