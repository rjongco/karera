import { Box, Grid, Typography } from "@mui/material";
import {
  PaperHeaderStyled,
  FilterColumnStyled,
  AddUserButtonStyled,
  FilterUserButtonStyled,
  ExportUserButtonStyled
} from "./styles";

import { useUserManagementContext } from "../../context/UserManagementContext";
import { useContext, useEffect, useState } from "react";
import DataTable from "../../components/table/DataTable";
import { USER_MANAGEMENT_MODALS, USER_MANAGEMENT_TABLE } from "../../constants";
import BasicModal from "../../components/BasicModal";
import { UserManagementForm } from "./components/UserManagementForm";
import PersonIcon from "@mui/icons-material/Person";
import ImageIcon from "@mui/icons-material/Image";
import { useModalUserManagement } from "./useModalUserManagement";
import { ProfileForm } from "./components/ProfleForm";
import { PageComponent } from "../../components/PageComponent/index";
import { useAlert } from "../../utils/hooks/useAlert";
import { ProfileImage } from "./components/ProfileImage";
// import { ProfileView } from "./components/ProfileView";
import { ProfileView } from "./components/ProfileView";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from '@mui/icons-material/Restore';
import {
  ConfirmationDialog,
  useConfirmation,
  useConfirmationDelete,
  useConfirmationRestore,
} from "../../components/ConfirmationDialog";
import { useParams } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import walletIcon from "../../assets/images/wallet.png";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

import {
  canAddUser,
  canEditProfile,
  canUploadPhoto,
  canDeleteUser,
  canViewProfile,
  canViewAddCredit,
  canRestoreUser,
  canExportExcel,
  canFilter,
} from "../../utils/permissions/userManagement";
import { useSWRConfig } from "swr";
import { GlobalContext } from "../../context/GlobalProvider";
import { CreditForm } from "./components/CreditForm";
import { removeTrailingDot } from "../../utils/logic";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FilterView } from "./components/FilterView";
import { useExcel } from "../../utils/hooks/useExcel";
import { ExportExcelUserManagement } from "./components/ExportExcelUserManagement";

interface INotUserManagementProps {}

