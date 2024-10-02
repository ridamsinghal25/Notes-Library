import React, { useState } from "react";
import { useSelector } from "react-redux";
import AccountTab from "../presentation/AccountTab";

function AccountTabContainer() {
  const [showDialog, setShowDialog] = useState(false);
  const userInfo = useSelector((state) => state.auth.userDetails);

  function handleClick() {
    setShowDialog(true);
  }
  return (
    <AccountTab
      userInfo={userInfo}
      handleClick={handleClick}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
    />
  );
}

export default AccountTabContainer;
