import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import AccountTab from "../presentation/AccountTab";

function AccountTabContainer() {
  const [showDialog, setShowDialog] = useState(false);
  const userInfo = useSelector((state) => state.auth.userDetails);

  const accountForm = useForm({
    defaultValues: {
      fullName: userInfo?.fullName || "",
      email: userInfo?.email || "",
      rollNumber: userInfo?.rollNumber || "",
      courseName: userInfo?.course[0]?.courseName || "",
      semester: userInfo?.course[0]?.semester || "",
    },
  });

  function handleClick() {
    setShowDialog(true);
  }
  return (
    <AccountTab
      accountForm={accountForm}
      handleClick={handleClick}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
    />
  );
}

export default AccountTabContainer;
