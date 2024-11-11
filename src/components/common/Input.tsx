"use client";

import styled from "@emotion/styled";
import font from "../../constants/font";
import colors from "../../constants/colors";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...props }: InputProps) => {
  return <StyledInput {...props} aria-label="input" />;
};

const StyledInput = styled.input`
  width: 100%;
  border-radius: 24px;
  padding: 32px;
  font-size: ${font.normal};
  font-weight: 400;
  line-height: 28px;
  font-size: ${font.normal};
  background-color: ${colors["third-black"]};
  border: 1px solid transparent;
  outline: none;
  &::placeholder {
    color: ${colors["fourth-black"]};
  }
`;

export default Input;
