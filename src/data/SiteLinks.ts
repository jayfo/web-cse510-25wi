// TODO: Figure out how to enforce any typing on this

// import { SiteLinkKey } from "@/types/SiteLinks";

export const SiteLinks = {
  homeTop: {
    href: "/#course-overview",
    anchor: "Course Overview",
  },

  assignmentsTop: {
    href: "/assignments/#assignments",
    anchor: "Assignments",
  },

  assignmentsReadingsTop: {
    href: "/assignments/readings/#readingsanddiscussionposts",
    anchor: "Readings and Discussion Posts",
  },

  assignmentsPresentationsTop: {
    href: "/assignments/presentations/#presentationsanddiscussions",
    anchor: "Presentations and Discussions",
  },

  assignmentsProjectTop: {
    href: "/assignments/project/#project",
    anchor: "Project",
  },

  assignmentsProjectProposalTop: {
    href: "/assignments/project/proposal#project-proposal",
    anchor: "Proposal",
  },

  assignmentsProjectMilestoneReport1Top: {
    href: "/assignments/project/milestonereport#project-milestone-report",
    anchor: "Milestone Report 1",
  },

  assignmentsProjectMilestoneReport2Top: {
    href: "/assignments/project/milestonereport#project-milestone-report",
    anchor: "Milestone Report 2",
  },

  assignmentsProjectFinalReportTop: {
    href: "/assignments/project/finalreport#project-final-report",
    anchor: "Final Report",
  },

  assignmentsReflectionsTop: {
    href: "/assignments/reflections/#reflections",
    anchor: "Reflections",
  },

  assignmentsReflectionsContributionTop: {
    href: "/assignments/reflections/contribution#contribution-reflection",
    anchor: "Contribution",
  },

  assignmentsReflectionsMethodTop: {
    href: "/assignments/reflections/method#method-reflection",
    anchor: "Method",
  },

  assignmentsReflectionsFramingTop: {
    href: "/assignments/reflections/framing#framing-reflection",
    anchor: "Framing",
  },

  calendarTop: {
    href: "/calendar/#calendar",
    anchor: "Calendar",
  },
} as const;
