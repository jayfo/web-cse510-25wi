import * as React from "react";

import { FormattedReading } from "@/components/FormattedReading";
import { CourseDataLink } from "@/components/links/CourseDataLink";
import { SiteLink } from "@/components/links/SiteLink";
import { courseData } from "@/data/CourseData";
import { SiteLinks } from "@/data/SiteLinks";
import { CalendarItem } from "@/types/CalendarData";

export const CalendarItemReadingsStandard: React.FunctionComponent<{
  calendarItem: CalendarItem;
}> = ({ calendarItem }) => {
  if ("readingsStandard" in calendarItem) {
    return (
      <React.Fragment>
        <h3>Standard Reading Format</h3>
        <p>
          As described in{" "}
          <SiteLink
            linkKey={SiteLinks.assignmentsReadingsAndDiscussionPostsTop}
          />
          .
        </p>
        <p>Read the framing paper:</p>
        <ul>
          <li>
            <p>
              <FormattedReading
                reading={calendarItem.readingsStandard.framing}
              />
            </p>
          </li>
        </ul>
        <p>Select one additional instance reading:</p>
        <ul>
          {calendarItem.readingsStandard.instances.map((readingCurrent) => (
            <li key={readingCurrent.title}>
              <p>
                <FormattedReading reading={readingCurrent} />
              </p>
            </li>
          ))}
        </ul>
        <p>
          Post a reading report in the appropriate thread(s), by 11:59pm the
          night before class:
        </p>
        <CourseDataLink linkKey={courseData.linkCanvasDiscussion}>
          {courseData.linkCanvasDiscussion.href}
        </CourseDataLink>
      </React.Fragment>
    );
  } else {
    return undefined;
  }
};
