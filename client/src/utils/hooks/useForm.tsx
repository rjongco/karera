import { useState } from "react";
import { BUTTON_TYPES } from "../../constants/form";

export const useForm = (
  addTitle = BUTTON_TYPES.ADD_BUTTON,
  updateTitle = BUTTON_TYPES.UPDATE_BUTTON,
  withID = false,
  deleteTitle = BUTTON_TYPES.DELETE_BUTTON
) => {
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(null);
  };

  const handleDelete = () => {
    setModalTitle(deleteTitle);
    // @ts-ignore
    setFormData({});
    setShowModal(true);
  };

  const handleAdd = () => {
    setModalTitle(addTitle);
    // @ts-ignore
    setFormData({});
    setShowModal(true);
  };

  const handleUpdate = (data: any) => {
    const final_update_title = withID
      ? `${updateTitle}: ${data.id}`
      : updateTitle;
    setFormData(data);
    setModalTitle(
      updateTitle === "Edit Line"
        ? `Edit Line Inspector`
        : updateTitle === "Edit User - ID"
        ? `${updateTitle} : ${data.userId}`
        : updateTitle === "Edit Item"
        ? `Edit Item : ${data.itemCode}` ?? ""
        : updateTitle === "Edit Consumption"
        ? `Edit Consumption : ${data.lineCode}`
        : updateTitle === "Edit Production"
        ? `${updateTitle}`
        : updateTitle === "Edit Uom"
        ? `${updateTitle}` ?? ""
        : final_update_title
    );
    setShowModal(true);
  };

  return {
    modalTitle,
    formData,
    showModal,
    handleCloseModal,
    handleAdd,
    handleUpdate,
    handleDelete,
    setFormData,
  };
};
