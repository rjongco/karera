import { Grid, Typography, styled } from "@mui/material";
import { useState } from "react";

export const GameMenu = () => {
  const [gameMenus, setGameMenus] = useState([
    {
      name: "Zodiac Race",
      active: true,
      border: "left",
    },
    {
      name: "Lag-Lag",
      active: false,
      border: "center",
    },
    {
      name: "Letra-Karera",
      active: false,
      border: "right",
    },
  ]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      mt="-15px"
      sx={{
        boxShadow: "3px 3px 3px #D3D3D3",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
      }}
    >
      {gameMenus.map((obj, i) => {
        const active = obj.active;

        const GameMenu = styled(Grid)(() => ({
          borderBottomLeftRadius: obj.border === "left" ? "10px" : "0",
          borderBottomRightRadius: obj.border === "right" ? "10px" : "0",
          background: active
            ? "linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)"
            : "",
          width: "100%",
          height: "100%",
          textAlign: "center",
          padding: "5px 0",
        }));

        const handleChangeMenu = (index: number) => {
          const updatedMenus = gameMenus.map((menu, i) => ({
            ...menu,
            active: i === index,
          }));
          setGameMenus(updatedMenus);
        };

        return (
          <GameMenu
            key={`game-menu-${i}`}
            item
            xs={4}
            onClick={() => handleChangeMenu(i)}
          >
            <Typography fontSize={10} fontWeight={500}>
              {obj.name}
            </Typography>
          </GameMenu>
        );
      })}
    </Grid>
  );
};
