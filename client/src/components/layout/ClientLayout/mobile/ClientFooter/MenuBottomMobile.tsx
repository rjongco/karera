import { findIndex, includes } from "lodash";
import { BOTTOM_MENUS_MOBILE } from "../../../../../constants/bottomMenusMobile";
import { ItemBottomMenusMobile } from "./ItemBottomMenusMobile";
import { useState } from "react";

export const MenuBottomMobile = (props: any) => {
  const { onOpenRightSideBar } = props;
  const [openItems, setOpenItems] = useState([0]);
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
      {BOTTOM_MENUS_MOBILE.map((bottomMenuMobile: any, index: any) => {
        const open = includes(openItems, index);
        return (
          <ItemBottomMenusMobile
            open={open}
            {...bottomMenuMobile}
            key={index}
            onItemClick={() => onItemClick(index)}
            onOpenRightSideBar={onOpenRightSideBar}
          />
        );
      })}
    </>
  );
};
