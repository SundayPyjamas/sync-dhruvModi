const express = require("express");
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:authRoutes");
const passport = require("passport");

const authRoutes = express.Router();
function router(nav) {
	authRoutes.route("/signUp")
		.post((req, res) => {
			const { username, password } = req.body;
			const url = "mongodb://localhost:27017";
			const dbName = "libraryApp";

			(async function addUser(){
			let client;
			try {
				client = await MongoClient.connect(url);
				debug("Connected correctly to server");

				const db = client.db(dbName);

				const col = db.collection("users");
				const user = { username, password };
				const results = await col.insertOne(user);
				debug(results);
				//create user
				req.login(results.ops[0], ()=>{
				res.redirect("/auth/profile");
			});
			req.logout(results.ops[0], ()=>{
				res.redirect("/");
			});

			} catch(err){
				debug("here" + err);
			}
			}());

		});
	authRoutes.route("/signin")
		.get((req, res) => {
			res.render("signin", {
				nav,
				title: "Sign In"
			});
		})
		.post(passport.authenticate("local", {
			successRedirect: "/auth/profile",
			failureRedirect: "/"
		}));
	authRoutes.route("/profile")
		.all((req, res, next) => {
			if(req.user){
				next();
			}else {
				res.redirect("/");
			}
		})
		.get((req, res) => {
			res.json(req.user);	
		});
	return authRoutes;
}

module.exports = router;