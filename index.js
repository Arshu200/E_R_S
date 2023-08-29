const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const port = 4040;
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const MongoStore = require("connect-mongo");

const db = require("./config/mongoose");



const app = express();

// for static files
app.use(expressLayouts);
app.use(express.static('./asset'));
// view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//------BodyParser--------//
app.use(express.urlencoded({ extended: false }));

// to render css file link in header
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// middleware for use session cookie
app.use(
  session({
    name: "employeeReview",
    secret: "!@#$%^&*})(",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl:`mongodb+srv://shaik22arshad:mHHWfg9K2XzCk1lV@cluster0.wqo0hra.mongodb.net/?retryWrites=true&w=majority`,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error while connecting to server");
    return;
  }
  console.log(`Server running on port ${port}.`);
});
