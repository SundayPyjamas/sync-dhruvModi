const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

const books = [
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
	}];

function router(nav) {
	adminRouter.route("/")
		.get((req, res) => {
			const url = "mongodb://localhost:27017";
			const dbname = "libraryApp";

			(async function mongo() {
				let client;
				try {
					client = await MongoClient.connect(url);
					debug("Connected correctly to server");

					const db = client.db(dbname);

					const response = await db.collection("books").insertMany(books);
					res.json(response);
				}
				catch(err){
					debug(err.stack);
				}

				client.close();

			}());

		});
	return adminRouter;
}

module.exports = router;