const express = require("express");
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:authRoutes");

const authRoutes = express.Router();
function router() {
	authRoutes.route("/signUp")
		.post((req, res) => {
			debug(req.body);
			res.json(req.body);
		});
	return authRoutes;
}

module.exports = router;