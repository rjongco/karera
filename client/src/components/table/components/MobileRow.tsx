import { Grid, Tooltip, Typography, styled } from "@mui/material";
import WordEllipsis from "../../WordEllipsis";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface IMobileRowProps {
  mobile: any;
  isMobileVerified: any;
}
export const NameStyled = styled(Typography)(() => ({
  maxWidth: "10px",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const MobileRow: React.FC<IMobileRowProps> = (props) => {
  const { mobile, isMobileVerified } = props;
  return (
    <Tooltip
      title={mobile}
      enterDelay={500}
      // @ts-ignore
      interactive
    >
      <NameStyled variant="overline" noWrap>
        {mobile} asdasdasdasdasdasdasd
      </NameStyled>
    </Tooltip>
  );
};
