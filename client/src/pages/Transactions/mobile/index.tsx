import {
  Grid,
  IconButton,
  Typography,
  Box,
  Pagination,
  PaginationItem,
  styled,
  Button,
} from "@mui/material";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import rightArrowIcon from "../../../assets/images/arrow-right-black.png";
import calendarIcon from "../../../assets/images/calendar-icon.png";
import filterIcon from "../../../assets/images/filter-icon.png";
import filterBlackIcon from "../../../assets/images/filter-black-icon.png";

import {
  ALL,
  COMPLETED,
  DEPOSIT,
  FAILED,
  FILTER,
  GAME,
  PENDING,
  WITHDRAW,
} from "../../../constants";
import { useState } from "react";
import { useGamesTransactionsContext } from "../../../context/GamesTransactions";
import { TransactionItem } from "./TransactionItem";

import { PopupModal } from "../../../components/PopupModal";
import closeIcon from "../../../assets/images/close-icon.png";
import dayjs from "dayjs";

const PaginationStyled = styled(Pagination)(() => ({
  "& li:first-of-type button, & li:last-of-type button": {
    backgroundColor: "#C4C4C4",
    borderRadius: "5px",
    marginRight: "3px",
    padding: "0",
  },
  borderRadius: "5px",
  "& .Mui-selected": {
    color: "#FFFFFF",
    backgroundColor: "#00A24A",
    "&:hover": {
      backgroundColor: "#00A24A",
    },
  },
}));

const DateRangeStyled = styled(DateRange)`
  .rdrInRange:not(.rdrDayPassive) {
    background-color: #e9e9e9 !important;
    color: #5b5b5b !important;
  }

  .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span {
    color: #5b5b5b !important;
  }

  .rdrEndEdge:not(.rdrDayPassive),
  .rdrStartEdge:not(.rdrDayPassive) {
    background-color: #00a24a !important;
    color: #5b5b5b !important;
    border-radius: 5px;
  }
`;

const PaginationItemStyled = styled(PaginationItem)(() => ({
  borderRadius: "5px",
  "&.Mui-selected": {
    backgroundColor: "#00A24A",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#00A24A",
    },
  },
  "&:hover": {
    backgroundColor: "#00A24A",
    color: "#FFFFFF",
  },
}));

const DivStyled = styled("div")(() => ({
  fontFamily: "'Baloo', sans-serif",
}));

const style = {
  position: "absolute" as "absolute",
  bottom: "0",
  left: "50%",
  transform: "translate(-50%, 0)",
  width: "100vw",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "0",
};

