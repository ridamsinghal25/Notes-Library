import AccountTabContainer from "@/components/pageComponent/AccountTab/container/AccountTabContainer";
import PasswordTabContainer from "@/components/pageComponent/PasswordTab/container/PasswordTabContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ACCOUNT_TEXT_CONTENT,
  ACCOUNT_TITLE,
  TABS,
} from "@/constants/constants";

function AccountPage() {
  return (
    <div className="w-full">
      <h1 className="flex items-start sm:mx-20 my-10 text-3xl font-bold text-gray-800 underline dark:text-gray-200">
        {ACCOUNT_TITLE}
      </h1>
      <Tabs
        defaultValue={TABS.DEFAULT_VALUE}
        className="sm:mx-20 flex items-center flex-col mt-10"
      >
        <TabsList className="grid w-full justify-center grid-cols-2">
          <TabsTrigger value={TABS.ACCOUNT}>
            {ACCOUNT_TEXT_CONTENT.ACCOUNT_TAB}
          </TabsTrigger>
          <TabsTrigger value={TABS.PASSWORD}>
            {ACCOUNT_TEXT_CONTENT.PASSWORD_TAB}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={TABS.ACCOUNT} className="w-full my-5 mb-20">
          <AccountTabContainer />
        </TabsContent>
        <TabsContent value={TABS.PASSWORD} className="w-full">
          <PasswordTabContainer />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AccountPage;
