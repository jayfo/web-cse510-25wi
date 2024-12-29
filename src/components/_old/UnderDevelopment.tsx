import * as React from "react";

import Alert from "@mui/material/Alert";

interface UnderDevelopmentProps {
  display?: boolean;
}

export const UnderDevelopment = ({
  display = true,
}: UnderDevelopmentProps): React.ReactNode => {
  if (display) {
    return (
      <Alert severity="warning">
        Content is Under Development and Subject to Change
      </Alert>
    );
  } else {
    return null;
  }
};
