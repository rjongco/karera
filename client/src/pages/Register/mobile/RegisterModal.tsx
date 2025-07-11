import { Modal } from "@mui/material";

export const RegisterModal = (props: any) => {
  const { content, openModal, onCloseModal } = props;
  return (
    <Modal
      open={openModal}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEscapeKeyDown // Disable closing the modal with the Escape key
    >
      {content}
    </Modal>
  );
};
