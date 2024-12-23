import * as React from "react";

export type CourseDataLinkHREF = string;

export type CourseDataLinkKey = {
  href?: CourseDataLinkHREF;
  anchor?: React.ReactNode;
};

export const courseData = {
  linkAccessiblePresentations: {
    href: "https://interactions.acm.org/archive/view/july-august-2017/making-your-presentation-accessible",
    anchor: "Guidance on Making Your Presentation Accessible",
  },

  linkProjectFinalReportCHIFormat: {
    href: "https://chi2023.acm.org/submission-guides/chi-publication-formats/",
  },

  linkProjectMilestoneReport1Signup: {
    href: "https://docs.google.com/document/d/1XDDzfgNuEnGLK76ulvZ7Nhyupnx8KjLhNXFRXPotkSk/",
  },

  linkProjectMilestoneReport2Signup: {
    href: "https://docs.google.com/document/d/1F6w_zzCboMpV5QPcFM4Ww6lmyBh2SBxqb2_t13rKaFI/",
  },

  linkProjectProposalGoogleDoc: {
    href: "https://docs.google.com/document/d/1mmYPRx8LmdH6f9p0zq1CjZznMe8nJp72DDqR9cd6QMM",
  },

  linkProjectProposalIdeas: {
    href: "https://canvas.uw.edu/courses/1665830/discussion_topics/8379070",
  },

  linkProjectProposalSamples: {
    href: "https://canvas.uw.edu/courses/1665830/files/folder/project%20samples",
  },

  linkStatisticsLab: {
    href: "https://canvas.uw.edu/files/111265338/",
  },

  linkVisionsSignup: {
    href: "https://docs.google.com/document/d/1vtwIw_jZurCsgwtlNloEoedjRblA5q2v7avqo_AYvXQ",
    anchor: "Visions of HCI Presentation Signup",
  },

  linkVisionsSlides: {
    href: "https://docs.google.com/presentation/d/10wRbnA7hIAYDbrybF6yMA6WRaFzoFtYQBxSBYa1Y-5Y",
    anchor: "Visions of HCI Presentation Slides",
  },

  // Reading on paper writing
  readingWobbrockPaperWriting: {
    authorText: "Jacob O. Wobbrock",
    title: "Catchy Titles are Good: But Avoid Being Cute",
    publicationText: "2015",
    link: "https://faculty.washington.edu/wobbrock/pubs/Wobbrock-2015.pdf",
  },
} as const;
