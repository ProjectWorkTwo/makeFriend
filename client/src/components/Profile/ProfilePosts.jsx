import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import styled from "styled-components";

import PropTypes from "prop-types";

const ProfilePosts = ({ postsData }) => {
  return (
    <ProfilePostsWrapper>
      <h1>Profile posts</h1>
      <div className="postWrapper">
        {postsData.map((postData, index, arr) => {
          postData = arr[arr.length - index - 1];
          return <Post postData={postData} key={postData._id} />;
        })}
      </div>
    </ProfilePostsWrapper>
  );
};

ProfilePosts.propTypes = {
  postsData: PropTypes.array,
};

export default ProfilePosts;

const ProfilePostsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  h1 {
    text-align: center;
  }

  .postWrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;
