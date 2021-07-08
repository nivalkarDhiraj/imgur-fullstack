import React, { useEffect, useState } from "react";
import Posts from "./Posts.js";

function Home() {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch("/allposts", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwt_token"),
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
                
				setData(data);
			});
	}, []);

	return (
		<div className="home">
			{data.map((post) => {
				return <Posts key={post._id} imageSrc={post.image_url} title={post.title} postID = {post._id} postedBy = {post.postedBy._id}/>;
			})}
		</div>
	);
}

export default Home;
