// Based on example:
// https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts
// Accessed 2023-08-08.

import * as React from "react";

import RootLayout from "@/components/RootLayout";
import { appStoreInitialData } from "@/stores/AppStoreInitialData";

import { LayoutSidebar } from "./layoutSidebar";

// TODO: Pull course title from a configuration
export const metadata = {
  title: "CSE 510 - Advanced Topics in HCI - Winter 2025",
  description: "CSE 510 - Advanced Topics in HCI - Winter 2025",
};

interface LayoutProps extends React.PropsWithChildren<{}> {}

export default function Layout({ children }: LayoutProps) {
  const initialData = appStoreInitialData();

  const layoutSidebar = <LayoutSidebar />;

  return (
    <RootLayout sidebar={layoutSidebar} initialData={initialData}>
      {children}
    </RootLayout>
  );
}
