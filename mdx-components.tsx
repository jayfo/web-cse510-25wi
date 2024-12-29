// Required to use MDX in app directory, based on example:
// https://github.com/vercel/next.js/tree/canary/examples/app-dir-mdx
// Accessed 2023-07-21.

import * as React from "react";

import { AppLink } from "@/components/links/AppLink";
import { assertNotNullNotUndefined } from "@/types/guards";
import { Typography } from "@mui/material";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // MDX links should all be our AppLink.
    a: ({ children, href }) => {
      assertNotNullNotUndefined(href);

      return <AppLink href={href}>{children}</AppLink>;
    },

    // If MDX uses raw html heading elements, then MUI theming is not applied.
    // For internal consistency, apply theme typography to each heading type.
    h1: ({
      children,
      ...props
    }: React.PropsWithChildren | React.HTMLAttributes<HTMLHeadingElement>) => {
      return (
        <Typography component="h1" variant="h1" {...props}>
          {children}
        </Typography>
      );
    },
    h2: ({
      children,
      ...props
    }: React.PropsWithChildren | React.HTMLAttributes<HTMLHeadingElement>) => {
      return (
        <Typography component="h2" variant="h2" {...props}>
          {children}
        </Typography>
      );
    },
    h3: ({
      children,
      ...props
    }: React.PropsWithChildren | React.HTMLAttributes<HTMLHeadingElement>) => {
      return (
        <Typography component="h3" variant="h3" {...props}>
          {children}
        </Typography>
      );
    },
    h4: ({
      children,
      ...props
    }: React.PropsWithChildren | React.HTMLAttributes<HTMLHeadingElement>) => {
      return (
        <Typography component="h4" variant="h4" {...props}>
          {children}
        </Typography>
      );
    },
    h5: ({
      children,
      ...props
    }: React.PropsWithChildren | React.HTMLAttributes<HTMLHeadingElement>) => {
      return (
        <Typography component="h5" variant="h5" {...props}>
          {children}
        </Typography>
      );
    },
    h6: ({
      children,
      ...props
    }: React.PropsWithChildren | React.HTMLAttributes<HTMLHeadingElement>) => {
      return (
        <Typography component="h6" variant="h6" {...props}>
          {children}
        </Typography>
      );
    },

    ...components,
  };
}
