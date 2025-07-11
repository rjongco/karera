import useAxios from "../utils/axios";
import { catchError } from "../utils/logic";

export const uploadingUserProfilePicAPI = async (
  id: any,
  formData: any,
  type: any
) => {
  return await useAxios
    .post(`/admin/users/${id}/upload-image/${type}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // onUploadProgress: (progressEvent: any) => {
      //   const progress = Math.round(
      //     (progressEvent.loaded / progressEvent.total) * 100
      //   );
      //   setUploadProgress(progress);
      // },
    })
    .then((res) => res.data)
    .catch(catchError);
};

export const getUserProfileAPI = async () => {
  return await useAxios
    .get(`/admin/user/profile`)
    .then((res) => res.data)
    .catch(catchError);
};

export const updateUserProfileAPI = async (data: any) => {
  return await useAxios
    .put(`/admin/user/profile`, data)
    .then((res) => res.data)
    .catch(catchError);
};

export const removeUserProfileImageAPI = async () => {
  return await useAxios
    .delete(`/admin/user/remove/profile-picture`)
    .then((res) => res.data)
    .catch(catchError);
};

export const generateReferralAPI = async () => {
  return await useAxios
    .post(`/admin/user/generate/referral`)
    .then((res) => res.data)
    .catch(catchError);
};

export const finishKYCAPI = async () => {
  return await useAxios
    .post(`/admin/user/kyc/finish`)
    .then((res) => res.data)
    .catch(catchError);
};

