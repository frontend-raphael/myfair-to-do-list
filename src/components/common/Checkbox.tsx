"use client";

import styled from "@emotion/styled";
import colors from "../../constants/colors";
import { useState } from "react";

interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onClick: (value: boolean) => void;
  isChecked: boolean;
}

const Checkbox = ({
  onClick = () => {},
  isChecked = false,
  ...props
}: CheckboxProps) => {
  const [checked, setChecked] = useState(isChecked);

  const setOnClickListener = () => {
    onClick(!checked);
    setChecked(!checked);
  };

  return (
    <StyledCheckBox
      isChecked={checked}
      onClick={setOnClickListener}
      {...props}
      aria-label="button-checkbox"
    >
      {checked && <img src="/resources/Check.svg" alt="button-checkbox" />}
    </StyledCheckBox>
  );
};

const StyledCheckBox = styled.button<{ isChecked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 99px;
  gap: 8px;
  width: 32px;
  height: 32px;
  border: 1px solid
    ${({ isChecked }) => (isChecked ? "transparent" : colors["third-black"])};
  background-color: ${({ isChecked }) => (isChecked ? colors.primary : "#FFF")};
  cursor: pointer;
`;

export default Checkbox;
