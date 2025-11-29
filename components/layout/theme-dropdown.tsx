"use client";
import React, { useState } from "react";
import { MdOutlineDesktopMac } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/shadcn/drawer";
import { Button } from "@/components/shadcn/button";
import { useAppTheme } from "@/lib/hooks";
import { useTranslation } from "@/i18n/client";
import { themes, icons } from "@/theme";
import type { Theme, ThemeMode } from "@/theme";
import type { LngProps } from "@/types/i18next-lng";

export default function ThemeDropdown(props: LngProps) {
  const { t } = useTranslation(props.lng, "header");
  const { theme, setTheme } = useAppTheme();
  const [openPopover, setOpenPopover] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const ThemeIcon = icons[theme as ThemeMode] ?? MdOutlineDesktopMac;

  return (
    <div className="relative inline-block text-left">
      <DropdownMenu open={openPopover} onOpenChange={setOpenPopover}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            className="hidden h-8 w-8 items-center justify-center overflow-hidden rounded-full p-0 transition-all duration-75 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 active:scale-95 sm:h-9 sm:w-9 md:flex"
          >
            <ThemeIcon className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="w-full min-w-[14rem] rounded-md bg-white p-2 dark:bg-black">
            {themes.map((t1: Theme) => {
              return (
                <DropdownMenuItem
                  className="p-0"
                  key={t1.mode}
                  disabled={theme === t1.mode}
                >
                  <Button
                    key={t1.mode}
                    onClick={() => setTheme(t1.mode)}
                    className="bg-background hover:bg-accent hover:text-accent-foreground relative flex w-full items-center justify-start space-x-2 rounded-md px-2 py-6 text-left text-sm text-inherit transition-all duration-75 focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <t1.icon className="mr-0 h-4 w-4" />
                    <p className="text-sm">{t(`menus.${t1.mode}`)}</p>
                  </Button>
                </DropdownMenuItem>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerTrigger asChild>
          <Button
            variant="link"
            className="h-8 w-8 items-center justify-center overflow-hidden rounded-full p-0 transition-all duration-75 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 active:scale-95 sm:h-9 sm:w-9 md:hidden"
          >
            <ThemeIcon className="h-5 w-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full min-w-sm rounded-md p-2">
            {themes.map((t1: Theme) => {
              return (
                <Button
                  key={t1.mode}
                  disabled={theme === t1.mode}
                  onClick={() => setTheme(t1.mode)}
                  className="bg-background hover:bg-accent hover:text-accent-foreground relative flex w-full items-center justify-start space-x-2 rounded-md px-2 py-3 text-left text-sm text-inherit transition-all duration-75 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <t1.icon className="mr-0 h-4 w-4" />
                  <p className="text-sm">{t(`menus.${t1.mode}`)}</p>
                </Button>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
