import React, { useContext } from "react";
import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "./App";

function Navbar() {
	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();

	const renderList = () => {
		if (state) {
			return [
				<Link to="/newpost">New Post</Link>,
				<Link to="/profile">Profile</Link>,
				<button
					onClick={() => {
						localStorage.clear();
						dispatch({ type: "CLEAR" });
						history.push("/signin");
					}}
				>
					Log out
				</button>,
			];
		} else {
			return [<Link to="/signin">Signin</Link>, <Link to="/signup">Signup</Link>];
		}
	};

	return (
		<div className="navbar">
			<div className="navbar__left">
				<Link to={state ? "/" : "/signin"}>
					<img
						className="navbar__image"
						to="/"
						src="https://i.ibb.co/YdR0QvM/Png-Item-1056823.png"
						alt=""
					/>
				</Link>
			</div>
			<div className="navbar__right">{renderList()}</div>
		</div>
	);
}

export default Navbar;