const UserManagement: React.FunctionComponent<INotUserManagementProps> = () => {
  // @ts-ignore
  const {
    page,
    size,
    setPage,
    setSize,
    optimizedFn,
    optimizedSubmitFn,
    usersData,
    provinceOptions,
    userManagementState,
    mutateUserManagement,
    dispatchUserManagement,
    actions: {
      addUser,
      updateUser,
      deleteUser,
      restoreUser,
      approveOrDeactiveVerifier,
      addCredit,
    },
  } = useUserManagementContext();
  const { mutate } = useSWRConfig();

  const {
    // @ts-ignore
    auth: userInfo,
  } = useContext(GlobalContext);

  const { handleAlertMessage, ...alertRest } = useAlert();
  const { exportExcel, setDataExcel, setExcelType } = useExcel();

  const [showNotif, setShowNotif] = useState(false);
  const [formData, setFormData] = useState({});
  const [formDataFilter, setFormDataFilter] = useState({});
  const [formDataCredit, setFormDataCredit] = useState({});
  const [optionType, setOptionType] = useState("");
  const [isMenuOnClose, setIsMenuOnClose] = useState(false);
  const [toDelete, setToDelete] = useState(undefined);
  const [toRestore, setToRestore] = useState(undefined);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const { id: paramId } = useParams();

  useEffect(() => {
    if (userManagementState.success) {
      handleAlertMessage(userManagementState.successMessage, "success");
      handleCloseModal();
      mutateUserManagement();
      setIsMenuOnClose(true);
    }
  }, [userManagementState.success]);

  useEffect(() => {
    if (isUploadSuccess) {
      handleAlertMessage("Image Uploaded Successfully", "success");
      handleCloseModal();
      mutateUserManagement();
    }
  }, [isUploadSuccess]);


  /* MODALS */
  const [openModal, setOpenModal] = useState(false);

  const handleAddUser = () => {
    setFormData({
      mobile: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      userGroups: [],
      commission: "",
    });
    setOpenModal(true);
    setOptionType(USER_MANAGEMENT_MODALS.ADD_USER?.name);
    renderModalContent();
  };

  const handleFilterUser = () => {
    setIsFilter(true)
    //setOpenModal(true);
    //setOptionType(USER_MANAGEMENT_MODALS.FILTER_USER?.name);
    //renderModalContent();
    //testing
  }

  const handleCloseFilter = () => {
    setIsFilter(false)
  }

  const handleOnTriggeredClick = () => {
    setIsMenuOnClose(true);
  };

  const handleOnSubmit = (values: any) => optimizedSubmitFn(values);

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsMenuOnClose(true);
  };

  const handleCloseModalProfileView = (status: any) => {
    setOpenModal(status);
  };

  const handleSubmit = (values: any) => {
    addUser(values);
    setOpenModal(false);
  };

  const handleSubmitAddCredit = (values: any) => {
    const { credit, id } = values;6
    const creditVal = removeTrailingDot(credit);
    const payload = {
      id,
      credit: creditVal,
    };
    addCredit(payload);
    setOpenModal(false);
  };

  const handleUploadImage = (status: any) => {
    setIsUploadSuccess(status);
  };

  const handleUpdateSubmit = (values: any) => {
    updateUser(values);
  };

  const handleFilter = (values:any) => {
    // const data = {} 
    // removeBarangayWord(data)
    // getKeysOnlyPlace(data)
    handleOnSubmit(values)
  }

  const { renderModalTitle } = useModalUserManagement(optionType);

  const renderModalContent = () => {
    if (optionType === USER_MANAGEMENT_MODALS.ADD_USER?.name) {
      return (
        <UserManagementForm
          userInfo={userInfo}
          values={formData}
          handleSubmit={handleSubmit}
          userManagementState={userManagementState}
          onCloseModal={handleCloseModal}
        />
      );
    } else if (optionType === USER_MANAGEMENT_MODALS.EDIT_PROFILE?.name) {
      return (
        <ProfileForm
          values={formData}
          handleSubmit={handleUpdateSubmit}
          userManagementState={userManagementState}
        />
      );
    } else if (optionType === USER_MANAGEMENT_MODALS.PROFILE_PICTURE?.name) {
      return (
        <ProfileImage
          values={formData}
          onCloseModal={handleCloseModal}
          statusUploading={handleUploadImage}
        />
      );
    } else if (optionType === USER_MANAGEMENT_MODALS.PROFILE?.name) {
      return (
        <ProfileView
          values={formData}
          userInfo={userInfo}
          onOpenModal={handleCloseModalProfileView}
          onTriggeredClick={handleOnTriggeredClick}
        />
      );
    } else if (optionType === USER_MANAGEMENT_MODALS.ADD_CREDIT?.name) {
      return (
        <CreditForm
          values={formDataCredit}
          userInfo={userInfo}
          userManagementState={userManagementState}
          handleSubmit={handleSubmitAddCredit}
        />
      );
    }
    // else if (optionType === USER_MANAGEMENT_MODALS.FILTER_USER?.name) {
    //   return (
    //     <FilterView values={formDataFilter} handleSubmit={handleFilter} />
    //   );
    // }
    else if (optionType === USER_MANAGEMENT_MODALS.EXPORT_EXCEL_USER?.name) {
      return (
        <ExportExcelUserManagement exportExcel={exportExcel} />
      );
    }
  };

  /* END MODALS */

  //  @ts-ignore
  const handleOpenEditProfile = (row) => {
    setOpenModal(true);
    setIsMenuOnClose(false);
    setOptionType(USER_MANAGEMENT_MODALS.EDIT_PROFILE.name);
    const {
      uuid,
      firstName,
      lastName,
      email,
      mobile,
      role,
      child,
      commission,
    } = row;
    //  @ts-ignore
    setFormData({
      id: uuid,
      firstName,
      lastName,
      email,
      mobile,
      role,
      userGroups: child,
      commission,
    });
  };

  //  @ts-ignore
  const handleOpenProfile = (row) => {
    setOpenModal(true);
    setIsMenuOnClose(false);
    setOptionType(USER_MANAGEMENT_MODALS.PROFILE.name);
    //  @ts-ignore
    setFormData({
      ...row,
    });
  };

  //  @ts-ignore
  const handleOpenAddCredit = (row) => {
    setFormDataCredit({
      id: row.uuid,
      credit: 0,
    });
    setOpenModal(true);
    setIsMenuOnClose(false);
    setOptionType(USER_MANAGEMENT_MODALS.ADD_CREDIT.name);
    //  @ts-ignore
    setFormData({
      ...row,
    });
  };

  const handleOpenProfilePicture = (row: any) => {
    setOpenModal(true);
    setIsMenuOnClose(false);
    setIsUploadSuccess(false);
    setOptionType(USER_MANAGEMENT_MODALS.PROFILE_PICTURE.name);
    const { uuid, profilePicture } = row;
    //  @ts-ignore
    setFormData({
      id: uuid,
      profilePicture,
    });
  };

  
  const handleExportExcel = async () => {
    setOpenModal(true);
    setOptionType(USER_MANAGEMENT_MODALS.EXPORT_EXCEL_USER.name);
    setExcelType(USER_MANAGEMENT_TABLE)
    setDataExcel(usersData)
    // exportExcel()
  }

  const { openDialogueDelete, handleCloseDialogueDelete } = useConfirmationDelete();
  const { openDialogueRestore, handleCloseDialogueRestore } = useConfirmationRestore();

  const handleDeleteUser = (row: any) => {
    const { uuid } = row;
    setToDelete(uuid);
    handleCloseDialogueDelete(true);
  };

  const handleRestoreUser = (row: any) => {
    const { uuid } = row;
    setToRestore(uuid);
    handleCloseDialogueRestore(true);
  };

  

  const USER_MANAGEMENT_TABLE_OPTION = [
    {
      name: "PROFILE",
      label: "Profile",
      icon: <PersonIcon />,
      onClick: handleOpenProfile,
      visible: canViewProfile(userInfo?.role),
    },
    {
      name: "ADD_CREDIT",
      label: "Add Credit",
      icon: (
        <Box
          component="img"
          alt="Add Credit Icon"
          sx={{ width: "20px", mr: 1 }}
          src={walletIcon}
        />
      ),
      onClick: handleOpenAddCredit,
      visible: canViewAddCredit(userInfo?.role),
    },
    {
      name: "EDIT_PROFILE",
      label: "Edit Profile",
      icon: <EditIcon />,
      onClick: handleOpenEditProfile,
      visible: canEditProfile(userInfo?.role),
    },
    {
      name: "PROFILE_PICTURE",
      label: "Profile Picture",
      icon: <ImageIcon />,
      onClick: handleOpenProfilePicture,
      visible: canUploadPhoto(userInfo?.role),
    },
    {
      name: "DELETE_USER",
      label: "Deactive User",
      icon: <DeleteIcon style={{ color: "red" }} />,
      onClick: handleDeleteUser,
      visible: canDeleteUser(userInfo?.role),
    },
    {
      name: "RESTORE_USER",
      label: "Restore User",
      icon: <RestoreIcon />,
      onClick: handleRestoreUser,
      visible: canRestoreUser(userInfo?.role),
    },
  ];

  return (
    //  @ts-ignore
    <PageComponent
      showAlert={alertRest.showAlert}
      handleCloseAlert={alertRest.handleCloseAlert}
      alertSeverity={alertRest.alertSeverity}
      alertMessage={alertRest.alertMessage}
    >
      <Grid container flexDirection="row">
        <Grid item xs={12}>
          <PaperHeaderStyled elevation={0}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  User Management
                </Typography>
              </Grid>
              <Grid item>
                <Grid container gap={2}>
                <Grid item>
                    {canExportExcel(userInfo?.role) && (
                      <ExportUserButtonStyled onClick={() => handleExportExcel()}>
                        <SimCardDownloadIcon sx={{ mr: 1 }} /> Export Data
                      </ExportUserButtonStyled>
                    )}
                  </Grid>
                  <Grid item>
                    {canFilter(userInfo?.role) && (
                      <FilterUserButtonStyled onClick={handleFilterUser}>
                        <FilterAltIcon sx={{ mr: 1 }} /> Filter
                      </FilterUserButtonStyled>
                    )}
                  </Grid>
                  <Grid item>
                      <AddUserButtonStyled onClick={handleAddUser}>
                        <PersonAddIcon sx={{ mr: 1 }} /> Add User
                      </AddUserButtonStyled>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </PaperHeaderStyled>
        </Grid>
        {/* Body */}
        <Grid item xs={12}>
          <FilterColumnStyled>
            {/* Body Menu */}
            <Grid item xs={12}>
              <Grid
                container
                flexDirection="row"
                justifyContent="space-between"
              >
                <Grid item xs={6} />
                <Grid item xs={6} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                flexDirection="row"
                justifyContent="space-between"
              >
                <Grid item xs >
                  <DataTable
                    rows={usersData?.content ?? []}
                    tableName={USER_MANAGEMENT_TABLE}
                    isLoading={userManagementState.loading}
                    page={page}
                    size={size}
                    setPage={setPage}
                    setSize={setSize}
                    totalCount={usersData?.totalCount}
                    optionItems={USER_MANAGEMENT_TABLE_OPTION}
                    isMenuOnClose={isMenuOnClose}
                    filterOnSubmit={handleOnSubmit}
                />
               </Grid>
               {isFilter && (
                <Grid item xs={3} px={2}>
                  <FilterView values={formDataFilter} handleSubmit={handleFilter} onCloseFilter={handleCloseFilter} />
                </Grid>
               )}
              </Grid>
            </Grid>
          </FilterColumnStyled>
        </Grid>
        {/* @ts-ignore */}
        <BasicModal
          open={openModal}
          noCloseTop={optionType !== USER_MANAGEMENT_MODALS.EDIT_PROFILE?.name}
          onCloseModal={handleCloseModal}
          title={renderModalTitle()}
          //  @ts-ignore
          content={renderModalContent()}
        />
        <ConfirmationDialog
          title={`Confirm Delete User`}
          onClose={handleCloseDialogueDelete}
          //  @ts-ignore
          open={openDialogueDelete}
          callback={() => deleteUser(toDelete)}
          contentText="Are you sure you want to delete this user?"
        />
         <ConfirmationDialog
          title={`Confirm Restore User`}
          onClose={handleCloseDialogueRestore}
          //  @ts-ignore
          open={openDialogueRestore}
          callback={() => restoreUser(toRestore)}
          contentText="Are you sure you want to restore this user?"
        />
      </Grid>
    </PageComponent>
  );
};

export default UserManagement;
