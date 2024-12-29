import * as React from "react";

import { AssignmentDueDateTime } from "@/components/AssignmentDueDateTime";
import { CollapseWithHeader } from "@/components/CollapseWithHeader";
import { AssignmentCalendarItem } from "@/types/CalendarData";
import { idAnchorText } from "@/utils/idAnchorText";
import { Stack } from "@mui/material";

//
// Properties
//
interface CollapseProjectMilestoneProps extends React.PropsWithChildren<{}> {
  assignment: AssignmentCalendarItem;
  revisionAssignment?: AssignmentCalendarItem;
}

/**
 */
export const CollapseProjectMilestone: React.FunctionComponent<
  CollapseProjectMilestoneProps
> = (props: CollapseProjectMilestoneProps) => {
  const collapseTitle = props.assignment.title;

  return (
    <CollapseWithHeader
      header={
        <Stack>
          <h3 id={idAnchorText(collapseTitle)}>{collapseTitle}</h3>
          {"submission" in props.assignment &&
            props.assignment.submission === "canvas" && (
              <p>
                Due: <AssignmentDueDateTime assignmentKey={props.assignment} />
                {!!props.revisionAssignment && (
                  <React.Fragment>
                    <br />
                    {"Revision Due: "}
                    <AssignmentDueDateTime
                      assignmentKey={props.revisionAssignment}
                    />
                  </React.Fragment>
                )}
              </p>
            )}
        </Stack>
      }
    >
      {props.children}
    </CollapseWithHeader>
  );
};
