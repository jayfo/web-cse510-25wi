import * as React from "react";

import { ok as assert } from "assert";

import { AppLink } from "@/components/links/AppLink";
import { TBD } from "@/components/TBD";
import { AssignmentCalendarItem } from "@/types/CalendarData";
import { assertIsOuterComponent, OuterComponent } from "@/types/OuterComponent";

interface AssignmentSubmitCanvasLinkProps extends React.PropsWithChildren<{}> {
  assignmentKey: AssignmentCalendarItem;
  outerComponent?: OuterComponent;
}

export const AssignmentSubmitCanvasLink: React.FunctionComponent<
  AssignmentSubmitCanvasLinkProps
> = ({
  children,
  assignmentKey,
  // Default to no explicit outerComponent.
  outerComponent = undefined,
}: AssignmentSubmitCanvasLinkProps): React.ReactElement => {
  // If provided an outerComponent, be sure it is valid.
  if (outerComponent !== undefined) {
    assertIsOuterComponent(outerComponent);
  }

  assert("submission" in assignmentKey);
  assert(assignmentKey.submission === "canvas");

  // // Actual href retrieved from CourseData.
  const href = assignmentKey.submitCanvasLink;

  const resultComponentAnchor: React.ReactNode = (() => {
    if (children) {
      // If we have any anchor content, use that.
      return children;
    } else {
      // If we do not have any anchor content, use an appropriate default.
      if (href) {
        // If we have an actual href, default to the href itself.
        return href;
      } else {
        // Without an actual href, indicate the link is TBD.
        return "Link TBD.";
      }
    }
  })();

  if (href) {
    // Actual href is available, create the link.
    return (
      <AppLink href={href} outerComponent={outerComponent}>
        {resultComponentAnchor}
      </AppLink>
    );
  } else {
    // Actual href is not available, create a TBD.
    return <TBD outerComponent={outerComponent}>{resultComponentAnchor}</TBD>;
  }
};
