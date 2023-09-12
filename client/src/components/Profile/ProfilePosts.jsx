import React, { useEffect, useState } from "react";
import styled from "styled-components";

import PropTypes from "prop-types";
import Posts from "../Post/Posts";

const ProfilePosts = ({ userName }) => {
  return (
    <ProfilePostsWrapper>
      <h1>Profile posts</h1>
      <div className="postWrapper">
        <Posts postOwner={userName} />
      </div>
    </ProfilePostsWrapper>
  );
};

ProfilePosts.propTypes = {
  postsData: PropTypes.array,
};

export default ProfilePosts;

const ProfilePostsWrapper = styled.div`
  margin-top: 25px;
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
