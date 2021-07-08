import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./CreatePost.css"

function CreatePost() {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [image, setImage] = useState("");
	const [url, setUrl] = useState("");

	useEffect(() => {
		if (url) {
			fetch("/createpost", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("jwt_token"),
				},
				body: JSON.stringify({
					title: title,
					body: body,
					image_url: url,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					// console.log(data);
					// if data.error -> show error
					if (data.error) {
						console.log(data.error);
					} else {
						history.push("/profile");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [url]);

	const history = useHistory();

	const postImage = async () => {
		const data = new FormData();
		data.append("file", image);
		console.log(image.name);
		data.append("upload_preset", "imgur_"); //Cloudinary
		data.append("cloud_name", "dhirajnivalkar"); //Cloudinary
		fetch("	https://api.cloudinary.com/v1_1/dhirajnivalkar/image/upload", {
			method: "POST",
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				setUrl(data.secure_url);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="createPost">
			<div className="createPost__card">
			<input
				type="text"
				placeholder="title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				type="text"
				placeholder="body"
				value={body}
				onChange={(e) => setBody(e.target.value)}
			/>
			<input type="file" onChange={(e) => setImage(e.target.files[0])} />
			<button type="submit" onClick={postImage}>
				Post
			</button>
			</div>
		</div>
	);
}

export default CreatePost;
