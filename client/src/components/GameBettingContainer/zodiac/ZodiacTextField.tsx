import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useField } from "formik";

export const ZodiacTextField = (props: any) => {
  const { onChange, ...rest } = props;

  const [field, meta] = useField(rest);

  const handleChange = (event: any) => {
    const { value } = event.target;
    field.onChange(event); // Manually trigger Formik's onChange
    if (onChange) {
      onChange(value); // Call the custom onChange handler
    }
  };

  const TextFieldStyled = styled(TextField)(() => ({
    "& input:disabled": {
      color: "red", // Set disabled text color to red
    },
    "& input::placeholder": {
      color: "blue", // Change placeholder color
    },
    "& fieldset": {
      border: "none",
    },
  }));

  return (
    <TextFieldStyled
      {...field}
      {...props}
      fullWidth
      size="small"
      variant="outlined"
      inputProps={{
        style: {
          border:
            meta.touched && !!meta.error
              ? "1px solid #d32f2f"
              : "1px solid #999999",
          borderRadius: "5px",
          width: "100%",
          color: "#000000",
          paddingTop: "6px",
          height: "15px",
        },
      }}
      onChange={handleChange}
      error={meta.touched && !!meta.error}
    />
  );
};
