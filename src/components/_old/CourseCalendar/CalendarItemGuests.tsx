import * as React from "react";

import { AppLink } from "@/components/links/AppLink";
import { CalendarItem } from "@/types/CalendarData";
import { Alert } from "@mui/material";

export const CalendarItemGuests: React.FunctionComponent<{
  calendarItem: CalendarItem;
}> = ({ calendarItem }) => {
  const calendarItemGuests = (() => {
    if ("guest" in calendarItem) {
      return [calendarItem.guest];
    } else if ("guests" in calendarItem) {
      return calendarItem.guests;
    } else {
      return undefined;
    }
  })();

  return (
    calendarItemGuests &&
    calendarItemGuests.map((guestCurrent, indexCurrent): React.ReactElement => {
      return (
        <Alert key={indexCurrent} severity="info" sx={{ marginTop: 1 }}>
          Guest:{" "}
          {((): React.ReactNode => {
            if (guestCurrent.link) {
              return (
                <AppLink href={guestCurrent.link}>{guestCurrent.name}</AppLink>
              );
            } else {
              return guestCurrent.name;
            }
          })()}
        </Alert>
      );
    })
  );
};
