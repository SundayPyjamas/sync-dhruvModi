const express = require("express");

const bookController = require("../controllers/bookController");

//const debug = require("debug")("app:bookRoutes");
//const connection =require("../../dbconnection");
const bookRouter = express.Router();

function router(nav) {
	const { getIndex, getById } = bookController(nav);
	bookRouter.use((req,res,next) =>{
		//if(req.user){
		next();
		//}else {
		//	res.redirect("/");
		//}
	});
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
		.get(getIndex);

	bookRouter.route("/:id")
		.get(getById);
	return bookRouter;
}
module.exports = router; 