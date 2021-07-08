const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const checkAuth = require("../middlewares/checkAuth")

// router.get("/", (req, res) => {
// 	res.send("In auth router");
// });

router.get("/protected", checkAuth, (req, res)=>{
    console.log(req.user);
    res.json("helllo");
})

router.post("/signup", (req, res) => {
	const { name, email, password } = req.body;
	if (!email || !password || !name) {
		return res.status(422).json({ error: "Please add all the fields.." }); //using return because we dont want to proceed further
	} else {
		User.findOne({ email: email })
			.then((savedUser) => {
				if (savedUser) {
					return res.status(422).json({ error: "User already exists with that email.." });
				} else {
					bcrypt.hash(password, 12, (error, hashedPassword) => {
						if (error) {
							return res.status(500).json({ error: error });
						} else {
							const user = new User({
								email: email,
								password: hashedPassword,
								name: name,
							});
							user
								.save()
								.then((user) => {
									res.json({ message: "saved successfully!" });
								})
								.catch((err) => {
									return res.status(422).json({ message: err });
								});
						}
					});
				}
			})
			.catch((err) => {
				return res.status(422).json({ message: err });
			});
	}
});

router.post("/signin", (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({
			error: "Please add email or password.",
		});
	} else {
		User.findOne({ email: email }).then((savedUser) => {
			if (!savedUser) {
				return res.status(422).json({ error: "invalid email or password" });
			} else {
				bcrypt
					.compare(password, savedUser.password)
					.then((isMatched) => {
						if (isMatched) {
							const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, {
								// expiresIn: "1h",
							});

							const {_id, email, name} = savedUser;
							res.json({ message: "Signed In Successfully", token: token, userData: {_id, name, email}});
						} else {
							return res.status(422).json({ error: "invalid email or password" });
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}
		});
	}
});

module.exports = router;
