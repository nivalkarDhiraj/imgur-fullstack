import React from 'react'
import Post from "./Post.js"
import "./Posts.css";


function Posts({postID, imageSrc, title, postedBy}) {
    return (
        <div className="posts">
            <Post imageSrc={imageSrc} title={title} postID={postID} postedBy = {postedBy}/>
        </div>
    )
}

export default Posts
