import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { StyledTitle } from "./cardstyles";

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 40px;
  align-items: center;
`;

interface HeaderProps {
  pageTitle: string;
  showHeaderButton?: boolean;
  headerButton?: ReactNode;
}

export const Header: FC<HeaderProps> = ({ pageTitle, showHeaderButton, headerButton }) => {
  return (
    <StyledDiv>
      <StyledTitle>{pageTitle}</StyledTitle>
      {showHeaderButton && headerButton && (headerButton)}
    </StyledDiv>
  );
};
