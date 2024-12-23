import * as React from "react";

import { AppLink } from "@/components/links/AppLink";
import { OuterComponent } from "@/types/OuterComponent";
import { Reading } from "@/types/Reading";
import Box from "@mui/material/Box";

/**
 * A Reading to be formatted.
 */
interface FormattedReadingProps {
  reading: Reading;
  outerComponent?: OuterComponent;
}

/**
 * Render a Reading as a <span /> to be displayed.
 */
export const FormattedReading: React.FunctionComponent<
  FormattedReadingProps
> = ({
  reading,
  // Default to no explicit outerComponent.
  outerComponent = undefined,
}) => {
  const resultComponent: React.ReactElement = (() => {
    return (
      <React.Fragment>
        {
          // Optionally an author and then a space padding.
          reading.authorText && (
            <React.Fragment>{reading.authorText}. </React.Fragment>
          )
        }
        {
          // Always include a title, optionally with a link.
          ((): React.ReactNode => {
            if (reading.link) {
              return (
                <React.Fragment>
                  <AppLink href={reading.link}>{reading.title}</AppLink>.
                </React.Fragment>
              );
            } else {
              return <React.Fragment>{reading.title}.</React.Fragment>;
            }
          })()
        }
        {
          // Optionally space padding and then a publicationText.
          reading.publicationText && (
            <React.Fragment> {reading.publicationText}.</React.Fragment>
          )
        }
      </React.Fragment>
    );
  })();

  if (outerComponent) {
    return <Box component={outerComponent}>{resultComponent}</Box>;
  } else {
    return resultComponent;
  }
};
