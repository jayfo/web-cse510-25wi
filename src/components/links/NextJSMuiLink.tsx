import * as React from "react";

import MUILink from "@mui/material/Link";
import NextJSLink, { LinkProps as NextJSLinkProps } from "next/link";

interface NextJSMUILinkProps extends NextJSLinkProps, React.PropsWithChildren {}
export const NextJSMUILink = ({
  children,
  href,
}: NextJSMUILinkProps): React.ReactElement => {
  // Because MUILink internally provides the <a> element, we need passHref and legacyBehavior.
  //
  // As of 2023-08-14, this is described with the pages router:
  // https://nextjs.org/docs/pages/api-reference/components/link
  //
  // As of 2023-08-14, this is not explicitly described with the app router:
  // https://nextjs.org/docs/app/api-reference/components/link
  //
  // Without this, links were behaving strangely
  // (e.g., not always honoring the hash component of a link).
  //
  // As of 2023-08-14, the NextJS <Link> prefetch functionality was problematic.
  // Perhaps due to a negative interaction with the MUI <Link> hover behavior.
  // Use Chrome to view a page, follow a <Link>, and then go back.
  // Upon hovering over that same link, the app navigates to that link (i.e., without a click).
  // Prefetch is therefore intentionally disabled here.
  return (
    <NextJSLink prefetch={false} href={href} passHref legacyBehavior>
      <MUILink>{children}</MUILink>
    </NextJSLink>
  );
};
