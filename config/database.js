var mysql = require("mysql");
var debug = require("debug");
var connection = mysql.createConnection({
	host     : "localhost",
	user     : "root",
	password : "",
	database : "pslibrary"
});
 
connection.connect(function (err) {
	if (err) throw err;
	debug("Connected!");
	connection.query("SELECT * FROM books", function (err, result) {
		if (err) throw err;
		debug(`result is ${result}`);
	});
});

