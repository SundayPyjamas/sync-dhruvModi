const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
var cookieParser = require("cookie-parser");
const session = require("express-session");

/*const connection =require("../library/dbconnection");
//const sql = require("mssql");

connection.query("SELECT * from books", function(error, rows) {
	if (!error)
		debug("The solution is: ", rows);
	else
		debug("Error while performing Query.");
}); */

const app = express();

/*const config = {
	user: "library",
	password: "Micro2012",
	server: "pslibrary0.database.windows.net", // You can use 'localhost\\instance' to connect to named instance
	database: "PSlibrary",

	options: {
		encrypt: true // Use this if you're on Windows Azure
	}
};

sql.connect(config).catch(err => {debug(err);});*/

var __dirname = "C:/Users/Dhruv Modi/Desktop/library";
app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "library"}));

require("./src/config/passport.js")(app);

app.use((req, res, next) => {
	debug("my middleware");
	next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/jquery/dist")));
app.set("views", "./src/views");
app.set("view engine", "ejs");

const nav = [
	{ link: "/books", title: "Book" },
	{ link: "/authors", title: "Author" }
];

const bookRouter = require("./src/routes/bookRoutes")(nav);
const adminRouter = require("./src/routes/adminRoutes")(nav);
const authRouter = require("./src/routes/authRoutes")(nav);

app.use("/books", bookRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);


app.get("/", function (req, res) {
	res.render(
		"index",
		{
			nav: [{ link: "/books", title: "Books" },
				{ link: "/authors", title: "Authors" }],
			title: "Library"
		}
	);
});

app.listen(3000, function () {
	debug("Listening on port " + chalk.green("3000"));
}); 