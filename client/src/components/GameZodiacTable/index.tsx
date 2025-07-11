import { Avatar, Grid, Typography } from "@mui/material";
import { VARIANT, ZODIACS } from "../../constants";
import { ZODIACS_IMAGES, ZODIACS_MENU } from "../../constants/zodiacsMenu";
import { numberShortRace } from "../../utils/logic";
import zodiacRaceWinningBallframe from "../../assets/images/zodiac-race-winning-ball-frame.png";
import { GlobalContext } from "../../context/GlobalProvider";
import { useContext } from "react";

export const GameZodiacTable = (props: any) => {
  // @ts-ignore
  // const { top4Winners, } = useContext(GlobalContext) || {};
  const { variant, gameWinners: top4Winners } = props;
  if (variant === VARIANT.ROW) {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          background: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
          py: 1,
        }}
      >
        {ZODIACS_MENU.sort((a, b) => a.id - b.id).map((o, i) => {
          return (
            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                {i === 0 ? (
                  <>
                    <Grid item sx={{ position: "relative" }}>
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        sx={{ mt: "3px" }}
                      >
                        <Grid item mr="4px">
                          <Avatar
                            src={o.logo}
                            alt={`Zodiac Race ${o.label} Logo`}
                            sx={{ width: "40px", height: "40px" }}
                          />
                        </Grid>
                        <Grid item>
                          <Avatar
                            src={zodiacRaceWinningBallframe}
                            alt={`Zodiac Winning Frame ${o.label} Icon`}
                            sx={{
                              width: "45px",
                              height: "45px",
                              position: "absolute",
                              top: 1,
                              left: -3,
                              right: 0,
                              zIndex: 5,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    {i < 4 ? (
                      <Grid item>
                        <Typography
                          fontSize={12}
                          fontWeight={600}
                          color={o.id === 1 ? "#FFE400" : "#FFFFFF"}
                        >
                          {numberShortRace(i)}
                        </Typography>
                      </Grid>
                    ) : (
                      <Grid item>&nbsp;</Grid>
                    )}
                    <Grid item>
                      <Avatar
                        src={o.logo}
                        alt={`Zodiac Race ${o.label} Logo`}
                        sx={{ width: "25px", height: "25px" }}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    );
  } else if (variant === VARIANT.BOX) {
    return (
      <Grid container direction="column" alignItems="flex-start">
        <Grid
          item
          sx={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
            py: 1,
            width: "180px",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          <Typography
            fontSize={12}
            fontWeight={700}
            color="#FFE400"
            textAlign="center"
          >
            WINNING ZODIAC BALLS
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
            py: "2px",
            width: "180px",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            px: 0,
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            pl={1.5}
            py={1}
          >
            {top4Winners.length > 0
              ? top4Winners
                  .sort(
                    (a: number, b: number) =>
                      top4Winners.indexOf(a) - top4Winners.indexOf(b)
                  )
                  .map((arr: any, i: any) => {
                    return (
                      <Grid key={`zodiac-table-${arr}`} item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justifyContent="flex-start"
                          py="5px"
                        >
                          <Grid item pl={0}>
                            <Typography
                              fontSize={12}
                              fontWeight={600}
                              color={i === 1 ? "#FFE400" : "#FFFFFF"}
                            >
                              {numberShortRace(i)}
                            </Typography>
                          </Grid>
                          <Grid item pl={2}>
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              sx={{
                                background:
                                  "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
                                width: "120px",
                                borderRadius: "25px",
                              }}
                            >
                              <Grid item>
                                <Avatar
                                  // @ts-ignore
                                  src={ZODIACS_IMAGES[arr]}
                                  alt={`Zodiac Race ${arr} Logo`}
                                  sx={{ width: "35px", height: "35px" }}
                                />
                              </Grid>
                              <Grid item ml={0.5} pr={1}>
                                <Typography
                                  textAlign="left"
                                  fontSize={10}
                                  fontWeight={600}
                                  color="#FFFFFF"
                                >
                                  {arr.toUpperCase()}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
              : ZODIACS_MENU.filter(
                  (o) =>
                    o.name === ZODIACS.CAPRICORN ||
                    o.name === ZODIACS.LIBRA ||
                    o.name === ZODIACS.LEO ||
                    o.name === ZODIACS.SAGITTARIUS
                )
                  .sort((a, b) => a.id - b.id)
                  .map((o, i) => {
                    return (
                      <Grid key={`zodiac-table-${o.name}`} item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justifyContent="flex-start"
                          py="5px"
                        >
                          <Grid item pl={0}>
                            <Typography
                              fontSize={12}
                              fontWeight={600}
                              color={o.id === 1 ? "#FFE400" : "#FFFFFF"}
                            >
                              {numberShortRace(i)}
                            </Typography>
                          </Grid>
                          <Grid item pl={2}>
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              sx={{
                                background:
                                  "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
                                width: "120px",
                                borderRadius: "25px",
                              }}
                            >
                              <Grid item>
                                <Avatar
                                  src={o.logo}
                                  alt={`Zodiac Race ${o.label} Logo`}
                                  sx={{ width: "35px", height: "35px" }}
                                />
                              </Grid>
                              <Grid item ml={0.5} pr={1}>
                                <Typography
                                  textAlign="left"
                                  fontSize={10}
                                  fontWeight={600}
                                  color="#FFFFFF"
                                >
                                  {o.label}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (variant === VARIANT.TABLE) {
    return (
      <Grid container direction="column" alignItems="center">
        <Grid
          item
          sx={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
            py: "5px",
            width: "250px",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          <Typography
            fontSize={12}
            fontWeight={700}
            color="#FFE400"
            textAlign="center"
          >
            12 ZODIAC BALLS
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
            height: "auto",
            width: "250px",
          }}
        >
          <Grid container direction="row" justifyContent="space-between">
            {/* LEFT ZODIAC */}
            <Grid
              item
              xs={6}
              sx={{ border: "1px solid #FFFFFF", height: "100%" }}
            >
              <Grid container direction="column" justifyContent="center">
                {ZODIACS_MENU.filter(
                  (o) =>
                    o.name === ZODIACS.ARIES ||
                    o.name === ZODIACS.TAURUS ||
                    o.name === ZODIACS.GEMINI ||
                    o.name === ZODIACS.CANCER ||
                    o.name === ZODIACS.LEO ||
                    o.name === ZODIACS.VIRGO
                ).map((o) => {
                  return (
                    <Grid key={`zodiac-table-${o.name}`} item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        py="5px"
                      >
                        <Grid item ml={1}>
                          <Avatar
                            src={o.logo}
                            alt={`Zodiac Race ${o.label} Logo`}
                            sx={{ width: "25px", height: "25px" }}
                          />
                        </Grid>
                        <Grid item ml={1}>
                          <Typography
                            fontSize={12}
                            fontWeight={400}
                            color="#FFFFFF"
                          >
                            {o.label}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            {/* RIGHT ZODIAC */}
            <Grid
              item
              xs={6}
              sx={{ border: "1px solid #FFFFFF", height: "100%" }}
            >
              <Grid container direction="column" justifyContent="center">
                {ZODIACS_MENU.filter(
                  (o) =>
                    o.name === ZODIACS.LIBRA ||
                    o.name === ZODIACS.SCORPIO ||
                    o.name === ZODIACS.SAGITTARIUS ||
                    o.name === ZODIACS.CAPRICORN ||
                    o.name === ZODIACS.AQUARIUS ||
                    o.name === ZODIACS.PISCES
                ).map((o) => {
                  return (
                    <Grid key={`zodiac-table-${o.name}`} item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        py="5px"
                      >
                        <Grid item ml={1}>
                          <Avatar
                            src={o.logo}
                            alt={`Zodiac Race ${o.label} Logo`}
                            sx={{ width: "25px", height: "25px" }}
                          />
                        </Grid>
                        <Grid item ml={1}>
                          <Typography
                            fontSize={12}
                            fontWeight={400}
                            color="#FFFFFF"
                          >
                            {o.label}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};
