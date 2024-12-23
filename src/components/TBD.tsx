"use client";

import * as React from "react";

import { assertIsOuterComponent, OuterComponent } from "@/types/OuterComponent";
import { lighten } from "@mui/material";
import Box from "@mui/material/Box";

interface TBDProps extends React.PropsWithChildren<{}> {
  outerComponent?: OuterComponent;
}

export const TBD = ({
  children,
  // Default to "span" outerComponent.
  outerComponent = "span",
}: TBDProps): React.ReactElement => {
  // MDX does not enforce this.
  assertIsOuterComponent(outerComponent);

  return (
    <Box
      component={outerComponent}
      sx={(theme) => ({
        // Apply a background.
        // If this background is not appearing,
        // that is generally due to an invalid HTML hierarchy
        // (e.g., <p> cannot contain <div>, <span> cannot contain <p>).
        //
        // This backgroundColor matches the Alert background:
        // https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Alert/Alert.js
        backgroundColor: lighten(theme.palette.warning.light, 0.9),
      })}
    >
      {children}
    </Box>
  );
};

//
// Below was refactored 2023-09-12 to reduce number of component parameters.
//
// "use client";
//
// import * as React from "react";
//
// import { assertIsOuterComponent, OuterComponent } from "@/types/OuterComponent";
// import { lighten } from "@mui/material";
// import Box from "@mui/material/Box";
//
// interface TBDProps extends React.PropsWithChildren<{}> {
//   component?: OuterComponent;
//   outerComponent?: OuterComponent;
// }
//
// export const TBD = ({
//   children,
//   // Default component to inline "span".
//   component = "span",
//   // Default no outer component.
//   outerComponent,
// }: TBDProps): React.ReactElement => {
//   // MDX does not enforce this.
//   assertIsOuterComponent(component);
//
//   const resultComponent: React.ReactElement = (
//     <Box
//       component={component}
//       sx={(theme) => ({
//         // Apply a background.
//         // If this background is not appearing,
//         // that is generally due to an invalid HTML hierarchy
//         // (e.g., <p> cannot contain <div>, <span> cannot contain <p>).
//         //
//         // This is an attempt to match the Alert background:
//         // https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Alert/Alert.js
//         backgroundColor: lighten(theme.palette.warning.light, 0.9),
//       })}
//     >
//       {children}
//     </Box>
//   );
//
//   if (outerComponent) {
//     return <Box component={outerComponent}>{resultComponent}</Box>;
//   } else {
//     return resultComponent;
//   }
// };
//
// export default TBD;
