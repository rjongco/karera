import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

interface IAppFooterProps {}

//  @ts-ignore
const AppFooter: React.FC<IAppFooterProps> = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ my: 2 }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.globalxdigital.com/">
        GlobalX Digital Corp.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default AppFooter;
