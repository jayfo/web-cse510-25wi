import * as React from "react";

import { FormattedReading } from "@/components/FormattedReading";
import { CourseStoreLink } from "@/components/links/CourseStoreLink";
import { CalendarItem } from "@/types/CalendarData";

export const CalendarItemAdditionalResourceReadings: React.FunctionComponent<{
  calendarItem: CalendarItem;
}> = ({ calendarItem }) => {
  if ("additionalResourceReadings" in calendarItem) {
    return (
      <React.Fragment>
        <h3>Additional Optional Resources</h3>
        <ul>
          {calendarItem.additionalResourceReadings.map((readingCurrent) => (
            <li key={readingCurrent.title}>
              <p>
                <FormattedReading reading={readingCurrent} />
              </p>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  } else {
    return undefined;
  }
};
