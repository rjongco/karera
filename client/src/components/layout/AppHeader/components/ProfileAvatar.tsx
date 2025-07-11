import { Avatar } from "@mui/material";
import { IMAGE_URL_USER } from "../../../../constants";

export const ProfileAvatar = (props: any) => {
  const { userInfo } = props;
  const id = userInfo?.id;

  return (
    <Avatar
      //  @ts-ignore
      src={`${IMAGE_URL_USER}/${id}/${userInfo?.profilePicture}`}
      alt="Image"
    />
  );
};
