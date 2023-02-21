const path = require("path");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
// const cookieParser = require("cookie-parser");
// const csrf = require("tiny-csrf");
const mongodburl = process.env.MONGODB_URI;
const port = process.env.PORT;
const app = express();

const indexRoute = require("./routes/indexRoute");

// const store = new MongoDBStore({
//   uri: mongodburl,
//   collection: "sessions",
// });

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(cookieParser("0123456789Mr8Max1234567890000000"));
// app.use(
//   session({
//     secret: "Mr8Max",
//     store: store,
//     saveUninitialized: true,
//     resave: true,
//   })
// );
// app.use(csrf("0123456789Mr8Max1234567890000000"));

app.use(indexRoute);

app.use((req, res, next) => {
  res.render("404");
});

app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({ message: message, data: data });
});

mongoose.set("strictQuery", true);
mongoose
  .connect(mongodburl)
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening in port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
