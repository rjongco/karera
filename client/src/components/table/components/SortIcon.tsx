import { Grid, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export const SortIcon = (props: any) => {
  const { headCell, sortFields, handleSortToggle } = props;

  return sortFields[headCell.id] === "DESC" ? (
    <Grid item>
      <Grid container justifyContent="flex-start">
        <IconButton
          aria-label="sort-desc"
          //  @ts-ignore
          onClick={() => {
            handleSortToggle(headCell?.id);
          }}
          sx={{ m: 0, p: 0 }}
        >
          <FilterListIcon sx={{ fontSize: "16px", mt: "2px" }} />
        </IconButton>
      </Grid>
    </Grid>
  ) : (
    <Grid item>
      <Grid container justifyContent="flex-start">
        <IconButton
          aria-label="sort-asc"
          //  @ts-ignore
          onClick={() => {
            handleSortToggle(headCell?.id);
          }}
          sx={{ m: 0, p: 0 }}
        >
          <FilterListIcon
            sx={{
              fontSize: "16px",
              mt: "2px",
              transform: "scaleY(-1)",
            }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};
