// require libraries and initialize Express app
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

// set view engine
app.set("view engine", "ejs");
// set directory where views will populate from
app.set("views", __dirname + "/views");
// set file where layout file comes from
app.set("layout", "layouts/layout");
// Set directory where css will be imported from
app.use(express.static(path.join(__dirname, "public")));

// tell Express we want to use ejs layouts library (required above)
app.use(expressLayouts);

//tell Express which routers will be needed
const indexRouter = require("./routes/index");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// tell Express which routers to use for each second-level path
app.use("/", indexRouter);

// export the app so that it can be called in bin>www
module.exports = app;
