import React, { useEffect, useState } from "react";
import Post from "./Post";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import ButtonStyle from "../styles/Button";
import GoToLogin from "../GoToLogin";

const Posts = ({ postOwner }) => {
  const [showGoToLogin, setShowGoToLogin] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [realTimePostFetch, setRealTimePostFetch] = useState(Math.random());

  const authorUserName = JSON.parse(
    localStorage.getItem("userLoginData") || "{}"
  ).userName;

  const getPostsData = async () => {
    let res;
    if (postOwner) {
      res = await fetch(`http://localhost:8000/getProfilePosts/${postOwner}`);
    } else {
      res = await fetch("http://localhost:8000/getPost");
    }
    const data = await res.json();

    setPostsData((prev) => data);
  };

  useEffect(() => {
    getPostsData();
  }, [realTimePostFetch]);

  const createPostHandle = () => {
    if (!authorUserName) {
      return setShowGoToLogin((prev) => true);
    }

    setShowCreatePost((prev) => !prev);
  };

  const realTimeFetchPostData = () => {
    setRealTimePostFetch((prev) => Math.random());
  };
  const autoHideCreatePost = () => {
    setShowCreatePost((prev) => false);
  };

  const createButtonAccess = () => {
    if (!postOwner) {
      return true;
    } else if (postOwner === authorUserName) {
      return true;
    }
    return false;
  };

  return (
    <PostStyle>
      {createButtonAccess() && (
        <ButtonStyle onClick={createPostHandle}>Create Post</ButtonStyle>
      )}
      {showCreatePost && (
        <CreatePost
          setShowCreatePost={setShowCreatePost}
          realTimeFetchPostData={realTimeFetchPostData}
          autoHideCreatePost={autoHideCreatePost}
        />
      )}
      {postsData.map((postData, index, arr) => {
        postData = arr[arr.length - index - 1];
        return (
          <Post
            postData={postData}
            key={postData._id}
            setShowGoToLogin={setShowGoToLogin}
          />
        );
      })}

      {showGoToLogin && <GoToLogin setShowGoToLogin={setShowGoToLogin} />}
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
