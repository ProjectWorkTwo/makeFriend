import React, { useEffect, useState } from "react";
import Post from "./Post";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import ButtonStyle from "../styles/Button";

const Posts = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [realTimePostFetch, setRealTimePostFetch] = useState(Math.random());

  const getPostsData = async () => {
    const response = await fetch("http://localhost:8000/getPost");
    const data = await response.json();

    // console.log(data);
    setPostsData((prev) => data);
  };

  useEffect(() => {
    getPostsData();
  }, [realTimePostFetch]);

  const createPostHandle = () => {
    setShowCreatePost((prev) => !prev);
  };

  const realTimeFetchPostData = () => {
    setRealTimePostFetch((prev) => Math.random());
  };
  const autoHideCreatePost = () => {
    setShowCreatePost((prev) => false);
  };

  return (
    <PostStyle>
      <ButtonStyle onClick={createPostHandle}>Create Post</ButtonStyle>
      {showCreatePost && (
        <CreatePost
          setShowCreatePost={setShowCreatePost}
          realTimeFetchPostData={realTimeFetchPostData}
          autoHideCreatePost={autoHideCreatePost}
        />
      )}
      {postsData.map((postData, index, arr) => {
        postData = arr[arr.length-index-1]
        return <Post postData={postData} key={postData._id} />;
      })}
    </PostStyle>
  );
};

export default Posts;

const PostStyle = styled.div`
  background: var(--secondaryColor);
  width: 90%;
  max-width: 500px;
  margin: auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
