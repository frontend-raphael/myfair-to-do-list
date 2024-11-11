"use client";

import { useRecoilState } from "recoil";
import { todoListFilterState } from "../state/ToDoListState";
import styled from "@emotion/styled";
import Tab from "../../../components/common/Tab";
import { isToDoFilterType } from "../guards/isToDoFilterType";

const filterList = ["All", "To Do", "Done"];

const TabContainer = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const handleClick = (selectFilter: string) => {
    if (isToDoFilterType(selectFilter)) {
      setFilter(selectFilter);
    }
  };

  return (
    <StyledTabContainer>
      {filterList.map((item, index) => (
        <li key={index}>
          <Tab
            isActive={item === filter}
            onClick={() => {
              handleClick(item);
            }}
          >
            {item}
          </Tab>
        </li>
      ))}
    </StyledTabContainer>
  );
};

const StyledTabContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  list-style: none;
`;

export default TabContainer;
