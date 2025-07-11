import {
  API_FAILURE,
  API_PENDING,
  API_SUCCESS,
  RESET_INITIAL_STATE,
  VALIDATION_ERROR,
  CUSTOM_ERROR,
} from "../constants/api";

import {
  updateUserProfileAPI,
  removeUserProfileImageAPI,
  uploadingUserProfilePicAPI,
  generateReferralAPI,
  finishKYCAPI,
} from "../api/userProfileAPI";
import useAxios from "../utils/axios";

export const userProfileInitialState = {
  loading: false,
  error: false,
  errorType: "",
  errorMessage: "",
  success: false,
  successMessage: "",
  data: [],
  isUploadedProfilePic: false,
  isDeletingProfilePic: false,
  deletingProfilePic: false,
  uploadingProfilePic: false,
  uploadProPicProgress: 0,
  generateCode: false,
};

export const userProfileActions = {
  updateUserProfile: (data: any) => async (dispatch: any) => {
    dispatch({
      type: API_PENDING,
      payload: {
        success: false,
        isUploadedProfilePic: false,
        isDeletingProfilePic: false,
        deletingProfilePic: false,
        uploadingProfilePic: true,
        loading: false,
        uploadProPicProgress: 0,
        generateCode: false,
      },
    });

    try {
      await updateUserProfileAPI(data).then((response: any) => {
        if (!response) {
        } else {
          const { data, message } = response;
          dispatch({
            type: API_SUCCESS,
            payload: {
              data,
              message,
              success: true,
              isUploadedProfilePic: false,
              isDeletingProfilePic: false,
              deletingProfilePic: false,
              uploadingProfilePic: false,
              loading: false,
              uploadProPicProgress: 0,
              generateCode: false,
            },
          });
        }
      });
    } catch (error) {
      // @ts-ignore
      const message = error.message;
      // @ts-ignore
      if (error.type === VALIDATION_ERROR) {
        dispatch({
          type: API_FAILURE,
          message: message,
          payload: {
            type: API_FAILURE,
            message,
            success: false,
            isUploadedProfilePic: false,
            isDeletingProfilePic: false,
            deletingProfilePic: false,
            uploadingProfilePic: false,
            loading: false,
            uploadProPicProgress: 0,
            generateCode: false,
          },
        });
        // @ts-ignore
      } else if (error.type === CUSTOM_ERROR) {
        dispatch({
          type: API_FAILURE,
          payload: {
            error,
            success: false,
            isUploadedProfilePic: false,
            isDeletingProfilePic: false,
            deletingProfilePic: false,
            uploadingProfilePic: false,
            loading: false,
            uploadProPicProgress: 0,
            generateCode: false,
          },
        });
        console.error(error);
      }
    }
  },

  removeProfilePicture: () => async (dispatch: any) => {
    dispatch({
      type: API_PENDING,
      payload: {
        success: false,
        isUploadedProfilePic: false,
        isDeletingProfilePic: false,
        deletingProfilePic: true,
        uploadingProfilePic: false,
        loading: false,
        uploadProPicProgress: 0,
        generateCode: false,
      },
    });

    try {
      await removeUserProfileImageAPI().then((response: any) => {
        if (!response) {
        } else {
          const { data, message } = response;
          dispatch({
            type: API_SUCCESS,
            payload: {
              data: { ...data },
              message,
              success: false,
              isUploadedProfilePic: false,
              isDeletingProfilePic: true,
              deletingProfilePic: false,
              uploadingProfilePic: false,
              loading: false,
              uploadProPicProgress: 0,
              generateCode: false,
            },
          });
        }
      });
    } catch (error) {
      dispatch({
        type: API_FAILURE,
        payload: error,
        success: false,
        isUploadedProfilePic: false,
        isDeletingProfilePic: false,
        deletingProfilePic: false,
        uploadingProfilePic: false,
        loading: false,
        uploadProPicProgress: 0,
        generateCode: false,
      });
      console.error(error);
    }
  },
  generateCode: () => async (dispatch: any) => {
    dispatch({
      type: API_PENDING,
      payload: {
        success: false,
        isUploadedProfilePic: false,
        isDeletingProfilePic: false,
        deletingProfilePic: false,
        uploadingProfilePic: true,
        loading: false,
        uploadProPicProgress: 0,
        generateCode: false,
      },
    });
    try {
      await generateReferralAPI().then((response: any) => {
        if (!response) {
        } else {
          const { data, message } = response;
          dispatch({
            type: API_SUCCESS,
            payload: {
              data: { ...data },
              message,
              success: false,
              isUploadedProfilePic: false,
              isDeletingProfilePic: true,
              deletingProfilePic: false,
              uploadingProfilePic: false,
              loading: false,
              uploadProPicProgress: 0,
              generateCode: true,
            },
          });
        }
      });
    } catch (error) {
      dispatch({
        type: API_FAILURE,
        payload: error,
        success: false,
        isUploadedProfilePic: false,
        isDeletingProfilePic: false,
        deletingProfilePic: false,
        uploadingProfilePic: false,
        loading: false,
        uploadProPicProgress: 0,
        generateCode: false,
      });
      console.error(error);
    }
  },
  uploadProfilePic:
    (id: any, formData: any, type: any) => async (dispatch: any) => {
      dispatch({
        type: API_PENDING,
        payload: {
          success: false,
          isUploadedProfilePic: false,
          isDeletingProfilePic: false,
          deletingProfilePic: false,
          uploadingProfilePic: true,
          loading: false,
          uploadProPicProgress: 0,
          generateCode: false,
        },
      });

      try {
        return await useAxios
          .post(`/admin/users/${id}/upload-image/${type}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent: any) => {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              dispatch({
                type: API_PENDING,
                payload: {
                  success: false,
                  isUploadedProfilePic: false,
                  isDeletingProfilePic: false,
                  deletingProfilePic: false,
                  uploadingProfilePic: false,
                  loading: false,
                  uploadProPicProgress: progress,
                  generateCode: false,
                },
              });
            },
          })
          .then((res) => {
            const response = res.data;
            if (!response) {
            } else {
              const { data, message } = response;

              dispatch({
                type: API_SUCCESS,
                payload: {
                  data: data,
                  success: false,
                  message,
                  isUploadedProfilePic: true,
                  isDeletingProfilePic: false,
                  deletingProfilePic: false,
                  uploadingProfilePic: false,
                  loading: false,
                  uploadProPicProgress: 0,
                  generateCode: false,
                },
              });
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-throw-literal
            throw {
              status: error.response.data.status,
              type: error.response.data.type,
              message: error.response.data.message,
            };
          });
      } catch (error) {
        dispatch({
          type: API_FAILURE,
          success: false,
          payload: error,
          isUploadedProfilePic: false,
          isDeletingProfilePic: false,
          deletingProfilePic: false,
          uploadingProfilePic: false,
          loading: false,
          uploadProPicProgress: 0,
          generateCode: false,
        });
        console.error(error);
      }
    },
  finishKYC: () => async (dispatch: any) => {
    dispatch({
      type: API_PENDING,
      payload: {
        success: false,
        isUploadedProfilePic: false,
        isDeletingProfilePic: false,
        deletingProfilePic: false,
        uploadingProfilePic: false,
        loading: false,
        uploadProPicProgress: 0,
        generateCode: false,
      },
    });
    try {
      await finishKYCAPI().then((response: any) => {
        if (!response) {
        } else {
          const { data, message } = response;
          dispatch({
            type: API_SUCCESS,
            payload: {
              data: { ...data },
              message,
              success: false,
              isUploadedProfilePic: false,
              isDeletingProfilePic: false,
              deletingProfilePic: false,
              uploadingProfilePic: false,
              loading: false,
              uploadProPicProgress: 0,
              generateCode: false,
            },
          });
        }
      });
    } catch (error) {
      dispatch({
        type: API_FAILURE,
        payload: error,
        success: false,
        isUploadedProfilePic: false,
        isDeletingProfilePic: false,
        deletingProfilePic: false,
        uploadingProfilePic: false,
        loading: false,
        uploadProPicProgress: 0,
        generateCode: false,
      });
      console.error(error);
    }
  },
};

// @ts-ignore
export const userProfileReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case API_PENDING:
      return {
        ...state,
        loading: payload.loading,
        error: false,
        errorType: "",
        errorMessage: "",
        successMessage: "",
        success: payload.success,
        deletingProfilePic: payload.deletingProfilePic,
        uploadingProfilePic: payload.deletingProfilePic,
        isUploadedProfilePic: payload.isUploadedProfilePic,
        isDeletingProfilePic: payload.isDeletingProfilePic,
        uploadProPicProgress: payload.uploadProPicProgress,
        generateCode: payload.generateCode,
      };
    case API_FAILURE:
      return {
        ...state,
        loading: payload.loading,
        success: payload.success,
        error: true,
        errorType: payload.type,
        errorMessage: payload.message,
        deletingProfilePic: payload.deletingProfilePic,
        uploadingProfilePic: payload.deletingProfilePic,
        isUploadedProfilePic: payload.isUploadedProfilePic,
        isDeletingProfilePic: payload.isDeletingProfilePic,
        uploadProPicProgress: payload.uploadProPicProgress,
        generateCode: payload.generateCode,
      };
    case API_SUCCESS: {
      return {
        ...state,
        loading: payload.loading,
        success: payload.success,
        successMessage: payload.message,
        data: payload.data,
        deletingProfilePic: payload.deletingProfilePic,
        uploadingProfilePic: payload.deletingProfilePic,
        isUploadedProfilePic: payload.isUploadedProfilePic,
        isDeletingProfilePic: payload.isDeletingProfilePic,
        uploadProPicProgress: payload.uploadProPicProgress,
        generateCode: payload.generateCode,
      };
    }
    case RESET_INITIAL_STATE:
      return {
        ...state,
        loading: false,
        error: false,
        success: false,
        successMessage: "",
        errorMessage: "",
        deletingProfilePic: false,
        uploadingProfilePic: false,
        isUploadedProfilePic: false,
        isDeletingProfilePic: false,
        uploadProPicProgress: 0,
        generateCode: false,
      };
    default:
      return state;
  }
};
