import React from "react";
import { styled } from "styled-components";
import { FaXmark } from "react-icons/fa6";
import CloseIcon2 from "../styles/CloseIcon2";

import PropTypes from "prop-types";

const PostImagePreview = ({ imgLink, imgTitle, closeImgPreview }) => {
  return (
    <ImgPreview>
      <CloseIcon2 onClick={() => closeImgPreview()}>
        <FaXmark />
      </CloseIcon2>
      <img src={imgLink} alt={imgTitle} />
    </ImgPreview>
  );
};

PostImagePreview.prototype = {
  imgLink: PropTypes.string,
  imgTitle: PropTypes.string,
  closeImgPreview: PropTypes.func,
};

export default PostImagePreview;

const ImgPreview = styled.figure`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.8);

  img {
    width: 90%;
    height: 90%;
    object-fit: contain;
  }
`;
