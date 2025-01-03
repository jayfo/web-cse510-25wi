import * as React from "react";

export type CourseDataLinkHREF = string;

export type CourseDataLinkKey = {
  href?: CourseDataLinkHREF;
  anchor?: React.ReactNode;
};

const LINK_CANVAS = "https://canvas.uw.edu/courses/1786160";

export const courseData = {
  // Link to Canvas.
  linkCanvas: {
    href: LINK_CANVAS,
  },

  // Link to Canvas discussion.
  linkCanvasDiscussion: {
    href: LINK_CANVAS + "/discussion_topics",
  },

  // Link to Canvas discussion for project ideas.
  linkCanvasDiscussionProjectIdeas: {
    href: LINK_CANVAS + "/discussion_topics/9383505",
  },

  // Link to Canvas file folder of project samples.
  linkCanvasProjectProposalSamples: {
    href: LINK_CANVAS + "/files/folder/project%20samples",
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

  // Link to course Drive.
  linkDrive: {
    href: "https://drive.google.com/drive/folders/13vHGA0QND7_KURsE6gJNiPZzF26Kxk65?usp=sharing",
  },

  // Link to project proposal document.
  linkDriveProposalDocument: {
    href: "https://docs.google.com/document/d/1-WoZWx0BROvs4wI8ZZxDCjlnZawnB_G7CCp4EoTL7Jw/edit?usp=sharing",
  },

  // Link to project milestone meeting signup.
  linkDriveProjectMilestoneMeetingsSignup1: {
    href: "https://drive.google.com/drive/folders/1e-mnBEmL7hisTvzVKRe_KcwBjVVjiPhd?usp=sharing",
  },

  // Link to project milestone meeting signup.
  linkDriveProjectMilestoneMeetingsSignup2: {
    href: "https://drive.google.com/drive/folders/1SpeOaA27XHKa-ltZodJ3HLCNiMuMHyZ1?usp=sharing",
  },

  linkProjectFinalReportCHIFormat: {
    href: "https://chi2024.acm.org/submission-guides/chi-publication-formats/",
  },

  // Link to the Visions of HCI folder.
  linkDriveVisionsOfHciFolder: {
    href: "https://drive.google.com/drive/folders/1FHNwj8cUjizBpK-KvmpmzV8PvXubnDqe?usp=sharing",
  },

  // Reading on paper writing
  readingWobbrockPaperWriting: {
    authorText: "Jacob O. Wobbrock",
    title: "Catchy Titles are Good: But Avoid Being Cute",
    publicationText: "2015",
    link: "https://faculty.washington.edu/wobbrock/pubs/Wobbrock-2015.pdf",
  },
} as const;
