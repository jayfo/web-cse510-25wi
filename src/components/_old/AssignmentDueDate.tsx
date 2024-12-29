import * as React from "react";

import { formatCalendarDate } from "@/data/CalendarData";
import { AssignmentCalendarItem } from "@/types/CalendarData";
import { OuterComponent } from "@/types/OuterComponent";
import Box from "@mui/material/Box";

export const ASSIGNMENT_DATE_FORMAT = "EEEE, MMMM d";

interface AssignmentDueDateProps {
  assignmentKey: AssignmentCalendarItem;
  outerComponent?: OuterComponent;
}

/**
 * Render the date of an assignment.
 */
export const AssignmentDueDate: React.FunctionComponent<
  AssignmentDueDateProps
> = ({
  assignmentKey,
  // Default to no explicit outerComponent.
  outerComponent = undefined,
}) => {
  const resultComponent: React.ReactElement = (() => {
    return (
      <React.Fragment>
        {formatCalendarDate(assignmentKey.date, ASSIGNMENT_DATE_FORMAT)}
      </React.Fragment>
    );
  })();

  if (outerComponent) {
    return <Box component={outerComponent}>{resultComponent}</Box>;
  } else {
    return resultComponent;
  }
};

export default AssignmentDueDate;
