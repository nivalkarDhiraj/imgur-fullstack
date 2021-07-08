import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./Home";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import CreatePost from "./CreatePost";
import { reducer, initialState } from "./reducers/User";

export const UserContext = createContext();

const Routing = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("user_data"));

		if (userData) {
			dispatch({ type: "USER", payload: userData });
			// history.push("/");
		} else {
			history.push("/signin");
		}
	},[]);
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="/signin">
				<Signin />
			</Route>
			<Route path="/signup">
				<Signup />
			</Route>
			<Route path="/profile">
				<Profile />
			</Route>
			<Route path="/newpost">
				<CreatePost />
			</Route>
		</Switch>
	);
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="app">
			<UserContext.Provider value={{ state, dispatch }}>
				<BrowserRouter>
					<Navbar />
					<Routing />
				</BrowserRouter>
			</UserContext.Provider>
		</div>
	);
}

export default App;
