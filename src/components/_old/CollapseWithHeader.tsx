"use client";

import * as React from "react";

import { ExpandCircleDownOutlined } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Paper,
  //     SxProps,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";

//
// Properties
//
interface CollapseWithHeaderProps extends React.PropsWithChildren<{}> {
  header: React.ReactElement;
}

/**
 */
export const CollapseWithHeader: React.FunctionComponent<
  CollapseWithHeaderProps
> = (props: CollapseWithHeaderProps) => {
  // const store = useAppStore();

  const [expanded, setExpanded] = React.useState<boolean>(
    false,
    // calendarDateCurrent.date.diffNow("days").days >= -1
  );

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  let rotation;
  if (expanded) {
    rotation = "rotate(180deg)";
  } else {
    rotation = "rotate(0deg)";
  }

  return (
    <React.Fragment>
      <Paper elevation={1}>
        <Box sx={{ margin: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
            onClick={toggleExpanded}
          >
            {props.header}
            <IconButton aria-label="show more">
              <ExpandCircleDownOutlined sx={{ transform: rotation }} />
            </IconButton>
          </Box>
          <Collapse in={expanded} mountOnEnter unmountOnExit>
            {props.children}
          </Collapse>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default CollapseWithHeader;
