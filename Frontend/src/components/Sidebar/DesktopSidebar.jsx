import React from "react";
import { SidebarButton } from "./SidebarButton";
import { LogOut, MoreHorizontal } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  AVATAR_URL,
  LOGOUT_BUTTON_LABEL,
  PROJECT_NAME,
} from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "@/services/AuthService";
import { ROUTES } from "@/constants/route";
import { logout } from "@/store/AuthSlice";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import Container from "../Container";

function DesktopSidebar({ sidebarDesktopItems }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userFullName = useSelector(
    (state) => state.auth?.userDetails?.fullName
  );

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
    <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
      <div className="h-full px-3 py-4 border-r-2 dark:border-gray-400 border-gray-500">
        <h3 className="mx-3 text-2xl font-semibold text-foreground text-black">
          {PROJECT_NAME}
        </h3>
        <div className="mt-5">
          <div className="flex flex-col gap-4 w-full text-xl">
            {sidebarDesktopItems.map((item) => (
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
          <div className="absolute left-0 bottom-4 w-full px-3">
            <Separator className="absolute -top-3 left-0 w-full bg-gray-600 dark:bg-gray-400" />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start dark:hover:bg-violet-900 hover:bg-violet-400"
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage className="rounded" src={AVATAR_URL} />
                        <AvatarFallback>{userFullName}</AvatarFallback>
                      </Avatar>
                      <span>{userFullName}</span>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="mb-2 w-56 p-3 rounded-[1rem] bg-violet-200 dark:bg-violet-600 dark:hover:bg-violet-400">
                <div className="space-y-1">
                  <SidebarButton
                    size="sm"
                    Icon={LogOut}
                    className="w-full text-sm hover:bg-violet-400"
                    onClick={logoutHandler}
                  >
                    {LOGOUT_BUTTON_LABEL}
                  </SidebarButton>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default DesktopSidebar;
