"use client";
import React, { ChangeEvent, useState } from "react";
import styled from "@emotion/styled";
import ToDoList from "./components/ToDoList";
import font from "../../constants/font";
import colors from "../../constants/colors";
import Input from "../../components/common/Input";
import TabContainer from "./components/TabContainer";
import { useRecoilState } from "recoil";
import { todoListState } from "./state/ToDoListState";

const TodoUserListPage = () => {
  const [toDoList, setTodoList] = useRecoilState(todoListState);
  const [toDoText, setToDoText] = useState("");

  const setOnToDoInputChangeListener = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToDoText(value.length > 20 ? value.slice(0, 20) : value);
  };

  const setOnEnterListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimText = toDoText.trim();

    if (e.key === "Enter") {
      if (trimText.length === 0) {
        alert("할 일을 입력해 주세요.");
        setToDoText("");
        return;
      }

      if (toDoList.filter((item) => !item.isChecked).length >= 10) {
        alert("할 일은 최대 10개까지 추가가 가능합니다.");
        return;
      }

      if (toDoList.find((item) => item.title === trimText)) {
        alert("이미 존재하는 할 일입니다.");
        return;
      }
      setTodoList([...toDoList, { title: trimText, isChecked: false }]);
      setToDoText("");
    }
  };

  return (
    <StyledToDoUserListPageContainer>
      <StyledToDoUserListPageMain>
        <StyledToDoUserListPageTitle>To Do List</StyledToDoUserListPageTitle>
        <Input
          value={toDoText}
          onChange={setOnToDoInputChangeListener}
          onKeyUp={setOnEnterListener}
          placeholder="할 일을 입력해 주세요"
          maxLength={20}
        />
        <StyledToDoUserListPageContent>
          <TabContainer />
          <ToDoList />
        </StyledToDoUserListPageContent>
      </StyledToDoUserListPageMain>
    </StyledToDoUserListPageContainer>
  );
};

const StyledToDoUserListPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledToDoUserListPageMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 738px;
  height: 100%;
  gap: 32px;
  padding: 112px 0;
`;

const StyledToDoUserListPageTitle = styled.h1`
  font-size: ${font.title};
  line-height: 72px;
  font-weight: 700;
  color: ${colors["main-black"]};
`;

const StyledToDoUserListPageContent = styled.section`
  width: 100%;
  background-color: #fff;
  border-radius: 24px;
  gap: 32px;
  padding: 32px;
  box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.1);
`;

export default TodoUserListPage;
