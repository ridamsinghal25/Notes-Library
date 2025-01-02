import { useState } from "react";
import { toast } from "react-toastify";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import UpdateSemesterModal from "../presentation/UpdateSemesterModal";
import { toggleModal } from "@/store/ModalSlice";

function UpdateSemesterModalContainer() {
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showUpdateSemesterModal = useSelector(
    (state) => state.modal?.modals.updateSemesterModal
  );

  const toggleUpdateSemesterModal = () => {
    dispatch(toggleModal({ modalType: "updateSemesterModal" }));
  };

  const onSubmit = async (data) => {
    setIsUpdating(true);

    const response = await AuthService.updateCourseByUser(data);

    setIsUpdating(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);
      dispatch(toggleModal({ modalType: "updateSemesterModal" }));

      const LogoutResponse = await AuthService.logoutService();

      if (!(LogoutResponse instanceof ApiError)) {
        dispatch(logout());
        navigate(`${ROUTES.SIGNIN}`);
      } else {
        toast.error(
          LogoutResponse?.errorResponse?.message || LogoutResponse?.errorMessage
        );
      }
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <UpdateSemesterModal
      showDialog={showUpdateSemesterModal}
      setShowDialog={toggleUpdateSemesterModal}
      isUpdating={isUpdating}
      onSubmit={onSubmit}
    />
  );
}

export default UpdateSemesterModalContainer;
