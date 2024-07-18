import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetClose } from "../ui/sheet";

export function SidebarButton({ Icon, className, children, ...props }) {
  return (
    <Button
      variant="ghost"
      className={cn("gap-2 flex justify-start items-center", className)}
      {...props}
    >
      {Icon && <Icon size={20} />}
      <span>{children}</span>
    </Button>
  );
}

export function SidebarButtonSheet({ Icon, className, children, ...props }) {
  return (
    <SheetClose asChild>
      <SidebarButton
        Icon={Icon}
        className={className}
        children={children}
        {...props}
      />
    </SheetClose>
  );
}
