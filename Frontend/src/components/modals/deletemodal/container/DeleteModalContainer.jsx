import DeleteModal from "../presentation/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedNotes, toggleModal } from "@/store/ModalSlice";

function DeleteModalContainer({ onDeleteHandler, isDeleting }) {
  const showDeleteModal = useSelector(
    (state) => state.modal.modals.deleteModal
  );

  const dispatch = useDispatch();

  const toggelDeleteModal = () => {
    dispatch(toggleModal({ modalType: "deleteModal" }));
    dispatch(setSelectedNotes(null));
  };

  return (
    <DeleteModal
      showDialog={showDeleteModal}
      setShowDialog={toggelDeleteModal}
      isDeleting={isDeleting}
      onDeleteHandler={onDeleteHandler}
    />
  );
}

export default DeleteModalContainer;
