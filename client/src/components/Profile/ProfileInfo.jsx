import React, { useEffect, useState } from "react";
import styled from "styled-components";

import profileDefaultCover from "../../assets/profileCover.jpg";
import defaultAvatar from "../../assets/avatar/avatar1.png";
import { FaCamera } from "react-icons/fa";
import UpdateProfileForm from "./UpdateProfileForm";
import ButtonStyle from "../styles/Button";

import PropTypes, { string } from "prop-types";

const ProfileInfo = ({ userName }) => {
  const [profileInfo, setProfileInfo] = useState({
    userName,
    fullName: "",
    email: "",
    dob: "",
    joinDate: "",
    gender: "",
    bio: "",
    profilePic: defaultAvatar,
    profileCover: profileDefaultCover,
  });

  const [openEdit, setOpenEdit] = useState(false);

  const authorUserName = JSON.parse(
    localStorage.getItem("userLoginData") || "{}"
  ).userName;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    openEdit
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [openEdit]);

  useEffect(() => {
    const getProfileInfo = async () => {
      const res = await fetch(
        `http://localhost:8000/getProfileInfo/${userName}`
      );

      const data = await res.json(res);

      setProfileInfo((prev) => ({
        ...data,
        profileCover: `http://localhost:8000/uploads/${data.profileCover}`,
        profilePic: `http://localhost:8000/uploads/${data.profilePic}`,
      }));
    };
    getProfileInfo();
  }, []);

  const handleProfileCover = async (e) => {
    const formData = new FormData();
    formData.append("profileCover", e.target.files[0]);

    const res = await fetch(
      `http://localhost:8000/setProfileCover/${userName}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const { profileCover:tempProfileCover } = await res.json();

    setProfileInfo((prev) => ({
      ...profileInfo,
      profileCover: tempProfileCover
        ? `http://localhost:8000/uploads/${tempProfileCover}`
        : profileDefaultCover,
    }));
  };
  const handleProfilePic = async (e) => {
    const formData = new FormData();
    formData.append("profilePic", e.target.files[0]);

    const res = await fetch(`http://localhost:8000/setProfilePic/${userName}`, {
      method: "POST",
      body: formData,
    });
    const { profilePic } = await res.json();

    setProfileInfo((prev) => ({
      ...profileInfo,
      profilePic: profilePic
        ? `http://localhost:8000/uploads/${profilePic}`
        : defaultAvatar,
    }));
  };

  const findDate = (dateInp) => {
    const date = new Date(dateInp);
    const currentDate = date.getDate();
    return `${currentDate < 10 ? "0" + currentDate : currentDate} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };
  return (
    <ProfileInfoWrapper>
      <div className="wrapper">
        <div className="cover">
          <img src={profileInfo.profileCover} alt="" />
          {authorUserName === userName && (
            <form>
              <input
                type="file"
                name="profilePic"
                id="profileCoverPicInp"
                hidden
                onChange={handleProfileCover}
                accept="image/*"
              />
              <label htmlFor="profileCoverPicInp">
                <FaCamera />
              </label>
            </form>
          )}
        </div>
        <div className="profileDetails">
          <div className="profilePic">
            <img src={profileInfo.profilePic} alt="" />
            {authorUserName === userName && (
              <form>
                <input
                  type="file"
                  name="profilePic"
                  id="profilePicInp"
                  hidden
                  onChange={handleProfilePic}
                  accept="image/*"
                />
                <label htmlFor="profilePicInp">
                  <FaCamera />
                </label>
              </form>
            )}
          </div>
          <div className="info">
            <div className="mainInfo">
              <h3>{profileInfo.fullName}</h3>
              <h5>{userName}</h5>
            </div>
            <ul>
              <li>
                <span>Email:</span> {profileInfo.email}
              </li>
              <li>
                <span>Gender:</span> {profileInfo.gender}
              </li>
              <li>
                <span>Birth Date:</span> {findDate(profileInfo.dob)}
              </li>
              <li>
                <span>Joined:</span> {findDate(profileInfo.joinDate)}
              </li>
            </ul>
            {profileInfo.bio && <p className="bio">{profileInfo.bio}</p>}
            {authorUserName === userName && (
              <ButtonStyle
                onClick={() => {
                  setOpenEdit((prev) => true);
                }}
              >
                Edit Profile
              </ButtonStyle>
            )}
          </div>
        </div>
      </div>
      {openEdit && (
        <UpdateProfileForm
          setOpenEdit={setOpenEdit}
          profileInfo={profileInfo}
          setProfileInfo={setProfileInfo}
          userName={userName}
        />
      )}
    </ProfileInfoWrapper>
  );
};

ProfileInfo.propTypes = {
  userName: PropTypes.string,
};
export default ProfileInfo;

const ProfileInfoWrapper = styled.div`
  .wrapper {
    width: 100%;
    .cover {
      width: 100%;
      height: 300px;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      background: url(${profileDefaultCover});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      form {
        label {
          svg {
            position: absolute;
            width: 45px;
            height: 45px;
            padding: 8px;
            border-radius: 10px;
            color: var(--primaryColor);
            top: 8px;
            left: 8px;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(15px);
            box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
              rgba(0, 0, 0, 0.22) 0px 10px 10px;
            transition: all 0.3s ease-in-out;
            &:hover {
              transform: scale(0.9);
            }
          }
        }
      }
    }
    .profileDetails {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(5px);
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 90%;
      margin: 0 auto;
      margin-top: -100px;
      box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
        rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
      border-radius: 10px;
      margin-bottom: 50px;

      .profilePic {
        width: 150px;
        height: 150px;
        margin-bottom: 15px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        position: relative;
        background: url(${defaultAvatar});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border: 4px solid var(--primaryColor);
        border-radius: 50%;

        &:hover {
          transform: scale(0.9);
        }

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        form {
          label {
            svg {
              position: absolute;
              width: 45px;
              height: 45px;
              padding: 8px;
              border-radius: 10px;
              color: var(--primaryColor);
              bottom: 0;
              right: 0;
              cursor: pointer;
              background: rgba(255, 255, 255, 0.3);
              backdrop-filter: blur(15px);
              box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
                rgba(0, 0, 0, 0.22) 0px 10px 10px;
            }
          }
        }
      }
      .info {
        text-align: center;
        color: var(--primaryColor);
        h3 {
          font-size: 22px;
          padding-bottom: 5px;
        }
        h5 {
          font-size: 18px;
          padding-bottom: 10px;
        }
        p.bio {
          font-size: 17px;
          color: var(--lightText);
          padding: 15px;
          border: 2px solid var(--primaryColor);
          border-left: none;
          border-right: none;
          margin: 10px 0;
        }
        .mainInfo {
          border-bottom: 2px solid var(--primaryColor);
        }
        ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 10px 0;

          li {
            span {
              font-weight: 600;
            }
          }
        }
      }
    }
  }
`;
