import React, { useState, useContext } from "react";
import { sidebarItems } from "../../../constants/sidebar";
import ItemSidebar from "./ItemSidebar";
import { findIndex, includes } from "lodash";
import { GlobalContext } from "../../../context/GlobalProvider";

interface IListSidebarProps {}

const ListSidebar: React.FC<IListSidebarProps> = () => {
  const [openItems, setOpenItems] = useState([0]);

  const {
    // @ts-ignore
    auth: userInfo,
  } = useContext(GlobalContext);

  const onItemClick = (index: any) => {
    const pointerIndex = findIndex(openItems, (item) => item === index);

    if (pointerIndex >= 0) {
      setOpenItems([
        ...openItems.slice(0, pointerIndex),
        ...openItems.slice(pointerIndex + 1),
      ]);
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  return (
    <>
      {sidebarItems
        .filter(
          (item) =>
            findIndex(
              item.permission,
              (item) => item.name === userInfo?.role
            ) !== -1
        )
        .map((sidebarItem: any, index: any) => {
          const open = includes(openItems, index);
          return (
            <ItemSidebar
              open={open}
              {...sidebarItem}
              key={index}
              onItemClick={() => onItemClick(index)}
            />
          );
        })}
    </>
  );
};

export default ListSidebar;
