import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Grid, styled } from "@mui/material";

// @ts-ignore
const LightTooltip = styled(({ className, ...props }) => (
  // @ts-ignore
  <Tooltip {...props} classes={{ popper: className }} />
  // @ts-ignore
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 16,
    marginLeft: 0,
    fontWeight: 600,
    display: "none",
    [theme.breakpoints.only("xs")]: {
      display: "block",
    },
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "white",
  },
}));

// @ts-ignore

interface IWordEllipsisProps {
  title: string;
  sizeWidth: number;
  textAlign?: string;
  endAdornment?: any;
}

const WordEllipsis: React.FunctionComponent<IWordEllipsisProps> = (props) => {
  const { title, sizeWidth = 100, textAlign, endAdornment } = props;

  const EllipsisDefaultStyled = styled("div")(({ theme }) => {
    return {
      [theme.breakpoints.only("xs")]: {
        whiteSpace: "nowrap",
        width: `${sizeWidth}px`,
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: textAlign || "right",
      },
    };
  });

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      height="100%"
    >
      <Grid item>
        {/* @ts-ignore */}
        <LightTooltip title={title} placement="bottom" arrow>
          {/* @ts-ignore */}
          <EllipsisDefaultStyled sizeWidth={sizeWidth}>
            {/* @ts-ignore */}
            <span>{title}</span>
          </EllipsisDefaultStyled>
        </LightTooltip>
      </Grid>
      {endAdornment && <Grid item>{endAdornment}</Grid>}
    </Grid>
  );
};

export default WordEllipsis;
