import * as React from "react";

import Alert from "@mui/material/Alert";

// TODO: Decide whether/how TBD and UnderDevelopment should be re-using each other

interface UnderDevelopmentProps {
  display?: boolean;
}

export const UnderDevelopment = ({
  display = true,
}: UnderDevelopmentProps): React.ReactNode => {
  if (display) {
    return (
      <Alert severity="warning" sx={{ marginTop: 1 }}>
        Content is Under Development and Subject to Change
      </Alert>
    );
  } else {
    return null;
  }
};
