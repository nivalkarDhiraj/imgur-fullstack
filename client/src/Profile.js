import React, { useEffect, useState, useContext } from "react";
import "./Profile.css";
import Posts from "./Posts.js";
import {UserContext} from "./App.js"

function Profile() {
	const [myPosts, setMyPosts] = useState([]);
	const {state, dispatch} = useContext(UserContext);


	useEffect(() => {
		fetch("/myposts", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwt_token"),
			},
		})
			.then((res) => res.json())
			.then((myPosts) => {
				setMyPosts(myPosts);
			});
	}, []);

	return (
		<div className="profile">
			<div className="profile__header">
				<img
					className="profile__image"
					src="https://st4.depositphotos.com/5575514/23597/v/600/depositphotos_235978748-stock-illustration-neutral-profile-picture.jpg"
					alt="person"
				/>
				<h1 className="profile__name">{state?state.name:"Loading..."}</h1>
			</div>
			{myPosts.map((myPost) => {
				return <Posts key={myPost._id} imageSrc={myPost.image_url} title={myPost.title} postID = {myPost._id} postedBy={myPost.postedBy._id} />;
			})}
		</div>
	);
}

export default Profile;
