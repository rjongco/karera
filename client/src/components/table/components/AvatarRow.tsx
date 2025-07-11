import { Avatar, styled } from "@mui/material";
import { BASE_URL, IMAGE_URL_USER } from "../../../constants";
import { AccountCircle } from "@mui/icons-material";

interface IAvatarRowProps {
  profilePicture: any;
  id: any;
}

export const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: "30px",
  height: "30px",
  [theme.breakpoints.only("xs")]: {
    width: "30px",
    height: "30px",
  },
}));

export const AvatarRow: React.FC<IAvatarRowProps> = (props) => {
  const { profilePicture, id } = props;
  return profilePicture ? (
    <AvatarStyled
      src={`${IMAGE_URL_USER}/${id}/${profilePicture}`}
      alt="Image"
      sx={{
        mx: "auto",
      }}
    />
  ) : (
    <AccountCircle sx={{ fontSize: "30px", mt: "5px" }} />
  );
};
