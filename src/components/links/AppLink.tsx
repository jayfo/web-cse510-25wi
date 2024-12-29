import * as React from "react";

import { NextJSMUILink } from "@/components/links/NextJSMuiLink";
import { assertNotNullNotUndefined } from "@/types/guards";
import { assertIsOuterComponent, OuterComponent } from "@/types/OuterComponent";
import { Link as MUILink } from "@mui/material";
import Box from "@mui/material/Box";

interface AppLinkProps extends React.PropsWithChildren<{}> {
  href: string;
  linkType?: "auto" | "internal" | "external" | "file";
  outerComponent?: OuterComponent;
}

export const AppLink = ({
  children,
  href,
  // Default linkType to "auto".
  linkType = "auto",
  // Default to no explicit outerComponent.
  outerComponent = undefined,
}: AppLinkProps): React.ReactElement => {
  // Be sure there is a link.
  assertNotNullNotUndefined(href);
  // If provided an outerComponent, be sure it is valid.
  if (outerComponent !== undefined) {
    assertIsOuterComponent(outerComponent);
  }

  // Determine whether this link is external to the app.
  // In that case, we should not use the app internal Link component.
  function isExternalLink(): boolean {
    if (linkType === "internal") {
      return false;
    }

    return (
      linkType === "external" ||
      href.startsWith("http:") ||
      href.startsWith("https:")
    );
  }

  // Determine whether this link is a file to be downloaded / viewed.
  // Such a file may be within the app, but should not use the app internal Link component.
  function isFile(): boolean {
    return (
      linkType === "file" ||
      href.toLocaleLowerCase().endsWith(".mp4") ||
      href.toLocaleLowerCase().endsWith(".pdf") ||
      href.toLocaleLowerCase().endsWith(".ppt")
    );
  }

  const resultComponent: React.ReactElement = (() => {
    // Both types of link are rendered as <MUILink /> so they're consistently styled.
    // An outer NextJSLink provides the desired behavior.
    if (isExternalLink() || isFile()) {
      // External links and file downloads are currently treated the same
      // External links use a normal MUI <Link>, are opened in "_blank".
      return (
        <MUILink href={href} target="_blank" rel="noopener">
          {children}
        </MUILink>
      );
    } else {
      // Internal links use a NextJS <Link>, are opened without a page load.
      return <NextJSMUILink href={href}>{children}</NextJSMUILink>;
    }
  })();

  if (outerComponent) {
    return <Box component={outerComponent}>{resultComponent}</Box>;
  } else {
    return resultComponent;
  }
};
