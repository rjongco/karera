import {
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  TextField,
  FormControl,
  MenuItem,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { returnMommentDate } from "../../../../utils/logic";
import { NATIONALITIES, govTypeSelect } from "../../../../constants";

export const KYCPage5PersonalInfo = (props: any) => {
  const { userProfileState } = props;

  // @ts-ignore
  const {
    values,
    setFieldValue,
    errors,
    touched,
    handleBlur,
  }: {
    values: any;
    setFieldValue: any;
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
  } = useFormikContext();

  return (
    <Grid container direction="column">
      <Grid item sx={{ mt: 2, mb: 1 }}>
        <Typography
          fontSize={15}
          fontWeight={600}
          textAlign="center"
          color={"#5B5B5B"}
        >
          Personal Information
        </Typography>
      </Grid>
      <Grid item sx={{ mt: 1 }}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-label">
            Selected Gov't ID
          </InputLabel>
          <Select
            autoFocus
            labelId="govtType"
            id="govtType"
            value={values.govtType || 0}
            label="Selected Gov't ID"
            onChange={(e) => {
              setFieldValue("govtType", e.target.value);
            }}
          >
            {govTypeSelect
              .filter((obj) => obj.code === values.govtType)
              .map((obj, index: any) => {
                const { code, name } = obj;
                return (
                  <MenuItem key={index} value={code}>
                    {name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sx={{ mt: 2 }}>
        <TextField
          type="text"
          id="govtId"
          name="govtId"
          label="Gov't ID"
          value={values?.govtId || ""}
          fullWidth
          size="medium"
          variant="outlined"
          onChange={(e) => {
            setFieldValue("govtId", e.target.value);
          }}
          onBlur={() => {
            handleBlur("govtId");
          }}
          error={Boolean(
            (errors.govtId && touched.govtId) ||
              userProfileState?.errorMessage["govtId"]
          )}
          helperText={
            errors.govtId && touched.govtId
              ? errors.govtId
              : userProfileState.errorMessage
              ? userProfileState.errorMessage["govtId"]
              : ""
          }
        />
      </Grid>
      <Grid item sx={{ mt: 2 }}>
        <TextField
          type="text"
          id="firstName"
          name="firstName"
          label="First Name"
          variant="outlined"
          size="medium"
          value={values?.firstName || ""}
          fullWidth
          onChange={(e) => {
            const uppercaseValue = e.target.value.toUpperCase(); // Convert to uppercase
            setFieldValue("firstName", uppercaseValue);
          }}
          onBlur={() => {
            handleBlur("firstName");
          }}
          error={Boolean(
            (errors.firstName && touched.firstName) ||
              userProfileState?.errorMessage["firstName"]
          )}
          helperText={
            errors.firstName && touched.firstName
              ? errors.firstName
              : userProfileState?.errorMessage
              ? userProfileState?.errorMessage["firstName"]
              : ""
          }
        />
      </Grid>
      <Grid item sx={{ mt: 2 }}>
        <TextField
          type="text"
          id="lastName"
          name="lastName"
          label="Last Name"
          value={values.lastName || ""}
          fullWidth
          variant="outlined"
          size="medium"
          onChange={(e) => {
            const uppercaseValue = e.target.value.toUpperCase(); // Convert to uppercase
            setFieldValue("lastName", uppercaseValue);
          }}
          onBlur={() => {
            handleBlur("lastName");
          }}
          error={Boolean(
            (errors.lastName && touched.lastName) ||
              userProfileState?.errorMessage["lastName"]
          )}
          helperText={
            errors.lastName && touched.lastName
              ? errors.lastName
              : userProfileState?.errorMessage
              ? userProfileState?.errorMessage["lastName"]
              : ""
          }
        />
      </Grid>
      <Grid item sx={{ mt: 2 }}>
        <FormControl
          error={errors.gender && touched.gender}
          variant="outlined"
          fullWidth
        >
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            id="gender"
            name="gender"
            value={values.gender || ""}
            label="Gender"
            fullWidth
            onChange={(e) => {
              setFieldValue("gender", e.target.value);
            }}
            onBlur={() => {
              handleBlur("gender");
            }}
            error={Boolean(
              (errors.gender && touched.gender) ||
                userProfileState?.errorMessage["gender"]
            )}
          >
            <MenuItem value={0}>Select gender</MenuItem>
            <MenuItem value={1}>Male</MenuItem>
            <MenuItem value={2}>Female</MenuItem>
          </Select>
          <FormHelperText>
            {errors.gender && touched.gender
              ? errors.gender
              : userProfileState?.errorMessage
              ? userProfileState?.errorMessage["gender"]
              : ""}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item sx={{ mt: 2 }}>
        <FormControl fullWidth>
          <DatePicker
            label="Birthdate"
            value={dayjs(new Date(values.birthdate)) || null}
            // defaultValue={dayjs(new Date(values.birthdate))}
            // @ts-ignore
            id="birthdate"
            name="birthdate"
            format="YYYY-MM-DD"
            onChange={(date) => {
              setFieldValue("birthdate", returnMommentDate(date));
            }}
            onBlur={() => {
              handleBlur("birthdate");
            }}
            slotProps={{
              textField: {
                variant: "outlined",

                error: Boolean(errors.birthdate && touched.birthdate),
                helperText:
                  errors.birthdate && touched.birthdate
                    ? errors.birthdate
                    : userProfileState?.errorMessage
                    ? userProfileState?.errorMessage["birthdate"]
                    : "",
              },
            }}
          />
        </FormControl>
      </Grid>
      <Grid item sx={{ mt: 2 }}>
        <TextField
          type="text"
          id="placeOfBirth"
          name="placeOfBirth"
          label="Place of Birth"
          value={values?.placeOfBirth || ""}
          fullWidth
          variant="outlined"
          onChange={(e) => {
            setFieldValue("placeOfBirth", e.target.value);
          }}
          onBlur={() => {
            handleBlur("placeOfBirth");
          }}
          error={Boolean(
            (errors.placeOfBirth && touched.placeOfBirth) ||
              userProfileState?.errorMessage["placeOfBirth"]
          )}
          helperText={
            errors.placeOfBirth && touched.placeOfBirth
              ? errors.placeOfBirth
              : userProfileState?.errorMessage
              ? userProfileState?.errorMessage["placeOfBirth"]
              : ""
          }
        />
      </Grid>
      <Grid item sx={{ mt: 2 }}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
          <Select
            id="nationalities"
            name="nationalities"
            label="Nationality"
            defaultValue=""
            value={values.nationalities || ""}
            fullWidth
            variant="outlined"
            onChange={(e) => {
              setFieldValue("nationalities", e.target.value);
            }}
            onBlur={handleBlur}
            error={errors.nationalities && touched.nationalities}
          >
            {NATIONALITIES.map((nationality, i) => (
              <MenuItem key={`nationality-${i}`} value={nationality}>
                {nationality}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {errors.nationalities && touched.nationalities
              ? errors.nationalities
              : userProfileState?.errorMessage
              ? userProfileState?.errorMessage["nationalities"]
              : ""}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item sx={{ mt: 2 }}>
        <TextField
          type="text"
          id="natureOfWork"
          name="natureOfWork"
          label="Nature of Work"
          value={values?.natureOfWork || ""}
          fullWidth
          variant="outlined"
          onChange={(e) => {
            setFieldValue("natureOfWork", e.target.value);
          }}
          onBlur={() => {
            handleBlur("natureOfWork");
          }}
          error={Boolean(
            (errors.natureOfWork && touched.natureOfWork) ||
              userProfileState?.errorMessage["natureOfWork"]
          )}
          helperText={
            errors.natureOfWork && touched.natureOfWork
              ? errors.natureOfWork
              : userProfileState?.errorMessage
              ? userProfileState?.errorMessage["natureOfWork"]
              : ""
          }
        />
      </Grid>
      <Grid item sx={{ mt: 2 }}>
        <TextField
          type="email"
          id="email"
          name="email"
          label="Email"
          value={values.email || ""}
          fullWidth
          variant="outlined"
          error={Boolean(
            (errors.email && touched.email) ||
              userProfileState.errorMessage["email"]
          )}
          onChange={(e) => {
            setFieldValue("email", e.target.value);
          }}
          onBlur={() => {
            handleBlur("email");
          }}
          // @ts-ignore
          helperText={
            errors.email && touched.email
              ? errors.email
              : userProfileState.errorMessage
              ? userProfileState.errorMessage["email"]
              : ""
          }
        />
      </Grid>
      <Grid item sx={{ mt: 2 }}>
        <TextField
          type="text"
          id="sourceOfIncome"
          name="sourceOfIncome"
          label="Source of Income"
          value={values?.sourceOfIncome || ""}
          fullWidth
          variant="outlined"
          onChange={(e) => {
            setFieldValue("sourceOfIncome", e.target.value);
          }}
          onBlur={() => {
            handleBlur("sourceOfIncome");
          }}
          error={Boolean(
            (errors.sourceOfIncome && touched.sourceOfIncome) ||
              userProfileState?.errorMessage["sourceOfIncome"]
          )}
          helperText={
            errors.sourceOfIncome && touched.sourceOfIncome
              ? errors.sourceOfIncome
              : userProfileState?.errorMessage
              ? userProfileState?.errorMessage["sourceOfIncome"]
              : ""
          }
        />
      </Grid>
    </Grid>
  );
};
