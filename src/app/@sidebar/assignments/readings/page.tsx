import * as React from "react";

import { Sidebar } from "@/components/Sidebar";

import { SITE_LINKS } from "../sitelinks";

export default function Page(): React.ReactElement {
  return (
    <Sidebar
      siteLinks={SITE_LINKS}
      pageLinks={[
        {
          anchor: "Readings",
          href: "#readings",
        },
        [
          {
            anchor: "Reading Reports",
            href: "#reading-reports",
          },
          {
            anchor: "In-Class Discussion",
            href: "#in-class-discussion",
          },
        ],
      ]}
    />
  );
}
