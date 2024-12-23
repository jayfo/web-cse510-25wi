import { SiteLinkKey } from "@/types/SiteLinks";

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
    href: "/assignments/readings/#readings",
    anchor: "Readings",
  },
  assignmentsProjectTop: {
    href: "/assignments/project/#project",
    anchor: "Project",
  },
  assignmentsStatisticsLabTop: {
    href: "/assignments/statisticslab/#statistics-lab",
    anchor: "Statistics Lab",
  },
  assignmentsExamTop: {
    href: "/assignments/exam/#exam",
    anchor: "Exam",
  },

  calendarTop: {
    href: "/calendar/#calendar",
    anchor: "Calendar",
  },
} as const;
