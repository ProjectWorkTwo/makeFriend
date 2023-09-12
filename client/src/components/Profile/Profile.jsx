import React, { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import styled from "styled-components";
import CreatePost from "../Post/CreatePost";
import { useParams } from "react-router-dom";
import ButtonStyle from "../styles/Button";

const Profile = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  // const [postsData, setPostsData] = useState([]);
  const [realTimePostFetch, setRealTimePostFetch] = useState(Math.random());

  const { userName } = useParams();

  const authorUserName = JSON.parse(
    localStorage.getItem("userLoginData") || "{}"
  ).userName;

  useEffect(()=>{
    showCreatePost? 
    document.body.style.overflow = 'hidden': 
    document.body.style.overflow = 'auto'
  }, [showCreatePost])

  const getPostsData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/getProfilePosts/${userName}`
      );
      const data = await res.json();


      if (res.status !== 404 && res.status !== 500) {
        setPostsData((prev) => data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   getPostsData();
  // }, [realTimePostFetch]);

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
    <ProfileWrapper>
      <div className="wrapper">
        <ProfileInfo userName={userName} />
        {/* {authorUserName === userName && (
          <ButtonStyle onClick={createPostHandle}>Create Post</ButtonStyle>
        )} */}
        {showCreatePost && (
          <CreatePost
            setShowCreatePost={setShowCreatePost}
            realTimeFetchPostData={realTimeFetchPostData}
            autoHideCreatePost={autoHideCreatePost}
          />
        )}
        {/* <ProfilePosts postsData={postsData} /> */}
        <ProfilePosts userName={userName} />
      </div>
    </ProfileWrapper>
  );
};

export default Profile;

const ProfileWrapper = styled.section`
  width: 90%;
  max-width: 500px;
  margin: auto;
  padding: 20px 0;
`;
