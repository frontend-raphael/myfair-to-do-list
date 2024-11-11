import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import TodoUserListPage from "./TodoUserListPage";

describe("TodoUserListPage", () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <TodoUserListPage />
      </RecoilRoot>
    );
  });

  test("새 할 일 추가", () => {
    const input = screen.getByPlaceholderText("할 일을 입력해 주세요");
    fireEvent.change(input, { target: { value: "새 할 일" } });
    fireEvent.keyUp(input, { key: "Enter", code: "Enter" });

    expect(screen.getByText("새 할 일")).toBeInTheDocument();
  });

  test("기존에 있는 할 일을 추가하면 alert", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    const input = screen.getByPlaceholderText("할 일을 입력해 주세요");
    fireEvent.change(input, { target: { value: "중복 할 일" } });
    fireEvent.keyUp(input, { key: "Enter", code: "Enter" });
    fireEvent.change(input, { target: { value: "중복 할 일" } });
    fireEvent.keyUp(input, { key: "Enter", code: "Enter" });

    expect(window.alert).toHaveBeenCalledWith("이미 존재하는 할 일입니다.");
  });

  test("할 일을 추가하고 체크박스를 누르면 체크표시가 된다.", () => {
    const input = screen.getByPlaceholderText("할 일을 입력해 주세요");
    fireEvent.change(input, { target: { value: "할 일 1" } });
    fireEvent.keyUp(input, { key: "Enter", code: "Enter" });

    const checkbox = screen.getByLabelText("button-checkbox");
    fireEvent.click(checkbox);

    const checkImg = screen.getByAltText("button-checkbox");
    expect(checkImg).toBeInTheDocument();
  });

  test("할 일 최대 10개 추가", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    const input = screen.getByPlaceholderText("할 일을 입력해 주세요");

    for (let i = 0; i < 11; i++) {
      fireEvent.change(input, { target: { value: `할 일 ${i}` } });
      fireEvent.keyUp(input, { key: "Enter", code: "Enter" });
    }

    expect(window.alert).toHaveBeenCalledWith(
      "할 일은 최대 10개까지 추가가 가능합니다."
    );
  });

  test("x 버튼을 누르면 할 일 삭제", () => {
    const input = screen.getByPlaceholderText("할 일을 입력해 주세요");
    fireEvent.change(input, { target: { value: "삭제할 할 일" } });
    fireEvent.keyUp(input, { key: "Enter", code: "Enter" });

    const deleteButton = screen.getByAltText("button-close");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("삭제할 할 일")).not.toBeInTheDocument();
  });

  test("탭에 맞는 toDoList가 필터링 됨", () => {
    const input = screen.getByPlaceholderText("할 일을 입력해 주세요");

    fireEvent.change(input, { target: { value: "할 일 1" } });
    fireEvent.keyUp(input, { key: "Enter", code: "Enter" });

    fireEvent.change(input, { target: { value: "할 일 2" } });
    fireEvent.keyUp(input, { key: "Enter", code: "Enter" });

    const checkbox = screen.getAllByLabelText("button-checkbox")[0];
    fireEvent.click(checkbox);

    const toDoTab = screen.getByText("To Do");
    fireEvent.click(toDoTab);
    expect(screen.queryByText("할 일 1")).not.toBeInTheDocument();
    expect(screen.getByText("할 일 2")).toBeInTheDocument();

    const doneTab = screen.getByText("Done");
    fireEvent.click(doneTab);
    expect(screen.getByText("할 일 1")).toBeInTheDocument();
    expect(screen.queryByText("할 일 2")).not.toBeInTheDocument();

    const allTab = screen.getByText("All");
    fireEvent.click(allTab);
    expect(screen.getByText("할 일 1")).toBeInTheDocument();
    expect(screen.getByText("할 일 2")).toBeInTheDocument();
  });
});
