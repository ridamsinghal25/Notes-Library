import { LogOut, Menu, MoreHorizontal, Settings, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { SidebarButtonSheet as SidebarButton } from "./SidebarButton";
import { Separator } from "../ui/separator";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  LOGOUT_BUTTON_LABEL,
  PROJECT_NAME,
} from "../../constants/sidebar.constants";

export default function MobileSidebar({ sidebarMobileItems }) {
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="fixed top-3 left-3">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-3 py-4" hideClose>
        <SheetHeader className="flex flex-row justify-between items-center space-y-0">
          <SheetTitle>
            <span className="text-lg font-semibold text-foreground mx-3">
              {PROJECT_NAME}
            </span>
          </SheetTitle>
          <SheetClose asChild>
            <Button className="h-7 w-7 p-0" variant="ghost">
              <X size={15} />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="h-full">
          <div className="mt-5 flex flex-col w-full gap-1">
            {sidebarMobileItems.map((item) => (
              <Link key={item.label} to={item.href}>
                <SidebarButton
                  variant={location.pathname === item.href ? "custom" : "ghost"}
                  Icon={item.icon}
                  className="w-full"
                >
                  {item.label}
                </SidebarButton>
              </Link>
            ))}
          </div>
          <div className="absolute w-full bottom-4 px-1 left-0">
            <Separator className="absolute -top-3 left-0 w-full" />
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="https://github.com/max-programming.png" />
                        <AvatarFallback>Max Programming</AvatarFallback>
                      </Avatar>
                      <span>Max Programming</span>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </DrawerTrigger>
              <DrawerTitle></DrawerTitle>
              <DrawerContent className="mb-2 p-2">
                <div className="flex flex-col space-y-2 mt-2">
                  <SidebarButton
                    variant="outline"
                    size="sm"
                    Icon={LogOut}
                    className="w-full text-sm p-3"
                  >
                    {LOGOUT_BUTTON_LABEL}
                  </SidebarButton>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}