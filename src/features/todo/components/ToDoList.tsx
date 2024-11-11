"use client";

import { useRecoilValue } from "recoil";
import { filteredTodoListSelector } from "../state/ToDoListState";
import styled from "@emotion/styled";
import font from "../../../constants/font";
import ToDoItem from "./ToDoItem";
import colors from "../../../constants/colors";

const ToDoList = () => {
  const filteredList = useRecoilValue(filteredTodoListSelector);

  return (
    <StyledToDoListContainer>
      <StyledToDoListTotalCount>
        총 {filteredList.length}개
      </StyledToDoListTotalCount>
      <StyledToDoListContent>
        {filteredList.map((todo) => (
          <ToDoItem key={todo.title} todo={todo} />
        ))}
      </StyledToDoListContent>
    </StyledToDoListContainer>
  );
};

const StyledToDoListContainer = styled.section`
  width: 100%;
`;

const StyledToDoListTotalCount = styled.p`
  width: 100%;
  display: block;
  font-size: ${font.normal};
  line-height: 28px;
  font-weight: 400;
  padding: 36px 16px 16px 16px;
`;

const StyledToDoListContent = styled.ul`
  width: 100%;
  max-height: 384px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${colors["fourth-black"]};
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${colors["fifth-black"]};
    border-radius: 5px;
  }
  ::-webkit-scrollbar-corner {
    background-color: ${colors["fourth-black"]};
  }
`;
export default ToDoList;
