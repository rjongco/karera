import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { UserManagementSchema } from "../../../utils/schema";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
} from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number-2";
import { ROLES } from "../../../constants";
import {
  canViewSelectRoleAccounting,
  canViewSelectRoleAdministrator,
  canViewSelectRoleAgent,
  canViewSelectRoleMasteragent,
  canViewSelectRoleModerator,
  canViewSelectRoleOperator,
  canViewSelectRolePlayer,
  canViewSelectRoleSuperAgent,
  canViewSelectRoleSuperadmin,
  canViewSelectRoleSupervisor,
  canViewSelectRoleVerifier,
} from "../../../utils/permissions/userManagement";

type IUserManagementFormProps = {
  innerRef?: any;
  validateRef?: any;
  setTouchedRef?: any;
  isLoading?: any;
  values?: any;
  handleSubmit?: any;
  userManagementState?: any;
  onCloseModal: any;
  userInfo: any;
};

export const UserManagementForm: React.FunctionComponent<
  IUserManagementFormProps
> = ({
  innerRef,
  validateRef,
  setTouchedRef,
  isLoading,
  values,
  handleSubmit,
  onCloseModal,
  userManagementState,
  userInfo,
}) => {
  const roleRef = useRef(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Formik
      innerRef={innerRef}
      initialValues={{
        ...values,
      }}
      validationSchema={UserManagementSchema}
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
                <Grid item xs={12} sm={12} md={12}>
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
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    type="text"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
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
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    type="text"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    fullWidth
                    variant="standard"
                    onChange={(e: any) => {
                      const uppercaseValue = e.target.value.toUpperCase(); // Convert to uppercase
                      setFieldValue("lastName", uppercaseValue);
                    }}
                    error={Boolean(
                      (errors.lastName && touched.lastName) ||
                        userManagementState.errorMessage["lastName"]
                    )}
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
                <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
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
                      defaultValue=""
                      fullWidth
                      value={values.role || ""}
                      variant="standard"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        errors.role || userManagementState.errorMessage["role"]
                      )}
                    >
                      {/*  @ts-ignore */}
                      {canViewSelectRoleSuperadmin(userInfo?.role) && (
                        <MenuItem value={ROLES.SUPERADMIN.name}>
                          {ROLES.SUPERADMIN.label}
                        </MenuItem>
                      )}
                      {/*  @ts-ignore */}
                      {canViewSelectRoleAdministrator(userInfo?.role) && (
                        <MenuItem value={ROLES.ADMINISTRATOR.name}>
                          {ROLES.ADMINISTRATOR.label}
                        </MenuItem>
                      )}
                      {/*  @ts-ignore */}
                      {canViewSelectRoleSupervisor(userInfo?.role) && (
                        <MenuItem value={ROLES.SUPERVISOR.name}>
                          {ROLES.SUPERVISOR.label}
                        </MenuItem>
                      )}
                      {/*  @ts-ignore */}
                      {canViewSelectRoleVerifier(userInfo?.role) && (
                        <MenuItem value={ROLES.VERIFIER.name}>
                          {ROLES.VERIFIER.label}
                        </MenuItem>
                      )}
                      {/*  @ts-ignore */}
                      {canViewSelectRoleOperator(userInfo?.role) && (
                        <MenuItem value={ROLES.OPERATOR.name}>
                          {ROLES.OPERATOR.label}
                        </MenuItem>
                      )}
                      {/*  @ts-ignore */}
                      {canViewSelectRoleSuperAgent(userInfo?.role) && (
                        <MenuItem value={ROLES.SUPERAGENT.name}>
                          {ROLES.SUPERAGENT.label}
                        </MenuItem>
                      )}
                      {/*  @ts-ignore */}
                      {canViewSelectRoleMasteragent(userInfo?.role) && (
                        <MenuItem value={ROLES.MASTERAGENT.name}>
                          {ROLES.MASTERAGENT.label}
                        </MenuItem>
                      )}
                      {/*  @ts-ignore */}
                      {canViewSelectRoleAgent(userInfo?.role) && (
                        <MenuItem value={ROLES.AGENT.name}>
                          {ROLES.AGENT.label}
                        </MenuItem>
                      )}
                      {/*  @ts-ignore */}
                      {canViewSelectRoleModerator(userInfo?.role) && (
                        <MenuItem value={ROLES.MODERATOR.name}>
                          {ROLES.MODERATOR.label}
                        </MenuItem>
                      )}
                      {/*  @ts-ignore */}
                      {canViewSelectRoleAccounting(userInfo?.role) && (
                        <MenuItem value={ROLES.ACCOUNTING.name}>
                          {ROLES.ACCOUNTING.label}
                        </MenuItem>
                      )}
                      {/*  @ts-ignore */}
                      {canViewSelectRolePlayer(userInfo?.role) && (
                        <MenuItem value={ROLES.PLAYER.name}>
                          {ROLES.PLAYER.label}
                        </MenuItem>
                      )}
                    </Select>
                    {errors.role ? (
                      <FormHelperText sx={{ color: "red" }}>
                        {/*  @ts-ignore */}
                        {errors.role}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Grid sx={{ width: "100%", mt: 5 }}>
              <Grid container justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={(e: any) => {
                    e.preventDefault();
                    const castValues = UserManagementSchema.cast(values);
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
