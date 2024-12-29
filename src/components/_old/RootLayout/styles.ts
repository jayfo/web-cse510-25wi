"use client";

import { SxProps, useMediaQuery } from "@mui/material";
import { Theme as MUITheme } from "@mui/material/styles";
import { SystemStyleObject } from "@mui/system";

const SIDEBAR_WIDTH = 240;

function useAppBarHeight(): 48 | 56 | 64 {
  // The height of the AppBar is controlled by this:
  // https://github.com/mui/material-ui/blob/master/packages/mui-material/src/styles/createMixins.js
  //
  // toolbar: {
  //   minHeight: 56,
  //   [breakpoints.up('xs')]: {
  //     '@media (orientation: landscape)': {
  //       minHeight: 48,
  //     },
  //   },
  //   [breakpoints.up('sm')]: {
  //     minHeight: 64,
  //   },
  // },

  // Always perform both queries.
  const matchMinWidth600 = useMediaQuery("(min-width: 600px)");
  const matchLandscape = useMediaQuery("(orientation: landscape");

  if (matchMinWidth600) {
    // 600px is "sm". At or above that, always height 64.
    return 64;
  }

  if (matchLandscape) {
    // If less than 600px, detect a landscape orientation.
    return 48;
  }

  return 56;
}

function stylesByAppBarHeight(styles: {
  styles48: SystemStyleObject<MUITheme>;
  styles56: SystemStyleObject<MUITheme>;
  styles64: SystemStyleObject<MUITheme>;
}): SystemStyleObject<MUITheme> {
  // useAppBarHeight is not available until client Javascript.
  // Because AppBar height is fixed to a set of 3 values,
  // enumerating styles for each value allows server rendering
  // which avoids changes being applied as client Javascript loads.

  return {
    "@media (min-width: 600px)": styles.styles64,
    "@media not all and (min-width: 600px)": {
      "@media (orientation: landscape)": styles.styles48,
      "@media not all and (orientation: landscape)": styles.styles56,
    },
  };
}

// Disable warning due to inline function objects.
// noinspection BadExpressionStatementJS
export function useLayoutStyles(): SxProps<MUITheme> {
  const sxContentElementsMarginPadding: SystemStyleObject<MUITheme> = {
    // Apply padding
    // and force 0 margin top for first child.
    padding: 3,
    "& > :first-child": {
      marginTop: 0,
    },
  };

  return [
    // AppBar floats above everything.
    (theme): SystemStyleObject<MUITheme> => ({
      "#rootLayout-appBar": {
        zIndex: theme.zIndex.drawer + 1,
      },
    }),
    // Page title typography.
    (theme): SystemStyleObject<MUITheme> => ({
      "#rootLayout-title": {
        color: theme.palette.primary.contrastText,
        typography: "h3",
      },
    }),
    // Container of sidebar and main.
    {
      "#rootLayout-container": {
        display: "flex",
      },
    },
    // Drawer is sticky.
    {
      "#rootLayout-sidebar": {
        // Hold its width.
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        // Sticky at the top below the AppBar.
        position: "sticky",
        alignSelf: "flex-start",
        // Adjust top according to height of AppBar.
        ...stylesByAppBarHeight({
          styles48: {
            top: 48,
          },
          styles56: {
            top: 56,
          },
          styles64: {
            top: 64,
          },
        }),
      },
    },

    // Consistent styling of the two content regions.
    {
      "#rootLayout-sidebar-content": {
        ...sxContentElementsMarginPadding,
      },
      "#rootLayout-main-content": {
        ...sxContentElementsMarginPadding,
      },
    },
    // The scrollPaddingTop of the page works with the scrollMarginTop of each element.
    // We want the scrollMarginTop to be the same as the marginTop.
    //
    // By default, marginTop is specified in em.
    // https://www.w3schools.com/cssref/css_default_values.php
    //
    // We might be able to specify this in the theme,
    // but then it would only apply to React elements.
    // Specifying it here also applies it to any raw html heading elements.
    {
      h1: {
        scrollMarginTop: "0.67em",
      },
      h2: {
        scrollMarginTop: "0.83em",
      },
      h3: {
        scrollMarginTop: "1.00em",
      },
      h4: {
        scrollMarginTop: "1.33em",
      },
      h5: {
        scrollMarginTop: "1.67em",
      },
      h6: {
        scrollMarginTop: "2.33em",
      },
    },
  ];
}
