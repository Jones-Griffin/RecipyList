import styled from "styled-components";
import React, { FC } from "react";

const StyledDiv = styled.div`
  margin: 0 0 0 20px;
  z-index: -10;
`;
export const PageContainer: FC = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};
