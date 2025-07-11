import {
  Box,
  Grid,
  IconButton,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { GlobalContext } from "../../../../../context/GlobalProvider";
import { useContext } from "react";
import { findIndex } from "lodash";
import { useNavigate } from "react-router-dom";

export const ButtonStyled = styled(Button)(() => ({}));

export const ItemBottomMenusMobile = (props: any) => {
  const navigate = useNavigate();
  const {
    label,
    name,
    items,
    link,
    icon: IconComponent,
    onItemClick,
    bottomMenuMobileName: bottomMenuMobileName0,
    onOpenRightSideBar,
    open,
  } = props;

  // @ts-ignore
  const {
    // @ts-ignore
    openBottomMenusMobile,
    // @ts-ignore
    setBottomMenusMobileItems,
    // @ts-ignore
    bottomMenusMobileItems,
  } = useContext(GlobalContext);

  const searchIndex = findIndex(bottomMenusMobileItems, (item: any) => {
    return item.label === bottomMenuMobileName0;
  });

  const active = bottomMenusMobileItems[searchIndex]?.active;

  const LabelStyled = styled(Typography)(() => ({
    color: active ? `FFE400` : `#FFFFFF`,
  }));

  //  @ts-ignore
  const handleSetActiveSidebar = (e, columnName, link) => {
    e.preventDefault();
    if (columnName === "MORE") {
      onOpenRightSideBar();
    } else {
      setBottomMenusMobileItems(columnName);
      if (link) {
        navigate(`${link}`);
      }
    }
  };

  return (
    <IconButton
      aria-label={`${name}-icon-button`}
      onClick={(e) => handleSetActiveSidebar(e, bottomMenuMobileName0, link)}
    >
      <Grid item>
        <Grid container direction="column" alignItems="center" spacing={"2px"}>
          <Grid item>
            <Box
              component="img"
              alt="Home Menu Footer"
              src={IconComponent}
              height={20}
            />
          </Grid>
          <Grid item>
            <LabelStyled fontSize={10} color="#FFE400">
              {label}
            </LabelStyled>
          </Grid>
        </Grid>
      </Grid>
    </IconButton>
  );
};
