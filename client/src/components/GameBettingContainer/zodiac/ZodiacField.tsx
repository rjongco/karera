import { Grid } from "@mui/material";
import { ZodiacTextField } from "./ZodiacTextField";
import { ZodiacButton } from "./ZodiacButton";

export const ZodiacField = (props: any) => {
  const { zodiacs, value, setFieldValue, onTypeModal } = props;

  return (
    <Grid container direction="column">
      <Grid item>
        <ZodiacTextField
          type="number"
          min="0"
          disabled
          placeholder="₱ 0.00"
          name={zodiacs.name}
          value={value || ""}
          onChange={(value: any) => {
            setFieldValue(zodiacs.name, value);
          }}
        />
      </Grid>
      <Grid item>
        <ZodiacButton
          name={zodiacs.label}
          color={zodiacs.bgColor}
          logo={zodiacs.logo}
          onClick={() => onTypeModal(zodiacs)}
        />
      </Grid>
    </Grid>
  );
};
