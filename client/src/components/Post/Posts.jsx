import React, { useEffect, useState } from "react";
import Post from "./Post";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import ButtonStyle from "../styles/Button";

const Posts = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postsData, setPostsData] = useState([]);

  const getPostsData = async () => {
    const response = await fetch("http://localhost:8000/getPost");
    const data = await response.json();

    console.log(data);
    setPostsData(prev => data);
  };

  useEffect(() => {
    getPostsData();
  }, []);

  const createPostHandle = () => {
    setShowCreatePost((prev) => !prev);
  };
  
  return (
    <PostStyle>
      <ButtonStyle onClick={createPostHandle}>Create Post</ButtonStyle>
      {showCreatePost && <CreatePost useShowCreatePost={setShowCreatePost} />}
      {postsData.map((postData) => {
        return <Post postData={postData} key={postData.userName} />;
      })}
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
