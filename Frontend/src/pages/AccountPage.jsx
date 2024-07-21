import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { BUTTONS, LABELS, TABS, TEXT_CONTENT } from "../constants/account";

export function AccountPage() {
  return (
    <Tabs
      defaultValue={TABS.DEFAULT_VALUE}
      className="mx-20 flex items-center flex-col mt-10" //
    >
      <TabsList className="grid w-full justify-center grid-cols-2">
        <TabsTrigger value={TABS.ACCOUNT}>
          {TEXT_CONTENT.ACCOUNT_TAB}
        </TabsTrigger>
        <TabsTrigger value={TABS.PASSWORD}>
          {TEXT_CONTENT.PASSWORD_TAB}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={TABS.ACCOUNT} className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="md:text-xl">
              {TEXT_CONTENT.ACCOUNT_TITLE}
            </CardTitle>
            <CardDescription className="md:text-sm">
              {TEXT_CONTENT.ACCOUNT_DESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1 ">
              <Label htmlFor="name" className="md:text-lg">
                {LABELS.NAME}
              </Label>
              <Input id="name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="md:text-lg">
                {LABELS.EMAIL}
              </Label>
              <Input id="email" disabled />
            </div>
            <div className="space-y-1">
              <Label htmlFor="rollNumber" className="md:text-lg">
                {LABELS.ROLL_NUMBER}
              </Label>
              <Input id="rollNumber" disabled />
            </div>
          </CardContent>
          <CardFooter>
            <Button>{BUTTONS.SAVE_CHANGES}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value={TABS.PASSWORD} className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="md:text-xl">
              {TEXT_CONTENT.PASSWORD_TAB}
            </CardTitle>
            <CardDescription className="md:text-sm">
              {TEXT_CONTENT.PASSWORD_DESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current" className="md:text-lg">
                {LABELS.CURRENT_PASSWORD}
              </Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new" className="md:text-lg">
                {LABELS.NEW_PASSWORD}
              </Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>{BUTTONS.SAVE_PASSWORD}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
