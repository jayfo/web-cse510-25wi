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

  // Links to Canvas reflection submissions.
  linkCanvasReflectionRequiredContribution: {
    href: "https://canvas.uw.edu/courses/1786160/assignments/10051205",
  },
  linkCanvasReflectionRequiredMethod: {
    href: "https://canvas.uw.edu/courses/1786160/assignments/10051182",
  },
  linkCanvasReflectionRequiredFraming: {
    href: "https://canvas.uw.edu/courses/1786160/assignments/10051183",
  },
  linkCanvasReflectionOptional: {
    href: "https://canvas.uw.edu/courses/1786160/assignments/10051201",
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

  linkDrivePresentationSignup: {
    href: "https://docs.google.com/document/d/1e8__5CSjknBdcDE1R8fYbzctd18s0l8s3hxfC9UJYXU/edit",
  },

  linkDrivePresentationDraftSlides: {
    href: "https://forms.gle/szGmmMFeaFNCCCSR8",
  },

  linkDrivePresentationGroupFeedback: {
    href: "https://forms.gle/oG4ypBB4nj9nnPfd8",
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

  // Reading on paper writing
  readingWobbrockPaperWriting: {
    authorText: "Jacob O. Wobbrock",
    title: "Catchy Titles are Good: But Avoid Being Cute",
    publicationText: "2015",
    link: "https://faculty.washington.edu/wobbrock/pubs/Wobbrock-2015.pdf",
  },

  // Readings on methods
  readingMethodsWaysOfKnowing: {
    authorText: "Judith S. Olson, Wendy A. Kellogg",
    title: "Ways of Knowing in HCI",
    publicationText: "2014",
    link: "https://canvas.uw.edu/files/129188070/",
  },

  readingMethodsExperimentDesignAndStatisticalAnalysis: {
    authorText: "Jacob O. Wobbrock",
    title: "Experiment Design and Statistical Analysis in HCI",
    publicationText: "2024",
    link: "https://canvas.uw.edu/files/129188068/",
  },

  readingMethodsBraunAndClarke2012: {
    authorText: "Victoria Braun, Victoria Clarke",
    title: "Thematic Analysis",
    publicationText: "In APA Handbook of Research Methods in Psychology. 2012",
    link: "https://canvas.uw.edu/files/129191177/",
  },

  readingMethodsTerryHayfieldClarkeBraun2017: {
    authorText: "Gareth Terry, Nikki Hayfield, Victoria Clarke, Virginia Braun",
    title: "Thematic Analysis",
    publicationText:
      "In The SAGE Handbook of Qualitative Research in Psychology. 2017",
    link: "https://canvas.uw.edu/files/129191175/",
  },

  readingMethodsByrne2022: {
    authorText: "David Byrne",
    title:
      "A Worked Example of Braun and Clarke's Approach to Reflexive Thematic Analysis",
    publicationText: "Quality & Quantity. 2021",
    link: "https://canvas.uw.edu/files/129191179/",
  },
} as const;
