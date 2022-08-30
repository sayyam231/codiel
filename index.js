const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose'); 
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));
// use express layouts
app.use(expressLayouts);
// extract the styles and script from the sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);





// set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codiel',
    // TODO change the secret before deployemnet
    secret: "coding is fun",
    store: MongoStore.create({
        
        mongoUrl: "mongodb://localhost/codiel_development",
        autoRemove: "disabled"
        
    },
        function (err) { 
            console.log(err || 'connect-mongoDb setup ok');
     }),
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
// transfer the signed in user data to locals
app.use(passport.setAuthenticatedUser);

// use express Router
app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if (err) {
        // console.log('Error : ', err); There's a another way to console.log
        console.log(`Error : ${err}`);
    } 
    console.log(`Server is running on port  : ${port}`);
});