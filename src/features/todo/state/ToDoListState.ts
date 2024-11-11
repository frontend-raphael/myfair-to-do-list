import { atom, selector } from "recoil";
import { ToDo } from "../type/ToDo";
import { TodoFilter } from "../type/ToDoFilter";

export const todoListState = atom<ToDo[]>({
  key: "todoListState",
  default: [],
});

export const todoListFilterState = atom<TodoFilter>({
  key: "todoListFilterState",
  default: "All",
});

export const filteredTodoListSelector = selector<ToDo[]>({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "To Do":
        return list.filter((item) => !item.isChecked);
      case "Done":
        return list.filter((item) => item.isChecked);
      default:
        return list;
    }
  },
});
