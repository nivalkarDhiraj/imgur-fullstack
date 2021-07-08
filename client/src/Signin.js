import React, { useState , useContext} from "react";
import "./Signin.css";
import { Link, useHistory } from "react-router-dom";
import {UserContext} from "./App.js"

function Signin() {
	const {state, dispatch} = useContext(UserContext);

	const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const SignIn = () => {
		fetch("/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				password: password,
				email: email,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				// if data.error -> show error
				if (data.error) {
					console.log(data.error);
				} else {
					localStorage.setItem("jwt_token", data.token);
					localStorage.setItem("user_data", JSON.stringify(data.userData));
					dispatch({type:"USER", payload: data.userData})
					history.push("/");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="signin">
			<div className="signin__card">
				<img
					className="signin__image"
					to="/"
					src="https://i.ibb.co/YdR0QvM/Png-Item-1056823.png"
					alt=""
				/>
				<input
					type="text"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" onClick={SignIn}>
					Signin
				</button>
				<Link to="/signup">
					<h4>Don't have an account?</h4>
				</Link>
			</div>
		</div>
	);
}

export default Signin;
