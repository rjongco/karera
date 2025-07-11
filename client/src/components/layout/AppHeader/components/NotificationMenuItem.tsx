import { Grid, Typography, styled } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import moment from "moment";
import { useState } from "react";
import LongContentCell from "../../../table/components/LongContentCell";

const GridStyled = styled(Grid)(() => ({
  transition: "background-color 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.2)", //
    cursor: "pointer",
  },
}));

export const NotificationMenuItem = (props: any) => {
  const { values, onUpdateRead } = props;

  const [isRead, setIsRead] = useState(values?.isRead);

  const handleToggleRead = () => {
    setIsRead((prevIsRead: any) => {
      const updatedIsRead = !prevIsRead;
      const payload = { isRead: updatedIsRead, id: values.id };
      onUpdateRead(payload); // Pass the updated state to onUpdateRead
      return updatedIsRead; // Return the updated state for useState
    });
  };

  const handleToggleReadAPI = () => {
    const payload = {
      isRead: true,
      id: values.id,
      module: values.module,
      reference: values.reference,
    };
    setIsRead(true);
    onUpdateRead(payload);
  };

  const createdAtMoment = moment(values?.createdAt);

  // Get the "time ago" string
  const timeAgoString = createdAtMoment.fromNow();

  return (
    <>
      <Grid item>
        <GridStyled
          container
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 1,
            py: 1,
            color: "white",
            border: "1px solid #d3d3d3",
          }}
        >
          <Grid item xs={1} onClick={handleToggleRead}>
            {!isRead ? (
              <FiberManualRecordIcon
                style={{
                  color: "black",
                  fontSize: "10px",
                  marginLeft: "5px",
                }}
              />
            ) : (
              <FiberManualRecordOutlinedIcon
                style={{
                  fontSize: "10px",
                  marginLeft: "5px",
                  color: "gray",
                }}
              />
            )}
          </Grid>
          <Grid item xs={11} sx={{ pt: "2px" }} onClick={handleToggleReadAPI}>
            <Grid container direction="column" sx={{ ml: 1, pr: 1 }}>
              <Grid item>
                <Typography
                  variant="body2"
                  sx={{
                    color: "black",
                    lineHeight: "20px",
                    fontWeight: !isRead ? "600" : "400",
                  }}
                >
                  <LongContentCell
                    content={values.message}
                    maxLength={150}
                    noLink={true}
                  />
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="button"
                  sx={{
                    color: "#3a3a3a",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  {timeAgoString}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </GridStyled>
      </Grid>
    </>
  );
};
