import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountTab from "../presentation/AccountTab";

function AccountTabContainer() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userDetails);

  const toggleUpdateSemesterModal = () => {
    dispatch(toggleModal({ modalType: "updateSemesterModal" }));
  };

  return (
    <AccountTab
      userInfo={userInfo}
      toggleUpdateSemesterModal={toggleUpdateSemesterModal}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
    />
  );
}

export default AccountTabContainer;
