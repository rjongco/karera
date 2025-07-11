import {
  Grid,
  IconButton,
  Typography,
  Pagination,
  PaginationItem,
  Badge,
  styled,
  Avatar,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import notificationIcon from "../../../assets/images/notification-icon.png";

import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../../../context/NotificationContext";
import { NotificationList } from "./NotificationList";
import { useState } from "react";
import { NotificationContent } from "./NotificationList/NoticationContent";
import { readNotifAPI } from "../../../api/notificationAPI";
import { useSWRConfig } from "swr";

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

export const MobileNotification = (props: any) => {
  const navigate = useNavigate();
  const [viewContent, setViewContent] = useState(false);
  const [viewContentData, setViewContentData] = useState({});
  const { mutate } = useSWRConfig();

  // test
  // @ts-ignore
  const {
    // @ts-ignore
    page,
    // @ts-ignore
    size,
    // @ts-ignore
    setPage,
    // @ts-ignore
    setSize,
    // @ts-ignore
    optimizedFn,
    // @ts-ignore
    optimizedSubmitFn,
    // @ts-ignore
    notificationData,
    // @ts-ignore
    notificationState,
    // @ts-ignore
    mutateNotification,
  } = useNotificationContext();

  const notificationCount = notificationData?.totalCountUnread;
  const notifCount = (count: number) => (count >= 100 ? `99+` : count);

  const handleNotificationContent = (values: any) => {
    readNotifAPI({ isRead: true, id: values?.id }).then(() => {
      mutate("/admin/notification/custom");
      mutate("/admin/notification/search");
    });
    setViewContent(true);
    setViewContentData(values);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const pageCount = Math.ceil(notificationData?.totalCount / size);

  return (
    <Grid container direction="column" sx={{ height: "100vh" }}>
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ pt: 1 }}
        >
          <Grid item>
            <IconButton
              onClick={() =>
                viewContent ? setViewContent(false) : navigate("/")
              }
            >
              <ChevronLeftIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography fontFamily="Baloo" fontSize={18} fontWeight={600}>
              Messages
            </Typography>
          </Grid>
          <Grid item pr={1}>
            <IconButton
              aria-label="notification"
              onClick={() => setViewContent(false)}
              sx={{ pl: 0 }}
            >
              <Badge
                badgeContent={
                  notificationCount !== undefined &&
                  notificationCount !== 0 && (
                    <Typography
                      variant="caption"
                      display="block"
                      style={{
                        border: "1px solid #d3d3d3",
                        backgroundColor: "black",
                        borderRadius: "50px",
                        padding: "3px 7px",
                        color: "yellow",
                        fontSize: "10px",
                        fontWeight: 600,
                      }}
                    >
                      {notifCount(notificationCount)}
                    </Typography>
                  )
                }
                sx={{ color: "white", mr: "5px" }}
              >
                <Avatar
                  alt="Notification Icon"
                  src={notificationIcon}
                  sx={{ width: 24, height: 24 }}
                />
              </Badge>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignContent="center">
          <Grid
            item
            sx={{ pb: 1, borderBottom: "2px solid #C4C4C4", width: "95%" }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        px={2}
        sx={{
          height: "80vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {viewContent ? (
          <NotificationContent values={viewContentData} />
        ) : (
          notificationData?.content.map((o: any, i: number, arr: any) => {
            return (
              <div key={`notification-list-${i}`}>
                <NotificationList
                  values={o}
                  index={i}
                  arr={arr}
                  viewContent={viewContent}
                  setNotificationContent={handleNotificationContent}
                />
              </div>
            );
          })
        )}
      </Grid>
      {pageCount > 0 && (
        <Grid
          item
          xs={12}
          sx={{ position: "absolute", bottom: 20, left: 0, right: 0 }}
        >
          <Grid container direction="column" alignItems="center" mt={2}>
            <PaginationStyled
              count={pageCount}
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
  );
};
