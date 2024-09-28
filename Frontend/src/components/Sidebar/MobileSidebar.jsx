import { LogOut, Menu, MoreHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SidebarButtonSheet as SidebarButton } from "./SidebarButton";
import { Separator } from "../ui/separator";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  AVATAR_URL,
  LOGOUT_BUTTON_LABEL,
  PROJECT_NAME,
} from "../../constants/constants";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { ROUTES } from "@/constants/route";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/AuthSlice";
import Container from "../Container";

export default function MobileSidebar({ sidebarMobileItems }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth?.userDetails);

  const logoutHandler = async () => {
    const response = await AuthService.logoutService();

    if (!(response instanceof ApiError)) {
      dispatch(logout());
      navigate(`${ROUTES.SIGNIN}`, { replace: true });
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="fixed top-3 left-3">
          <Menu size={30} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 dark:border-gray-400 border-gray-500"
        hideClose
      >
        <Container>
          <SheetHeader className="flex flex-row justify-between items-center space-y-0 mt-5">
            <SheetTitle>
              <span className="text-lg font-semibold text-foreground mx-3">
                {PROJECT_NAME}
              </span>
            </SheetTitle>
            <SheetClose asChild>
              <Button className="h-7 w-7 p-0 mr-4" variant="ghost">
                <X size={20} />
              </Button>
            </SheetClose>
          </SheetHeader>
          <SheetDescription></SheetDescription>
          <div className="h-full">
            <div className="mt-5 flex flex-col w-full gap-1">
              {sidebarMobileItems.map((item) => (
                <Link key={item.label} to={item.href}>
                  <SidebarButton
                    variant={
                      location.pathname === item.href ? "custom" : "ghost"
                    }
                    Icon={item.icon}
                    className="w-full"
                  >
                    {item.label}
                  </SidebarButton>
                </Link>
              ))}
            </div>
            <div className="absolute w-full bottom-4 px-1 left-0">
              <Separator className="absolute -top-3 left-0 w-full bg-gray-600 dark:bg-gray-400" />
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start dark:hover:bg-violet-900 hover:bg-violet-400"
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        <Avatar className="h-6 w-6 border-2 border-violet-600">
                          <AvatarImage
                            src={userDetails?.avatar?.url || AVATAR_URL}
                          />
                          <AvatarFallback>
                            {userDetails?.fullName}
                          </AvatarFallback>
                        </Avatar>
                        <span>{userDetails?.fullName}</span>
                      </div>
                      <MoreHorizontal size={20} />
                    </div>
                  </Button>
                </DrawerTrigger>
                <DrawerTitle></DrawerTitle>
                <DrawerContent className="mb-2 p-3 rounded-[1rem] bg-violet-200 dark:bg-violet-600">
                  <div className="flex flex-col space-y-2 mt-2">
                    <SidebarButton
                      variant="outline"
                      size="sm"
                      Icon={LogOut}
                      className="w-full text-sm p-3  hover:bg-violet-400 bg-violet-600"
                      onClick={logoutHandler}
                    >
                      {LOGOUT_BUTTON_LABEL}
                    </SidebarButton>
                  </div>
                </DrawerContent>
                <DrawerDescription></DrawerDescription>
              </Drawer>
            </div>
          </div>
        </Container>
      </SheetContent>
    </Sheet>
  );
}
