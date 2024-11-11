import { TodoFilter } from "../type/ToDoFilter";

export const isToDoFilterType = (value: string): value is TodoFilter => {
  return value === "All" || value === "To Do" || value === "Done";
};
