import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
//  @ts-ignore
import MenuItem from "@mui/material/MenuItem";
import { DELETE_USER, RESTORE_USER } from "../../constants";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(0),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

interface ICustomMenuProps {
  anchorEl: any;
  handleClose: any;
  items: any;
  row: any;
}

//  @ts-ignore
const CustomMenu: React.FunctionComponent<ICustomMenuProps> = (props) => {
  const { anchorEl, items, row, handleClose } = props;
  const open = Boolean(anchorEl);
  return (
    //  @ts-ignore
    <StyledMenu
      id="demo-customized-menu"
      MenuListProps={{
        "aria-labelledby": "demo-customized-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      {/* @ts-ignore */}
      {items?.map(({ label, name, onClick, icon, visible }, i) => {
      
        if(name === DELETE_USER){
            return row?.status === "active" && visible && (
              <MenuItem
                key={`menu-item-${i}`}
                onClick={() => onClick(row)}
                sx={{ color: "red" }}
              >
                {/* @ts-ignore */}
                {icon}
                {label}
              </MenuItem>
            )
        }else if(name === RESTORE_USER){
            return row?.status === "deactivated" && visible && (
              <MenuItem
                key={`menu-item-${i}`}
                onClick={() => onClick(row)}
              >
                {/* @ts-ignore */}
                {icon}
                {label}
              </MenuItem>
            )
        }

        return (
          visible && (
            <MenuItem
              key={`menu-item-${i}`}
              onClick={() => onClick(row)}
              sx={{ color: "black" }}
            >
              {/* @ts-ignore */}
              {icon}
              {label}
            </MenuItem>
          )
        );
      })}
      {/*   
      <Divider sx={{ my: 0.5 }} /> */}
    </StyledMenu>
  );
};

export default CustomMenu;
