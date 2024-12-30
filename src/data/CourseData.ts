import * as React from "react";

export type CourseDataLinkHREF = string;

export type CourseDataLinkKey = {
  href?: CourseDataLinkHREF;
  anchor?: React.ReactNode;
};

export const courseData = {
  // Link to course Canvas. No trailing slash.
  linkCanvas: {
    href: "https://canvas.uw.edu/courses/1786160",
  },

  // Link to course Drive.
  linkDrive: {
    //   href: "https://drive.google.com/drive/folders/1Sm12CpuMNsKBqk6E_Ri875hfFs0A-IRS?usp=drive_link",
  },

  // Link to course GitHub.
  linkGitHub: {
    href: "https://github.com/uwcse510/web-cse510-25wi",
  },
} as const;
