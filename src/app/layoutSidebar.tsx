"use client";

import * as React from "react";

import {
  PAGE_LINKS_PROJECT,
  // PAGE_LINKS_MILESTONE_2,
  // PAGE_LINKS_MILESTONE_3,
  // PAGE_LINKS_MILESTONE_4,
  // PAGE_LINKS_MILESTONE_5,
  SITE_LINKS,
} from "@/app/sitelinks";
import { Sidebar } from "@/components/Sidebar";
import { useSelectedLayoutSegments } from "next/navigation";

interface LayoutSidebarProps {}

export function LayoutSidebar({}: LayoutSidebarProps) {
  const routeSegments = useSelectedLayoutSegments();

  const pageLinks = (() => {
    if (routeSegments.length >= 1) {
      if (routeSegments[0] === "assignments") {
        if (routeSegments.length >= 2) {
          if (routeSegments[1] === "project") {
            return PAGE_LINKS_PROJECT;
          // } else if (routeSegments[1] === "milestone-2") {
          //   return PAGE_LINKS_MILESTONE_2;
          // } else if (routeSegments[1] === "milestone-3") {
          //   return PAGE_LINKS_MILESTONE_3;
          // } else if (routeSegments[1] === "milestone-4") {
          //   return PAGE_LINKS_MILESTONE_4;
          // } else if (routeSegments[1] === "milestone-5") {
          //   return PAGE_LINKS_MILESTONE_5;
          }
        }
      }
    }

    return [];
  })();

  const sidebar = (
    <Sidebar siteLinks={SITE_LINKS} pageLinks={pageLinks}></Sidebar>
  );

  return sidebar;
}
