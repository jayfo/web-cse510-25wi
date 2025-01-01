import * as React from "react";

import { ok as assert } from "assert";

import { SiteLinks } from "@/data/SiteLinks";

export const SITE_LINKS = [
  SiteLinks.homeTop,
  SiteLinks.assignmentsTop,
  [
    {
      href: SiteLinks.assignmentsReadingsAndDiscussionPostsTop.href,
      anchor: (() => {
        assert(
          SiteLinks.assignmentsReadingsAndDiscussionPostsTop.anchor ===
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
    //   SiteLinks.milestone_2_top,
    //   SiteLinks.milestone_3_top,
    //   SiteLinks.milestone_4_top,
    //   SiteLinks.milestone_5_top,
  ],
  SiteLinks.calendarTop,
];

// export const PAGE_LINKS_MILESTONE_1 = [
//   SiteLinks.milestone_1_top,
//   [
//     SiteLinks.assignment_1_1_top,
//     SiteLinks.assignment_1_2_top,
//     SiteLinks.assignment_1_3_top,
//     SiteLinks.assignment_1_4_top,
//     SiteLinks.milestone_1_report_top,
//   ],
// ];
//
// export const PAGE_LINKS_MILESTONE_2 = [
//   SiteLinks.milestone_2_top,
//   [
//     SiteLinks.assignment_2_1_top,
//     SiteLinks.assignment_2_2_top,
//     SiteLinks.milestone_2_report_top,
//   ],
// ];
//
// export const PAGE_LINKS_MILESTONE_3 = [
//   SiteLinks.milestone_3_top,
//   [
//     SiteLinks.assignment_3_1_top,
//     SiteLinks.assignment_3_2_top,
//     SiteLinks.assignment_3_3_top,
//     SiteLinks.assignment_3_4_top,
//     SiteLinks.milestone_3_report_top,
//   ],
// ];
//
// export const PAGE_LINKS_MILESTONE_4 = [
//   SiteLinks.milestone_4_top,
//   [
//     SiteLinks.assignment_4_1_top,
//     SiteLinks.assignment_4_2_top,
//     SiteLinks.assignment_4_3_top,
//     SiteLinks.milestone_4_report_top,
//   ],
// ];
//
// export const PAGE_LINKS_MILESTONE_5 = [
//   SiteLinks.milestone_5_top,
//   [
//     SiteLinks.assignment_5_digital_mockup_top,
//     SiteLinks.assignment_5_poster_top,
//     SiteLinks.assignment_5_web_post_top,
//   ],
// ];
