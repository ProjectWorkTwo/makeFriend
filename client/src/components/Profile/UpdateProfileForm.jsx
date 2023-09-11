import React from "react";
import styled from "styled-components";

import profileCoverImg from "../../assets/profileCover.jpg";
import profileAvatar from "../../assets/avatar/avatar1.png";

const UpdateProfileForm = () => {
  return (
    <UpdateProfileFormWrapper>
      <div className="wrapper">
        <h2>Update User</h2>
        {/* <div className="profileCover">
          <img src={profileCoverImg} alt="" />
        </div>
        <div className="profilePic">
          <img src={profileAvatar} alt="" />
        </div> */}
        <form></form>
      </div>
    </UpdateProfileFormWrapper>
  );
};

export default UpdateProfileForm;

const UpdateProfileFormWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  padding: 25px;

  .wrapper {
    background: #fff;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;

    .profileCover {
      width: 500px;
      height: 250px;
      border-radius: 8px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .profilePic{
        width: 80px;
        height: 80px;
        border-radius: 50%;

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
  }
`;
