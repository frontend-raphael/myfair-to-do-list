"use client";

import styled from "@emotion/styled";
import font from "../../../constants/font";
import Checkbox from "../../../components/common/Checkbox";
import colors from "../../../constants/colors";
import { ToDo } from "../type/ToDo";
import { useRecoilState } from "recoil";
import { todoListState } from "../state/ToDoListState";

interface ToDoItemProps {
  todo: ToDo;
}

const ToDoItem = ({
  todo = {
    title: "",
    isChecked: false,
  },
}: ToDoItemProps) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const handleOnClick = (isChecked: boolean) => {
    const newTodo = todoList.map((item) =>
      item.title === todo.title ? { ...todo, isChecked } : item
    );

    setTodoList(newTodo);
  };

  const removeToDoItem = () => {
    const newTodo = todoList.filter((item) => item.title !== todo.title);

    setTodoList(newTodo);
  };

  return (
    <StyledToDoItemContainer>
      <Checkbox
        isChecked={todo.isChecked}
        onClick={(value: boolean) => {
          handleOnClick(value);
        }}
      />
      <StyledToDoItemTitle isChecked={todo.isChecked}>
        {todo.title}
      </StyledToDoItemTitle>
      <StyledToDoItemClose onClick={removeToDoItem}>
        <img src="/resources/Close.svg" alt="button-close" />
      </StyledToDoItemClose>
    </StyledToDoItemContainer>
  );
};

const StyledToDoItemContainer = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 32px 16px;
  gap: 16px;
  font-size: ${font.normal};
  font-weight: 400;
  list-style: none;
`;

const StyledToDoItemTitle = styled.p<{ isChecked: boolean }>`
  width: 100%;
  font-size: ${font.normal};
  line-height: 28px;
  flex: 1;
  color: ${({ isChecked }) => (isChecked ? colors["fifth-black"] : "#000")};
`;

const StyledToDoItemClose = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid transparent;
`;

export default ToDoItem;
