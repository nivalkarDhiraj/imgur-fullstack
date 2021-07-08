import React, { useContext } from "react";
import "./Post.css";
import {UserContext} from "./App";
import {useHistory} from "react-router-dom";

function Post({ postID, imageSrc, title, postedBy }) {
	const { state, dispatch } = useContext(UserContext);

	const deletePost = () => {
		fetch(`/deletepost/${postID}`, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwt_token"),
			},
		})
			.then((res) => res.json())
			.then((result) => console.log(result));
	};

	return (
		<div className="post">
			<img className="post__image" src={imageSrc} alt={imageSrc} />
			<div className="post__bottom">
				<h4 className="post__title">{title}</h4>
				<div className="post__icons">
					<button>^</button>
					<button>Comment</button>
					{state._id == postedBy && <button onClick={deletePost}>Delete</button>}
				</div>
			</div>
		</div>
	);
}

export default Post;
