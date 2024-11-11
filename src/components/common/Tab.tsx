"use client";

import styled from "@emotion/styled";
import font from "../../constants/font";
import colors from "../../constants/colors";
import { useState } from "react";

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  children: React.ReactNode;
}

const Tab = ({ isActive = false, children = <></>, ...props }: TabProps) => {
  return (
    <StyledTab isActive={isActive} {...props}>
      {children}
    </StyledTab>
  );
};

const StyledTab = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 24px;
  width: 108px;
  white-space: nowrap;
  font-weight: 600;
  padding: 8px 32px;
  border-radius: 12px;
  font-size: ${font.small};
  background-color: ${({ isActive }) => (isActive ? colors.secondary : "#FFF")};
  color: ${({ isActive }) =>
    isActive ? colors.primary : colors["secondary-black"]};
  border: 1px solid transparent;
  cursor: pointer;
`;

export default Tab;
