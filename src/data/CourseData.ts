import * as React from "react";

export type CourseDataLinkHREF = string;

export type CourseDataLinkKey = {
  href?: CourseDataLinkHREF;
  anchor?: React.ReactNode;
};

export const courseData = {
  // Link to course Canvas.
  linkCanvas: {
    href: "https://canvas.uw.edu/courses/1786160",
  },

  // Link to discussion in course Canvas.
  linkCanvasDiscussion: {
    href: "https://canvas.uw.edu/courses/1786160/discussion_topics",
  },

  // Link to course Drive.
  linkDrive: {
    //   href: "https://drive.google.com/drive/folders/1Sm12CpuMNsKBqk6E_Ri875hfFs0A-IRS?usp=drive_link",
  },

  // Link to course GitHub.
  linkGitHub: {
    href: "https://github.com/uwcse510/web-cse510-25wi",
  },

  // Link to UW COVID guidelines.
  linkUniversityCovidGuidelines: {
    href: "https://www.ehs.washington.edu/covid-19-prevention-and-response/covid-19-illness-and-exposure-guidance",
  },

  // Link to UW syllabus guidelines.
  linkUniversitySyllabusGuidelines: {
    href: "https://registrar.washington.edu/curriculum/syllabus-guidelines",
  },
} as const;
