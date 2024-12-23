import * as React from "react";

import { Sidebar } from "@/components/Sidebar";

import { SITE_LINKS } from "../sitelinks";

export default function Page(): React.ReactElement {
  return (
    <Sidebar
      siteLinks={SITE_LINKS}
      pageLinks={[
        {
          anchor: "Project",
          href: "#project",
        },
        [
          {
            anchor: "Proposal",
            href: "#proposal",
          },
          {
            anchor: "Milestone Reports",
            href: "#milestone-reports",
          },
          {
            anchor: "Final Report",
            href: "#final-report",
          },
        ],
      ]}
    />
  );
}
