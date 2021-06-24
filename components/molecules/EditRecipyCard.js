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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleDiv = styled.input`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  padding: 8px 22px;
  padding-bottom: 5px;
  width: 100%;
  border: none;
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

const DescDiv = styled.input`
  font-weight: normal;
  font-size: 12px;
  padding: 8px 22px;
  width: 100%;
  border: none;
  margin-bottom: 12px;
`;

export const EditRecipycard = (props) => {
  return (
    <StyledDiv>
      <ImgDiv>
        {props.imgUrl ? (
          <CoverImg src={props.imgUrl} alt={props.imgUrl} />
        ) : (
          "270x130"
        )}
      </ImgDiv>
      <TitleDiv
        placeholder={"Title"}
        value={props.title}
        onBlur={(e) => props.onTitleChange(e.currentTarget.value)}
      />
      <DescDiv
        placeholder={"Description"}
        value={props.desc}
        onBlur={(e) => props.onDescChange(e.currentTarget.value)}
      />
    </StyledDiv>
  );
};
