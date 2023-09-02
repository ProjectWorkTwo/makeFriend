import React, { useState } from "react";
import Post from "./Post";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import ButtonStyle from "../styles/Button";

const Posts = () => {
  const [showCreatePost, useShowCreatePost] = useState(false);

  const createPostHandle = () => {
    useShowCreatePost((prev) => !prev);
  };

  const allPosts = [
      {
        userName: "UserName1",
        postTitle: "Post Title Here1",
        postedDate: "13 May 2023",
        postDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
        sint fugiat quibusdam porro temporibus ipsam recusandae fugit
        molestiae, id eveniet delectus minima in omnis eaque!`,
        likeNum: 550,
        shareNum: 20,
      },
      {
        userName: "UserName2",
        postTitle: "Post Title Here2",
        postedDate: "13 May 2023",
        postDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
        sint fugiat quibusdam porro temporibus ipsam recusandae fugit
        molestiae, id eveniet delectus minima in omnis eaque!`,
        likeNum: 550,
        shareNum: 20,
      },
      {
        userName: "UserName3",
        postTitle: "Post Title Here3",
        postedDate: "13 May 2023",
        postDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
        sint fugiat quibusdam porro temporibus ipsam recusandae fugit
        molestiae, id eveniet delectus minima in omnis eaque!`,
        likeNum: 550,
        shareNum: 20,
      },
      {
        userName: "UserName4",
        postTitle: "Post Title Here4",
        postedDate: "13 May 2023",
        postDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
        sint fugiat quibusdam porro temporibus ipsam recusandae fugit
        molestiae, id eveniet delectus minima in omnis eaque!`,
        likeNum: 550,
        shareNum: 20,
      },
  ]

  return (
    <PostStyle>
      <ButtonStyle onClick={createPostHandle}>Create Post</ButtonStyle>
      {showCreatePost && <CreatePost useShowCreatePost={useShowCreatePost} />}
      {
        allPosts.map((postData)=>{
            return <Post postData={postData} />
        })
      }
      
    </PostStyle>
  );
};

export default Posts;

const PostStyle = styled.div`
  background: var(--secondaryColor);
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
