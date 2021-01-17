const createError = require("http-errors");
const express = require("express");
const db = require("./database/models");
require('./database/associations');
const expHbs = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
const lessMiddleware = require("less-middleware");
const logger = require("morgan");




const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  expHbs({
    defaultLayout: "layout",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));



app.use(require("./routes/index.routes"));
app.use(require("./routes/users.routes"));


//Sequelize start
db.sequelize.sync({force:true}).then(()=>{
  console.log("Database Connected");
}).catch(error =>{
  console.log("Database Error");
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("partials/error");
});

module.exports = app;
