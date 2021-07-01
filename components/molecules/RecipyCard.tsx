import React, { FC } from "react";
import styled from "styled-components";
import { CoverImg } from "../atoms/cardstyles";

const StyledDiv = styled.div`
  height: 250px;
  width: 275px;
  border: 2px solid black;
  margin: 7px;
  border-radius: 25px;
  box-shadow: 3px 3px 5px grey;
  z-index: 0;
  transition: all 0.1s ease-in-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    transform: scale(1.05);
    box-shadow: 10px 10px 5px grey;
    z-index: 0;
  }
`;

const TitleDiv = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  padding: 8px 22px;
  padding-bottom: 5px;
  min-height: 72px;
`;

const ImgDiv = styled.div`
  width: 100%;
  background-color: grey;
  height: 130px;
  z-index: 0;
  font-weight: normal;
  font-size: 12px;
  vertical-align: middle;
  line-height: 150px;
`;

const DescDiv = styled.div`
  font-weight: normal;
  font-size: 12px;
  padding: 8px 22px;
  margin-bottom: 12px;
`;
interface RecipyCardProps {
  title: string;
  description?: string;
  imgUrl?: string;
}

export const RecipyCard: FC<RecipyCardProps> = ({
  title,
  description,
  imgUrl,
}) => {
  return (
    <StyledDiv>
      <ImgDiv>
        {imgUrl ? <CoverImg src={imgUrl} alt={imgUrl} /> : "270x130"}
      </ImgDiv>
      <TitleDiv>{title}</TitleDiv>
      <DescDiv>{description}</DescDiv>
    </StyledDiv>
  );
};
