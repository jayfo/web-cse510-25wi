import * as React from "react";

import { AppLink } from "@/components/links/AppLink";
import { AssignmentCalendarItem } from "@/types/CalendarData";
import { Alert } from "@mui/material";

export const CalendarItemAssignments: React.FunctionComponent<{
  assignmentCalendarItems: AssignmentCalendarItem[];
}> = ({ assignmentCalendarItems }) => {
  return (
    assignmentCalendarItems &&
    assignmentCalendarItems.map(
      (assignmentCurrent, indexCurrent): React.ReactElement => {
        return (
          <Alert key={indexCurrent} severity="info" sx={{ marginTop: 1 }}>
            Assignment:{" "}
            {((): React.ReactNode => {
              if (assignmentCurrent.link) {
                return (
                  <AppLink href={assignmentCurrent.link}>
                    {assignmentCurrent.title}
                  </AppLink>
                );
              } else {
                return assignmentCurrent.title;
              }
            })()}
          </Alert>
        );
      },
    )
  );
};
