import * as React from "react";

export type CourseDataLinkHREF = string;

export type CourseDataLinkKey = {
  href?: CourseDataLinkHREF;
  anchor?: React.ReactNode;
};

export const courseData = {
  linkDriveProjectFiles: {
    href: "https://drive.google.com/drive/folders/1Sm12CpuMNsKBqk6E_Ri875hfFs0A-IRS?usp=drive_link",
  },

  linkFigmaPosterTemplates: {
    href: "https://www.figma.com/file/fK3x9CC0ZGXxjvvSfHg2t9/CSE440-Poster-Example-%26-Template?type=design&node-id=0%3A1&mode=design&t=4hrUv6ue9a5HxeXn-1",
    anchor: "Figma Templates",
  },
} as const;
