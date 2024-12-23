"use client";

import * as React from "react";

import { useAppStore } from "@/components/AppStoreProvider";
import { AppLink } from "@/components/links/AppLink";
import { TBD } from "@/components/TBD";
import {
  assertIsCourseStoreLinkKey,
  CourseStoreLinkKey,
} from "@/types/CourseStore";
import { assertNotNullNotUndefined } from "@/types/Guards";
import { assertIsOuterComponent, OuterComponent } from "@/types/OuterComponent";

interface CourseStoreLinkProps extends React.PropsWithChildren<{}> {
  linkKey: CourseStoreLinkKey;
  outerComponent?: OuterComponent;
}

export const CourseStoreLink: React.FunctionComponent<CourseStoreLinkProps> = ({
  children,
  linkKey,
  // Default to no explicit outerComponent.
  outerComponent = undefined,
}: CourseStoreLinkProps): React.ReactElement => {
  // Be sure there is a linkKey.
  assertNotNullNotUndefined(linkKey);
  assertIsCourseStoreLinkKey(linkKey);
  // If provided an outerComponent, be sure it is valid.
  if (outerComponent !== undefined) {
    assertIsOuterComponent(outerComponent);
  }

  // Actual href retrieved from CourseStore.
  const appStore = useAppStore();
  const href = appStore.courseStore[linkKey];

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

//
// Below was refactored 2023-09-12 to reduce number of component parameters.
//
// "use client";
//
// import * as React from "react";
//
// import { useAppStore } from "@/components/AppStoreProvider";
// import { AppLink } from "@/components/links/AppLink";
// import TBD from "@/components/TBD";
// import {
//   assertIsCourseStoreLinkKey,
//   CourseStoreLinkKey,
// } from "@/types/CourseStore";
// import { OuterComponent } from "@/types/OuterComponent";
// import Box from "@mui/material/Box";
// import { observer } from "mobx-react";
//
// interface CourseStoreLinkProps extends React.PropsWithChildren<{}> {
//   component?: OuterComponent;
//   outerComponent?: OuterComponent;
//   linkKey: CourseStoreLinkKey;
// }
//
// export const CourseStoreLink = observer(
//   ({
//     children,
//     // Default component to inline "span".
//     component = "span",
//     // Default no outer component.
//     outerComponent,
//     linkKey,
//   }: CourseStoreLinkProps): React.ReactElement => {
//     const appStore = useAppStore();
//
//     // MDX does not enforce this.
//     assertIsCourseStoreLinkKey(linkKey);
//
//     // Actual href retrieved from CourseStore.
//     const href = appStore.courseStore[linkKey];
//
//     const resultComponentAnchor: React.ReactNode = (() => {
//       if (children) {
//         // If we have any anchor content, use that.
//         return children;
//       } else {
//         // If we do not have any anchor content, use an appropriate default.
//         if (href) {
//           // If we have an actual href, default to the link itself.
//           return appStore.courseStore[linkKey];
//         } else {
//           // Without an actual href, indicate the link is TBD.
//           return "Link TBD.";
//         }
//       }
//     })();
//
//     const resultComponent: React.ReactElement = (() => {
//       if (href) {
//         // Href is available, create the link.
//         return (
//           <AppLink href={href}>
//             <Box component={component}>{resultComponentAnchor}</Box>
//           </AppLink>
//         );
//       } else {
//         // Actual href is not available, create a TBD.
//         return <TBD component={component}>{resultComponentAnchor}</TBD>;
//       }
//     })();
//
//     if (outerComponent) {
//       return <Box component={outerComponent}>{resultComponent}</Box>;
//     } else {
//       return resultComponent;
//     }
//   },
// );
