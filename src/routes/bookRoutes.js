const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

//const debug = require("debug")("app:bookRoutes");
//const connection =require("../../dbconnection");
const bookRouter = express.Router();

function router(nav) {
	/*const books = [
		{
			title: "war and Peace",
			genre: "Historical Fiction",
			author: "Lev Nikolayevich Tolstoy",
			read: false
		},
		{
			title: "Les and Peace",
			genre: "Historical Fiction",
			author: "Victor Hugo",
			read: false
		},
		{
			title: "The time Machine",
			genre: "Science Fiction",
			author: "H. G. Wells",
			read: false
		},
		{
			title: "war",
			genre: "Science Fiction",
			author: "Jules Verne",
			read: false
		}]; */
	bookRouter.route("/")
		.get((req, res) => {
			const url = "mongodb://localhost:27017";
			const dbname = "libraryApp";

			(async function mongo() {
				let client;
				try {
					client = await MongoClient.connect(url);
					debug("Connected correctly to server");

					const db = client.db(dbname);

					const col = await db.collection("books");

					const books = await col.find().toArray();

					/*	connection.query("select * from books").then(result => {
						debug("Flag 1, run this now");
						debug(result); 
						res.render(
							"bookListView",
							{
								nav,
								title: "Library",
								books,
								result
							});
					}); 
		
					connection.query("select * from books", function(err, result){
						debug(result); 
						
					}); */
					res.render(
						"bookListView",
						{
							nav,
							title: "Library",
							books
						});
				} catch (err) {
					debug(err.stack);
				}
				client.close();
			}());
		});

	bookRouter.route("/:id")
		.get((req, res) => {
			const id = req.params.id;
			const url = "mongodb://localhost:27017";
			const dbname = "libraryApp";

			(async function mongo() {
				let client;
				try {
					client = await MongoClient.connect(url);
					debug("Connected correctly to server");

					const db = client.db(dbname);

					const col = await db.collection("books");

					const book = await col.findOne({_id: new ObjectId(id)}); 
					debug(book);
					res.render(
						"bookView",
						{
							nav,
							title: "Library",
							book
						});
				}
				catch (err){
					debug(err.stack);
				}
				}());
			//	connection.query("select * from books where id=@id");
		});
	return bookRouter;
}
module.exports = router; 