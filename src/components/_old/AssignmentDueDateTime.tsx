import * as React from "react";

import { ok as assert } from "assert";

import { formatCalendarDate } from "@/data/CalendarData";
import { AssignmentCalendarItem } from "@/types/CalendarData";
import { OuterComponent } from "@/types/OuterComponent";
import Box from "@mui/material/Box";

export const ASSIGNMENT_DATE_FORMAT = "EEEE, MMMM d";

interface AssignmentDueDateTimeProps {
  assignmentKey: AssignmentCalendarItem;
  outerComponent?: OuterComponent;
}

/**
 * Render the date of an assignment.
 */
export const AssignmentDueDateTime: React.FunctionComponent<
  AssignmentDueDateTimeProps
> = ({
  assignmentKey,
  // Default to no explicit outerComponent.
  outerComponent = undefined,
}) => {
  assert("submission" in assignmentKey);
  assert(assignmentKey.submission === "canvas");

  const resultComponent: React.ReactElement = (() => {
    return (
      <React.Fragment>
        {formatCalendarDate(assignmentKey.date, ASSIGNMENT_DATE_FORMAT)}
        {", "}
        {assignmentKey.submitCanvasTime}
      </React.Fragment>
    );
  })();

  if (outerComponent) {
    return <Box component={outerComponent}>{resultComponent}</Box>;
  } else {
    return resultComponent;
  }
};

export default AssignmentDueDateTime;
