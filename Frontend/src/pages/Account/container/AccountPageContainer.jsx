import React, { useEffect } from "react";
import AccountPage from "../presentation/AccountPage";
import { toast } from "react-toastify";

function AccountPageContainer() {
  useEffect(() => {
    toast.info(
      "You will be logout when you update anything in your account settings"
    );
  }, []);

  return <AccountPage />;
}

export default AccountPageContainer;
