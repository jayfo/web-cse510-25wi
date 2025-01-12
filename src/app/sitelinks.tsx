import * as React from "react";

import { ok as assert } from "assert";

import { SiteLinks } from "@/data/SiteLinks";

export const SITE_LINKS = [
  SiteLinks.homeTop,
  SiteLinks.assignmentsTop,
  [
    // Custom formatting for SiteLinks.assignmentsReadingsTop
    {
      href: SiteLinks.assignmentsReadingsTop.href,
      anchor: (() => {
        assert(
          SiteLinks.assignmentsReadingsTop.anchor ===
            "Readings and Discussion Posts",
        );

        return (
          <React.Fragment>
            Readings and
            <br />
            Discussion Posts
          </React.Fragment>
        );
      })(),
    },
    // Custom formatting for SiteLinks.assignmentsPresentationsTop
    {
      href: SiteLinks.assignmentsPresentationsTop.href,
      anchor: (() => {
        assert(
          SiteLinks.assignmentsPresentationsTop.anchor ===
            "Presentations and Discussions",
        );

        return (
          <React.Fragment>
            Presentations
            <br />
            and Discussions
          </React.Fragment>
        );
      })(),
    },
    SiteLinks.assignmentsProjectTop,
    SiteLinks.assignmentsReflectionsTop,
  ],
  SiteLinks.calendarTop,
];

export const PAGE_LINKS_PROJECT = [
  SiteLinks.assignmentsProjectTop,
  [
    SiteLinks.assignmentsProjectProposalTop,
    SiteLinks.assignmentsProjectMilestoneReport1Top,
    SiteLinks.assignmentsProjectMilestoneReport2Top,
    SiteLinks.assignmentsProjectFinalReportTop,
  ],
];

export const PAGE_LINKS_REFLECTIONS = [
  SiteLinks.assignmentsReflectionsTop,
  [
    SiteLinks.assignmentsReflectionsContributionTop,
    SiteLinks.assignmentsReflectionsMethodTop,
    SiteLinks.assignmentsReflectionsFramingTop,
  ],
];