export const MobileTransactions = () => {
  const { gamesTransactionsData, setPage, page, optimizedSubmitFn } =
    useGamesTransactionsContext();

  const [filterData, setFilterData] = useState({
    type: ALL,
    status: ALL,
    filterRangeDate: "",
    last30days: "0",
    last7days: "0",
  });
  const initialRangeDate = [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ];
  const [rangeDate, setRangeDate]: any = useState(initialRangeDate);

  const handleChangeStartDate = (item: any) => {
    const newRangeDate = [item.selection];
    const newStartDate = dayjs(item.selection.startDate).format("YYYY-MM-DD");
    const newEndDate = item.selection.endDate
      ? dayjs(item.selection.endDate).format("YYYY-MM-DD")
      : null;
    setRangeDate(newRangeDate);
    setFilterData((prevState) => ({
      ...prevState,
      filterRangeDate: `${newStartDate},${newEndDate}`,
    }));

    optimizedSubmitFn({
      ...filterData,
      filterRangeDate: `${newStartDate},${newEndDate}`,
    });
  };

  const [openModalTransaction, setOpenModalTransaction] = useState(false);
  const [modalTransactionType, setModalTransactionType] = useState("");

  const handleCloseModalTransaction = () => {
    setOpenModalTransaction(false);
    setModalTransactionType("");
  };

  const handleFilterByRangeDate = () => {
    setOpenModalTransaction(true);
    setModalTransactionType(FILTER.DATE);
  };

  const handleFilterByStatus = () => {
    setOpenModalTransaction(true);
    setModalTransactionType(FILTER.STATUS);
  };

  const recordsPerPage = 15;
  const pageCount = Math.ceil(
    gamesTransactionsData?.totalCount / recordsPerPage
  );

  const navigate = useNavigate();

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const currentDate = new Date();

  const minDate =
    filterData.last7days === "1"
      ? new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)
      : filterData.last30days === "1"
      ? new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000)
      : undefined;

  const renderModalContent = () => {
    return (
      <Box sx={style}>
        <Grid container direction="column">
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              sx={{ pt: 5, pb: 0, px: 2.5 }}
            >
              <Grid item sx={{ marginTop: "2px" }}>
                {modalTransactionType === FILTER.DATE ? (
                  <Box
                    component="img"
                    alt="Calendar Icon"
                    src={calendarIcon}
                    height={20}
                  />
                ) : (
                  <Box
                    component="img"
                    alt="Filter Black Icon"
                    src={filterBlackIcon}
                    height={20}
                    sx={{
                      marginTop: "1px",
                    }}
                  />
                )}
              </Grid>
              <Grid item ml={0}>
                <Typography
                  fontFamily="Baloo"
                  fontSize={18}
                  fontWeight={500}
                  color="#00A24A"
                  textAlign="center"
                >
                  {modalTransactionType === FILTER.DATE
                    ? "Choose a Date Range"
                    : "Filter Transaction"}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={handleCloseModalTransaction}
                  sx={{ marginTop: "-3px" }}
                >
                  <Box
                    component="img"
                    alt="Close Icon"
                    src={closeIcon}
                    height={15}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item py={1}>
            <Grid container direction="column" alignItems="center">
              <Grid
                item
                sx={{
                  pb: 1,
                  borderBottom: "1px solid #C4C4C4",
                  width: "90%",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item py={1}>
          {modalTransactionType === FILTER.DATE ? (
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <DivStyled>
                  <DateRangeStyled
                    maxDate={new Date()}
                    minDate={minDate}
                    editableDateInputs={true}
                    onChange={handleChangeStartDate}
                    moveRangeOnFirstSelection={false}
                    ranges={rangeDate}
                  />
                </DivStyled>
              </Grid>
            </Grid>
          ) : (
            <Grid container direction="column" py={2} px={2}>
              <Grid item>
                <Typography fontFamily="Baloo" fontSize={16} fontWeight={500}>
                  By Status
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: 1 }}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      sx={{
                        py: "20px",
                        backgroundColor:
                          filterData.status === ALL ? "#00A24A" : "#D9D9D9",
                        boxShadow: 0,
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor:
                            filterData.status === ALL ? "#00A24A" : "#D9D9D9",
                        },
                      }}
                      onClick={() => {
                        setFilterData((prevState) => ({
                          ...prevState,
                          status: ALL,
                        }));
                        optimizedSubmitFn({
                          ...filterData,
                          status: ALL,
                        });
                      }}
                    >
                      <Typography
                        fontFamily="Baloo"
                        fontSize={12}
                        fontWeight={500}
                      >
                        All
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      sx={{
                        py: "20px",
                        backgroundColor:
                          filterData.status === COMPLETED
                            ? "#00A24A"
                            : "#D9D9D9",
                        boxShadow: 0,
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor:
                            filterData.status === COMPLETED
                              ? "#00A24A"
                              : "#D9D9D9",
                        },
                      }}
                      onClick={() => {
                        setFilterData((prevState) => ({
                          ...prevState,
                          status: COMPLETED,
                        }));
                        optimizedSubmitFn({
                          ...filterData,
                          status: COMPLETED,
                        });
                      }}
                    >
                      <Typography
                        fontFamily="Baloo"
                        fontSize={12}
                        fontWeight={500}
                      >
                        Completed
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor:
                          filterData.status === PENDING ? "#00A24A" : "#D9D9D9",
                        py: "20px",
                        boxShadow: 0,
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: PENDING ? "#00A24A" : "#D9D9D9",
                        },
                      }}
                      onClick={() => {
                        setFilterData((prevState) => ({
                          ...prevState,
                          status: PENDING,
                        }));
                        optimizedSubmitFn({
                          ...filterData,
                          status: PENDING,
                        });
                      }}
                    >
                      <Typography
                        fontFamily="Baloo"
                        fontSize={12}
                        fontWeight={500}
                      >
                        Pending
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      sx={{
                        py: "20px",
                        backgroundColor:
                          filterData.status === FAILED ? "#00A24A" : "#D9D9D9",
                        boxShadow: 0,
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: FAILED ? "#00A24A" : "#D9D9D9",
                        },
                      }}
                      onClick={() => {
                        setFilterData((prevState) => ({
                          ...prevState,
                          status: FAILED,
                        }));
                        optimizedSubmitFn({
                          ...filterData,
                          status: FAILED,
                        });
                      }}
                    >
                      <Typography
                        fontFamily="Baloo"
                        fontSize={12}
                        fontWeight={500}
                      >
                        Failed
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item></Grid>
      </Box>
    );
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{ height: "100vh" }}
      >
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ pt: 1 }}
              >
                <Grid item xs={4}>
                  <IconButton onClick={() => navigate("/")}>
                    <Box
                      component="img"
                      alt="Left Arrow"
                      src={rightArrowIcon}
                      height={15}
                      sx={{
                        WebkitTransform: "scaleX(-1)",
                        transform: "scaleX(-1)",
                      }}
                    />
                  </IconButton>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    fontFamily="Baloo"
                    fontSize={18}
                    textAlign="center"
                    mt="7px"
                  >
                    Transactions
                  </Typography>
                </Grid>
                <Grid item xs={4} />
              </Grid>
            </Grid>
            {/* Divider */}
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Grid
                  item
                  sx={{
                    pb: 1,
                    borderBottom: "2px solid #C4C4C4",
                    width: "95%",
                  }}
                />
              </Grid>
            </Grid>
            {/* Menus */}
            <Grid item pt={2}>
              <Grid
                container
                direction="row"
                alignContent="center"
                justifyContent="space-evenly"
              >
                <Grid
                  item
                  sx={{
                    borderRight: "1px solid #C4C4C4",
                  }}
                  onClick={() => {
                    setFilterData((prevState) => ({
                      ...prevState,
                      type: ALL,
                    }));
                    optimizedSubmitFn({
                      ...filterData,
                      type: ALL,
                    });
                  }}
                >
                  <Typography
                    fontFamily="Baloo"
                    fontSize={16}
                    color={filterData.type === ALL ? "#00A24A" : "#000000"}
                    fontWeight={filterData.type === ALL ? "600" : "400"}
                    textAlign="center"
                    sx={{ px: 3 }}
                  >
                    All
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    borderRight: "1px solid #C4C4C4",
                  }}
                  onClick={() => {
                    setFilterData((prevState) => ({
                      ...prevState,
                      type: DEPOSIT,
                    }));
                    optimizedSubmitFn({
                      ...filterData,
                      type: DEPOSIT,
                    });
                  }}
                >
                  <Typography
                    fontFamily="Baloo"
                    fontSize={16}
                    color={filterData.type === DEPOSIT ? "#00A24A" : "#000000"}
                    fontWeight={filterData.type === DEPOSIT ? "600" : "400"}
                    textAlign="center"
                    sx={{ pr: 3 }}
                  >
                    Deposit
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    borderRight: "1px solid #C4C4C4",
                  }}
                  onClick={() => {
                    setFilterData((prevState) => ({
                      ...prevState,
                      type: WITHDRAW,
                    }));
                    optimizedSubmitFn({
                      ...filterData,
                      type: WITHDRAW,
                    });
                  }}
                >
                  <Typography
                    fontFamily="Baloo"
                    fontSize={16}
                    color={filterData.type === WITHDRAW ? "#00A24A" : "#000000"}
                    fontWeight={filterData.type === WITHDRAW ? "600" : "400"}
                    textAlign="center"
                    sx={{ pr: 3 }}
                  >
                    Withdraw
                  </Typography>
                </Grid>
                <Grid
                  item
                  onClick={() => {
                    setFilterData((prevState) => ({
                      ...prevState,
                      type: GAME,
                    }));
                    optimizedSubmitFn({
                      ...filterData,
                      type: GAME,
                    });
                  }}
                >
                  <Typography
                    fontFamily="Baloo"
                    fontSize={16}
                    color={filterData.type === GAME ? "#00A24A" : "#000000"}
                    fontWeight={filterData.type === GAME ? "600" : "400"}
                    textAlign="center"
                    sx={{ pr: 3 }}
                  >
                    Game
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* Action Buttons */}
            <Grid item pt={2}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                px={2}
              >
                <Grid item>
                  <Grid container direction="row" ml={1} gap={1}>
                    <Grid item>
                      <Button
                        variant="outlined"
                        sx={{
                          py: 1,
                          border: `1px solid ${
                            filterData.last30days === "1"
                              ? "#00A24A"
                              : "#C4C4C4"
                          }`,
                          "&:hover": {
                            border: "1px solid  #C4C4C4",
                          },
                        }}
                        onClick={() => {
                          setFilterData((prevState) => ({
                            ...prevState,
                            last30days:
                              prevState.last30days === "0" ? "1" : "0",
                            last7days: "0",
                          }));
                          const last30days =
                            filterData.last30days === "0" ? "1" : "0";
                          optimizedSubmitFn({
                            ...filterData,
                            last30days,
                            last7days: "0",
                          });
                        }}
                      >
                        <Typography
                          fontFamily="Baloo"
                          fontSize={12}
                          color={
                            filterData.last30days === "1"
                              ? "#00A24A"
                              : "#C4C4C4"
                          }
                        >
                          Last 30 days
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        sx={{
                          py: 1,
                          border: `1px solid ${
                            filterData.last7days === "1" ? "#00A24A" : "#C4C4C4"
                          }`,
                          "&:hover": {
                            border: "1px solid  #C4C4C4",
                          },
                        }}
                        onClick={() => {
                          setFilterData((prevState) => ({
                            ...prevState,
                            last7days: prevState.last7days === "0" ? "1" : "0",
                            last30days: "0",
                          }));
                          optimizedSubmitFn({
                            ...filterData,
                            last7days: filterData.last7days === "0" ? "1" : "0",
                            last30days: "0",
                          });
                        }}
                      >
                        <Typography
                          fontFamily="Baloo"
                          fontSize={12}
                          color={
                            filterData.last7days === "1" ? "#00A24A" : "#C4C4C4"
                          }
                        >
                          Last 7 days
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <IconButton onClick={() => handleFilterByRangeDate()}>
                        <Box
                          component="img"
                          alt="Calendar Icon"
                          src={calendarIcon}
                          height={25}
                        />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => handleFilterByStatus()}>
                        <Box
                          component="img"
                          alt="Filter Icon"
                          src={filterIcon}
                          height={20}
                          sx={{
                            backgroundColor: "#808080",
                            p: "5px 5px",
                            borderRadius: "5px",
                            color: "#FFFFFF",
                            marginTop: "-2px",
                          }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* Records */}
            <Grid
              item
              pt={1}
              px={3}
              sx={{
                height: "68.5vh",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <Grid container direction="column">
                <Grid item xs={12}>
                  {gamesTransactionsData?.content?.map(
                    (values: any, i: any) => {
                      return (
                        <div key={`game-transaction-${i}`}>
                          <TransactionItem values={values} />
                        </div>
                      );
                    }
                  )}
                </Grid>
                {pageCount > 0 && (
                  <Grid
                    item
                    xs={12}
                    sx={{ position: "absolute", bottom: 20, left: 0, right: 0 }}
                  >
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      mt={2}
                    >
                      <PaginationStyled
                        count={pageCount}
                        //page={page === 0 ? 1 : page - 1} // Set current page
                        page={page}
                        onChange={handleChangePage} // Handle page change
                        renderItem={(item) => {
                          return <PaginationItemStyled {...item} />;
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <PopupModal
        openModal={openModalTransaction}
        onCloseModal={handleCloseModalTransaction}
      >
        {renderModalContent()}
      </PopupModal>
    </>
  );
};
