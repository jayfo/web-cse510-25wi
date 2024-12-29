import * as React from "react";

import { AppLink } from "@/components/links/AppLink";
import { assertNotNullNotUndefined } from "@/types/guards";
import { assertIsOuterComponent, OuterComponent } from "@/types/OuterComponent";
import { SiteLinkKey } from "@/types/SiteLinks";

interface SiteLinkProps extends React.PropsWithChildren<{}> {
  linkKey: SiteLinkKey;
  outerComponent?: OuterComponent;
}

export const SiteLink: React.FunctionComponent<SiteLinkProps> = ({
  children,
  linkKey,
  // Default to no explicit outerComponent.
  outerComponent = undefined,
}) => {
  // Be sure there is a link.
  assertNotNullNotUndefined(linkKey);
  assertNotNullNotUndefined(linkKey.href);
  // If provided an outerComponent, be sure it is valid.
  if (outerComponent !== undefined) {
    assertIsOuterComponent(outerComponent);
  }

  // Actual href retrieved from linkKey.
  const href = linkKey.href;

  const resultComponentAnchor: React.ReactNode = (() => {
    if (children) {
      // If we have any anchor content, use that.
      return children;
    } else {
      // If we do not have any anchor content, use an appropriate default.
      return linkKey.anchor;
    }
  })();

  return (
    <AppLink href={href} outerComponent={outerComponent}>
      {resultComponentAnchor}
    </AppLink>
  );
};
