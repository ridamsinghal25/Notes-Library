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

export function AccountPage() {
  return (
    <Tabs
      defaultValue="account"
      className="mx-20 flex items-center flex-col mt-10" //
    >
      <TabsList className="grid w-full justify-center grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="md:text-xl">Account</CardTitle>
            <CardDescription className="md:text-sm">
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1 ">
              <Label htmlFor="name" className="md:text-lg">
                Name
              </Label>
              <Input id="name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="md:text-lg">
                Email
              </Label>
              <Input id="email" disabled />
            </div>
            <div className="space-y-1">
              <Label htmlFor="rollNumber" className="md:text-lg">
                Roll No.
              </Label>
              <Input id="rollNumber" disabled />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password" className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="md:text-xl">Password</CardTitle>
            <CardDescription className="md:text-sm">
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current" className="md:text-lg">
                Current password
              </Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new" className="md:text-lg">
                New password
              </Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
