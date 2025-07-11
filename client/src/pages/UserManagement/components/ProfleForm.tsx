import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { UserManagementUpdateSchema } from "../../../utils/schema";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
  MenuItem,
  Autocomplete,
  CircularProgress,
  Chip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import MuiPhoneNumber from "material-ui-phone-number-2";
import { ROLES } from "../../../constants";
import { useUserManagementContext } from "../../../context/UserManagementContext";
import {
  canEditProfileCommission,
  canEditUserRoleField,
  canEditUserGroupsField,
} from "../../../utils/permissions/userManagement";

type IProfileFormProps = {
  innerRef?: any;
  validateRef?: any;
  setTouchedRef?: any;
  isLoading?: any;
  values?: any;
  handleSubmit?: any;
  userManagementState?: any;
};

export const ProfileForm: React.FunctionComponent<IProfileFormProps> = ({
  innerRef,
  validateRef,
  setTouchedRef,
  values,
  handleSubmit,
  userManagementState,
}) => {
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [edit, setEdit] = useState(false);

  // @ts-ignore
  const {
    // @ts-ignore
    userGroups,
  } = useUserManagementContext();
  // @ts-ignore

  const loading = open && options.length === 0;

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(1000);
      if (active) {
        // @ts-ignore
        setOptions([...userGroups]);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const renderTags = (value: any) =>
    value.map((option: any, index: any, array: any) => {
      return (
        <span
          key={index}
          style={{
            marginRight: "5px",
          }}
        >
          {option.fullName}
          {index !== array.length - 1 && ","}
        </span>
      );
    });

  return (
    <Formik
      innerRef={innerRef}
      initialValues={{
        ...values,
      }}
      validationSchema={UserManagementUpdateSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values);

        if (!error) {
          actions.resetForm();
        }
      }}
    >
      {({
        values,
        handleSubmit,
        isValid,
        errors,
        touched,
        setTouched,
        validateForm,
        setFieldValue,
        handleBlur,
        handleChange,
        setValues,
      }) => {
        if (validateRef) validateRef.current = validateForm;
        if (setTouchedRef) setTouchedRef.current = setTouched;

        return (
          <>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={12}>
                  <MuiPhoneNumber
                    id="mobile"
                    name="mobile"
                    label="Phone Number"
                    defaultCountry={"ph"}
                    regions={["asia"]}
                    fullWidth
                    value={values.mobile}
                    autoFormat={false}
                    // @ts-ignore
                    onChange={(val: string) => {
                      setFieldValue("mobile", val);
                      userManagementState.errorMessage = { mobile: "" };
                    }}
                    onBlur={handleBlur}
                    onlyCountries={["ph"]}
                    countryCodeEditable={false}
                    error={Boolean(
                      (errors.mobile && touched.mobile) ||
                        userManagementState.errorMessage["mobile"]
                    )}
                    // @ts-ignore
                    helperText={
                      errors.mobile && touched.mobile
                        ? errors.mobile
                        : userManagementState.errorMessage
                        ? userManagementState.errorMessage["mobile"]
                        : ""
                    }
                  />
                </Grid>
                <Grid xs={12} sm={12} md={12}>
                  <TextField
                    type="text"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={values.firstName || ""}
                    fullWidth
                    variant="standard"
                    onChange={(e: any) => {
                      const uppercaseValue = e.target.value.toUpperCase(); // Convert to uppercase
                      setFieldValue("firstName", uppercaseValue);
                    }}
                    onBlur={handleBlur}
                    error={Boolean(
                      (errors.firstName && touched.firstName) ||
                        userManagementState.errorMessage["firstName"]
                    )}
                    helperText={
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : userManagementState.errorMessage
                        ? userManagementState.errorMessage["firstName"]
                        : ""
                    }
                  />
                </Grid>
                <Grid xs={12} sm={12} md={12}>
                  <TextField
                    type="text"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={values.lastName || ""}
                    fullWidth
                    variant="standard"
                    error={Boolean(
                      (errors.lastName && touched.lastName) ||
                        userManagementState.errorMessage["lastName"]
                    )}
                    onChange={(e: any) => {
                      const uppercaseValue = e.target.value.toUpperCase(); // Convert to uppercase
                      setFieldValue("lastName", uppercaseValue);
                    }}
                    onBlur={handleBlur}
                    // @ts-ignore
                    helperText={
                      errors.lastName && touched.lastName
                        ? errors.lastName
                        : userManagementState.errorMessage
                        ? userManagementState.errorMessage["lastName"]
                        : ""
                    }
                  />
                </Grid>
                <Grid xs={12} sm={12} md={12}>
                  <TextField
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    value={values.email || ""}
                    fullWidth
                    variant="standard"
                    error={Boolean(
                      (errors.email && touched.email) ||
                        userManagementState.errorMessage["email"]
                    )}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // @ts-ignore
                    helperText={
                      errors.email && touched.email
                        ? errors.email
                        : userManagementState.errorMessage
                        ? userManagementState.errorMessage["email"]
                        : ""
                    }
                  />
                </Grid>
                {canEditUserRoleField(values?.role) && (
                  <Grid xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel
                        htmlFor="select-component"
                        sx={{
                          color: errors.role ? "red" : undefined,
                          paddingLeft: "-12px",
                          transform: "translateY(-6px)",
                          background: "#fff",
                        }}
                      >
                        Role
                      </InputLabel>
                      <Select
                        id="role"
                        name="role"
                        displayEmpty
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={values.role}
                        onBlur={handleBlur}
                        error={Boolean(
                          errors.role ||
                            userManagementState.errorMessage["role"]
                        )}
                      >
                        <MenuItem value={ROLES.SUPERADMIN.name}>
                          {ROLES.SUPERADMIN.label}
                        </MenuItem>
                        <MenuItem value={ROLES.ADMINISTRATOR.name}>
                          {ROLES.ADMINISTRATOR.label}
                        </MenuItem>
                        <MenuItem value={ROLES.SUPERVISOR.name}>
                          {ROLES.SUPERVISOR.label}
                        </MenuItem>
                        <MenuItem value={ROLES.VERIFIER.name}>
                          {ROLES.VERIFIER.label}
                        </MenuItem>
                        <MenuItem value={ROLES.OPERATOR.name}>
                          {ROLES.OPERATOR.label}
                        </MenuItem>
                        <MenuItem value={ROLES.MASTERAGENT.name}>
                          {ROLES.MASTERAGENT.label}
                        </MenuItem>
                        <MenuItem value={ROLES.AGENT.name}>
                          {ROLES.AGENT.label}
                        </MenuItem>
                        <MenuItem value={ROLES.MODERATOR.name}>
                          {ROLES.MODERATOR.label}
                        </MenuItem>
                        <MenuItem value={ROLES.ACCOUNTING.name}>
                          {ROLES.ACCOUNTING.label}
                        </MenuItem>
                        <MenuItem value={ROLES.PLAYER.name}>
                          {ROLES.PLAYER.label}
                        </MenuItem>
                      </Select>
                      {errors.role && (
                        <FormHelperText sx={{ color: "red" }}>
                          {/*  @ts-ignore */}
                          {errors.role}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                )}
                {canEditProfileCommission(values?.role) && (
                  <Grid xs={12} sm={12} md={12}>
                    <TextField
                      type="text"
                      id="commission"
                      name="commission"
                      label="Commission"
                      value={values.commission}
                      fullWidth
                      variant="standard"
                      error={Boolean(
                        (errors.commission && touched.commission) ||
                          userManagementState.errorMessage["commission"]
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // @ts-ignore
                      helperText={
                        errors.commission && touched.commission
                          ? errors.commission
                          : userManagementState.errorMessage
                          ? userManagementState.errorMessage["commission"]
                          : ""
                      }
                    />
                  </Grid>
                )}

                {canEditUserGroupsField(values.role) && (
                  <>
                    <Grid xs={12} sm={12} md={12}>
                      <Autocomplete
                        id="userGroups"
                        multiple
                        open={open}
                        onOpen={() => {
                          setOpen(true);
                        }}
                        onClose={() => {
                          setOpen(false);
                        }}
                        value={values.userGroups}
                        options={options}
                        fullWidth
                        onChange={(event, multi, reason, single: any) => {
                          let array = [];
                          array = [...values.userGroups];
                          const { option } = single;
                          if (
                            array.some((group: any) => group.id === option.id)
                          ) {
                            const indexToRemove = array.findIndex(
                              (item) => item.id === option.id
                            );
                            if (indexToRemove !== -1) {
                              array.splice(indexToRemove, 1);
                            }
                          } else {
                            array.push({
                              fullName: option.fullName,
                              id: option.id,
                            });
                          }
                          setFieldValue("userGroups", array);
                        }}
                        getOptionLabel={(option) => option?.fullName}
                        // value={values.userGroups}
                        disableCloseOnSelect
                        renderTags={renderTags}
                        renderOption={(props, option, { selected }) => (
                          <Typography
                            {...props}
                            style={{
                              backgroundColor:
                                selected ||
                                values.userGroups.some(
                                  (group: any) => group.id === option.id
                                )
                                  ? "#e0f7fa" // Highlight if selected or already exists in userGroups
                                  : "transparent",
                              padding: "5px",
                            }}
                          >
                            {option.fullName}
                          </Typography>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Verifiers"
                            onBlur={handleBlur}
                            // @ts-ignore
                            error={Boolean(
                              (errors.userGroups && touched.userGroups) ||
                                userManagementState.errorMessage["userGroups"]
                            )}
                            // @ts-ignore
                            helperText={
                              errors.userGroups && touched.userGroups
                                ? errors.userGroups
                                : userManagementState.errorMessage
                                ? userManagementState.errorMessage["userGroups"]
                                : ""
                            }
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {loading ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={20}
                                    />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
            <Grid sx={{ width: "100%", mt: 5 }}>
              <Grid container justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={(e: any) => {
                    e.preventDefault();
                    const castValues = UserManagementUpdateSchema.cast(values);
                    setValues(castValues);
                    setError(isValid);
                    handleSubmit(e);
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </>
        );
      }}
    </Formik>
  );
};
