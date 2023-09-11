import React, { useEffect, useState } from "react";
import styled from "styled-components";

import profileCoverImg from "../../assets/profileCover.jpg";
import profileAvatar from "../../assets/avatar/avatar1.png";
import CloseIcon from "../styles/CloseIcon";
import { FaXmark } from "react-icons/fa6";
import ButtonStyle from "../styles/Button";
import Form from "../styles/Form";
import SuccessMessage from "../SuccessMessage";
import ErrorMessage from "../ErrorMessage";

const UpdateProfileForm = ({
  setOpenEdit,
  profileInfo,
  setProfileInfo,
  userName,
}) => {
  const [updateData, setUpdateData] = useState(profileInfo);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChangeEvent = (e) => {
    setUpdateData((prev) => ({
      ...updateData,
      [e.target.name]:
        e.target.value !== profileInfo[e.target.name]
          ? e.target.value
          : profileInfo[e.target.name],
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setProfileInfo((prev) => updateData);

    const res = await fetch(`http://localhost:8000/updateInfo/${userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...updateData,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      setShowSuccess((prev) => true);
      setShowError((prev) => false);
      setTimeout(() => {
        setOpenEdit((prev) => false);
      }, 800);
    } else {
      setShowSuccess((prev) => false);
      setShowError((prev) => true);
      setTimeout(() => {
        setOpenEdit((prev) => false);
      }, 800);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <UpdateProfileFormWrapper>
      <div className="wrapper">
        <CloseIcon
          onClick={() => {
            setOpenEdit((prev) => false);
          }}
        >
          <FaXmark />
        </CloseIcon>
        <h2>Update User</h2>
        <Form>
          <form onSubmit={handleUpdateSubmit}>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              name="fullName"
              onChange={handleChangeEvent}
              value={updateData.fullName}
            />
            <input
              type="tel"
              id="password"
              placeholder="Email Address"
              name="email"
              onChange={handleChangeEvent}
              value={updateData.email}
            />
            <textarea
              name="bio"
              id="bio"
              onChange={handleChangeEvent}
              value={updateData.bio}
              placeholder="Edit bio"
            ></textarea>
            <ButtonStyle
              type="submit"
              className={`${
                JSON.stringify(profileInfo) === JSON.stringify(updateData) &&
                "disabled"
              }`}
            >
              Save Changes
            </ButtonStyle>
            {showSuccess && <SuccessMessage message="Saved Successfully" />}
            {showError && <ErrorMessage message="Something went wrong" />}
          </form>
        </Form>
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
    width: 90%;
    max-width: 500px;
    padding: 30px 25px;
    position: relative;
    background: #fff;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;

    h2 {
      padding-bottom: 15px;
      color: var(--primaryColor);
      user-select: none;
    }

    button.disabled {
      opacity: 0.7;
      pointer-events: none;
    }
  }
`;
