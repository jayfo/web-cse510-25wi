import { SiteLinks } from "@/data/SiteLinks";

import { SITE_LINKS as PARENT_SITE_LINKS } from "../sitelinks";

export const SITE_LINKS = (() => {
  const insertAfterIndex = PARENT_SITE_LINKS.findIndex((element) => {
    return element === SiteLinks.assignmentsTop;
  });

  return [
    ...PARENT_SITE_LINKS.slice(0, insertAfterIndex + 1),
    [
      SiteLinks.assignmentsReadingsTop,
      SiteLinks.assignmentsProjectTop,
      SiteLinks.assignmentsStatisticsLabTop,
      SiteLinks.assignmentsExamTop,
    ],
    ...PARENT_SITE_LINKS.slice(insertAfterIndex + 1),
  ];
})();
