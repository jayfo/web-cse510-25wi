import * as React from "react";

import { ok as assert } from "assert";

import { FormattedReading } from "@/components/FormattedReading";
import { CourseDataLink } from "@/components/links/CourseDataLink";
import { default as ContentContributionsInHCI } from "@/content/ContributionsInHCI.mdx";
import { default as ContentNoReading } from "@/content/NoReading.mdx";
import { default as ContentVisionsOfHCI } from "@/content/VisionsOfHCI.mdx";
import { SiteLinks } from "@/data/SiteLinks";
import {
  AssignmentCalendarItem,
  AwayCalendarItem,
  CalendarDate,
  CalendarItem,
  CalendarWeek,
  EventCalendarItem,
  HolidayCalendarItem,
  LectureCalendarItem,
  OfficeHourCalendarItem,
  StudioCalendarItem,
} from "@/types/CalendarData";
import {
  clamp as clampDate,
  format as datefnsFormat,
  isValid as datefnsIsValid,
  parse as datefnsParse,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
} from "date-fns";

const dayOfWeekValues = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;
type dayOfWeek = (typeof dayOfWeekValues)[number];

const TIME_AND_LOCATION_LECTURE = {
  time: "10:00 to 11:20",
  location: "CSE2 G10",
};

export function parseCalendarDate(calendarDate: CalendarDate): Date {
  const parsedDate = datefnsParse(calendarDate, "yyyy-MM-dd", new Date());
  assert(datefnsIsValid(parsedDate), `Invalid date: ${calendarDate}`);

  return parsedDate;
}

export function formatCalendarDate(
  calendarDate: CalendarDate,
  format: string,
): string {
  return datefnsFormat(parseCalendarDate(calendarDate), format);
}

export function calendarDates(): CalendarDate[] {
  return eachDayOfInterval({
    start: parseCalendarDate(calendarData.datesOfInstruction.start),
    end: parseCalendarDate(calendarData.datesOfInstruction.end),
  }).map((dateCurrent: Date): CalendarDate => {
    return datefnsFormat(dateCurrent, "yyyy-MM-dd");
  });
}

export function calendarWeeks(): CalendarWeek[] {
  return eachWeekOfInterval({
    start: parseCalendarDate(calendarData.datesOfInstruction.start),
    end: parseCalendarDate(calendarData.datesOfInstruction.end),
  }).map((weekCurrent: Date): CalendarWeek => {
    return {
      startDate: datefnsFormat(weekCurrent, "yyyy-MM-dd"),
      dates: eachDayOfInterval({
        start: clampDate(weekCurrent, {
          start: parseCalendarDate(calendarData.datesOfInstruction.start),
          end: parseCalendarDate(calendarData.datesOfInstruction.end),
        }),
        end: clampDate(endOfWeek(weekCurrent), {
          start: parseCalendarDate(calendarData.datesOfInstruction.start),
          end: parseCalendarDate(calendarData.datesOfInstruction.end),
        }),
      }).map((dateCurrent): CalendarDate => {
        return datefnsFormat(dateCurrent, "yyyy-MM-dd");
      }),
    };
  });
}

export function calendarItems(): CalendarItem[] {
  return [
    ...Object.values(calendarData.assignments),
    ...calendarData.aways,
    ...calendarData.events,
    ...calendarData.holidays,
    ...calendarData.lectures,
    ...calendarData.officeHours,
    ...calendarData.studios,
  ];
}

export function calendarItemsForDate(
  calendarDate: CalendarDate,
): CalendarItem[] {
  return calendarItems().filter(
    (calendarItemCurrent: CalendarItem): boolean => {
      if ("date" in calendarItemCurrent) {
        return calendarDate === calendarItemCurrent.date;
      } else {
        return calendarItemCurrent.dates.includes(calendarDate);
      }
    },
  );
}

function verifyCalendarDate(
  calendarDate: CalendarDate,
  dayOfWeek: dayOfWeek,
): CalendarDate {
  assert(dayOfWeekValues.includes(dayOfWeek));

  const parsedDate = parseCalendarDate(calendarDate);
  const parsedDateDayOfWeek = datefnsFormat(parsedDate, "EEE");
  assert(
    parsedDateDayOfWeek === dayOfWeek,
    `Date ${calendarDate} is not ${dayOfWeek}`,
  );

  return calendarDate;
}

export const calendarData: {
  datesOfInstruction: {
    start: CalendarDate;
    end: CalendarDate;
  };
  assignments: { [key: string]: AssignmentCalendarItem };
  aways: AwayCalendarItem[];
  events: EventCalendarItem[];
  holidays: HolidayCalendarItem[];
  lectures: LectureCalendarItem[];
  officeHours: OfficeHourCalendarItem[];
  studios: StudioCalendarItem[];
} = {
  datesOfInstruction: {
    start: verifyCalendarDate("2025-01-06", "Mon"),
    end: verifyCalendarDate("2025-03-21", "Fri"),
  },

  assignments: {
    // projectProposal: {
    //   type: "assignment",
    //   title: "Project Proposal",
    //   // link: SiteLinks.assignmentsProjectTop.href,
    //   date: verifyCalendarDate("2023-10-15", "Sun"),
    //   submission: "canvas",
    //   submitCanvasTime: "11:59pm",
    //   submitCanvasLink:
    //     "https://canvas.uw.edu/courses/1665830/assignments/8670194",
    // },
    // projectMilestoneReport1: {
    //   type: "assignment",
    //   title: "Project Milestone Report 1",
    //   // link: SiteLinks.assignmentsProjectTop.href,
    //   date: verifyCalendarDate("2023-10-30", "Mon"),
    //   submission: "canvas",
    //   submitCanvasTime: "11:59pm",
    //   submitCanvasLink:
    //     "https://canvas.uw.edu/courses/1665830/assignments/8670192",
    // },
    // projectMilestonePresentation1Day1: {
    //   type: "assignment",
    //   title: "Project Milestone Presentation",
    //   // link: SiteLinks.assignmentsProjectTop.href,
    //   date: verifyCalendarDate("2023-10-31", "Tue"),
    // },
    // projectMilestonePresentation1Day2: {
    //   type: "assignment",
    //   title: "Project Milestone Presentation",
    //   // link: SiteLinks.assignmentsProjectTop.href,
    //   date: verifyCalendarDate("2023-11-02", "Thu"),
    // },
    // projectMilestoneReport2: {
    //   type: "assignment",
    //   title: "Project Milestone Report 2",
    //   // link: SiteLinks.assignmentsProjectTop.href,
    //   date: verifyCalendarDate("2023-11-27", "Mon"),
    //   submission: "canvas",
    //   submitCanvasTime: "11:59pm",
    //   submitCanvasLink:
    //     "https://canvas.uw.edu/courses/1665830/assignments/8670193",
    // },
    // projectMilestonePresentation2Day1: {
    //   type: "assignment",
    //   title: "Project Milestone Presentation",
    //   // link: SiteLinks.assignmentsProjectTop.href,
    //   date: verifyCalendarDate("2023-11-28", "Tue"),
    // },
    // projectMilestonePresentation2Day2: {
    //   type: "assignment",
    //   title: "Project Milestone Presentation",
    //   // link: SiteLinks.assignmentsProjectTop.href,
    //   date: verifyCalendarDate("2023-11-30", "Thu"),
    // },
    // projectFinalReport: {
    //   type: "assignment",
    //   title: "Project Final Report",
    //   // link: SiteLinks.assignmentsProjectTop.href,
    //   date: verifyCalendarDate("2023-12-12", "Tue"),
    //   submission: "canvas",
    //   submitCanvasTime: "11:59pm",
    //   submitCanvasLink:
    //     "https://canvas.uw.edu/courses/1665830/assignments/8670191",
    // },
  },

  aways: [
    {
      date: verifyCalendarDate("2025-02-06", "Thu"),
      type: "away",
      title: "James Away",
    },
    {
      date: verifyCalendarDate("2025-02-20", "Thu"),
      type: "away",
      title: "Anant Away",
    },
  ],

  events: [],

  holidays: [
    {
      date: verifyCalendarDate("2025-01-20", "Mon"),
      type: "holiday",
      title: "Martin Luther King Jr. Day",
    },
    {
      date: verifyCalendarDate("2025-02-17", "Mon"),
      type: "holiday",
      title: "Presidents' Day",
    },
  ],

  lectures: [
    // Week 1
    {
      date: verifyCalendarDate("2025-01-07", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Introductions and Overview",
      contentNonstandard: <ContentNoReading />,
    },
    {
      date: verifyCalendarDate("2025-01-09", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Visions of Human-Computer Interaction",
      contentNonstandard: (
        <ContentVisionsOfHCI
          readings={{
            visions: [
              {
                // Because this paper is reviewed in history discussion,
                // text below clarifies it can be read but will not be presented
                authorText: "Vannevar Bush",
                title: "As We May Think",
                publicationText: "The Atlantic, 1945",
                link: "https://theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/",
              },
              {
                authorText: "Mark Weiser",
                title: "The Computer for the 21st Century",
                publicationText: "Scientific American, 1991",
                link: "https://canvas.uw.edu/files/128522123/",
              },
              // {
              //   authorText:
              //     "Roy Want, Andy Hopper, Veronica Falcão, Jonathan Gibbons",
              //   title: "The Active Badge Location System",
              //   publicationText: "TOIS 1992",
              // },
              {
                authorText: "James D. Hollan, Scott Stornetta",
                title: "Beyond Being There",
                publicationText: "CHI 1992",
                link: "https://canvas.uw.edu/files/128522136/",
              },
              {
                authorText: "Pierre Wellner",
                title: "Interacting with Paper on the DigitalDesk",
                publicationText: "CACM 1993",
                link: "https://canvas.uw.edu/files/128522133/",
              },
              {
                authorText: "Benjamin B. Bederson, James D. Hollan",
                title:
                  "Pad++: A Zooming Graphical Interface for Exploring Alternate Interface Physics",
                publicationText: "UIST 1994",
                link: "https://canvas.uw.edu/files/128522138/",
              },
              {
                authorText: "Hiroshi Ishii, Brygg Ullmer",
                title:
                  "Tangible Bits: Towards Seamless Interfaces between People, Bits and Atoms",
                publicationText: "CHI 1997",
                link: "https://canvas.uw.edu/files/128522130/",
              },
              {
                authorText: "Eric Horvitz",
                title: "Principles of Mixed-Initiative User Interfaces",
                publicationText: "CHI 1999",
                link: "https://canvas.uw.edu/files/128522135/",
              },
              {
                authorText:
                  "Ken Hinckley, Jeff Pierce, Mike Sinclair, Eric Horvitz",
                title: "Sensing Techniques for Mobile Interaction",
                publicationText: "UIST 2000",
                link: "https://canvas.uw.edu/files/128522137/",
              },
              // {
              //   authorText: "Claudio S. Pinhanez",
              //   title:
              //     "The Everywhere Displays Projector: A Device to Create Ubiquitous Graphical Interfaces",
              //   publicationText: "UbiComp 2001",
              // },
              {
                authorText: "Saul Greenberg, Chester Fitchett",
                title:
                  "Phidgets: Easy Development of Physical Interfaces through Physical Widgets",
                publicationText: "UIST 2001",
                link: "https://canvas.uw.edu/files/128522141/",
              },
              {
                authorText:
                  "Roy Want, Trevor Pering, Gunner Danneels, Muthu Kumar, Murali Sundar, John Light",
                title:
                  "The Personal Server: Changing the Way We Think about Ubiquitous Computing",
                publicationText: "UbiComp 2002",
                link: "https://canvas.uw.edu/files/128522131/",
              },
              {
                authorText:
                  "Jonathan Lester, Tanzeem Choudhury, Gaetano Borriello",
                title:
                  "A Practical Approach to Recognizing Physical Activities",
                publicationText: "Pervasive 2006",
                link: "https://canvas.uw.edu/files/128522134/",
              },
              {
                authorText: "Bret Victor",
                title:
                  "Magic Ink: Information Software and the Graphical Interface",
                publicationText: "2006",
                link: "http://worrydream.com/MagicInk/",
              },
              {
                authorText:
                  "Michael S. Bernstein, Greg Little, Robert C. Miller, Björn Hartmann, Mark S. Ackerman, David R. Karger, David Crowell, Katrina Panovich",
                title: "Soylent: A Word Processor with a Crowd Inside",
                publicationText: "UIST 2010",
                link: "https://canvas.uw.edu/files/128522142/",
              },
              {
                authorText:
                  "Chris Harrison, Hrvoje Benko, and Andrew D. Wilson",
                title: "OmniTouch: Wearable Multitouch Interaction Everywhere",
                publicationText: "UIST 2011",
                link: "https://canvas.uw.edu/files/128558642/",
              },
            ],
          }}
        />
      ),
    },
    // Week 2
    {
      date: verifyCalendarDate("2025-01-14", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Contributions in Human-Computer Interaction",
      contentNonstandard: (
        <ContentContributionsInHCI
          readings={{
            framing: {
              authorText: "Jacob O. Wobbrock, Julie A. Kientz",
              title: "Research Contributions in Human-Computer Interaction",
              publicationText: "Interactions, 2016",
              // link: "https://canvas.uw.edu/files/109669373/",
            },
          }}
        />
      ),
      //   additionalResourceReadings: [
      //     {
      //       authorText: "Herbert A. Simon",
      //       title: "The Science of Design: Creating the Artificial",
      //       publicationText: "Design Issues, 1988",
      //       link: "https://canvas.uw.edu/files/109669331/",
      //     },
      //     {
      //       authorText: "Donald E. Stokes",
      //       title:
      //         "Pasteur’s Quadrant: Basic Science and Technological Innovation",
      //       publicationText: "Book Chapter, 1997",
      //       link: "https://canvas.uw.edu/files/109669330/",
      //     },
      //   ],
    },
    {
      date: verifyCalendarDate("2025-01-16", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "In-Class Time for Project Groups",
      contentNonstandard: <ContentNoReading />,
    },
    // Week 3
    {
      date: verifyCalendarDate("2025-01-21", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Human-Computer Interaction History",
      contentNonstandard: <ContentNoReading />,
      additionalResourceReadings: [
        {
          authorText: "Jonathan Grudin",
          title:
            "A Moving Target - The Evolution of Human-Computer Interaction",
          publicationText: "Book Chapter",
          // link: "https://canvas.uw.edu/files/109846167/",
        },
      ],
    },
    {
      date: verifyCalendarDate("2025-01-23", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Usability Evaluation Considered Harmful",
      readingsStandard: {
        framing: {
          authorText: "Saul Greenberg, Bill Buxton",
          title: "Usability Evaluation Considered Harmful (Some of the Time)",
          publicationText: "CHI 2008",
          // link: "https://canvas.uw.edu/files/109846204/",
        },
        instances: [
          {
            authorText: "Dan R. Olsen, Jr",
            title: "Evaluating User Interface Systems Research",
            publicationText: "UIST 2007",
            // link: "https://canvas.uw.edu/files/109846207/",
          },
          {
            authorText: "James Fogarty",
            title: "Code and Contribution in Interactive Systems Research",
            publicationText:
              "CHI 2017 Workshop on #HCI.Tools: Strategies and Best Practices for Designing, Evaluating, and Sharing Technical HCI Toolkits",
            // link: "https://canvas.uw.edu/files/109846202/",
          },
        ],
      },
    },
    // Week 4
    {
      date: verifyCalendarDate("2025-01-28", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: TBD",
    },
    {
      date: verifyCalendarDate("2025-01-30", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: TBD",
    },
    // Week 5
    {
      date: verifyCalendarDate("2025-02-04", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: TBD",
    },
    {
      date: verifyCalendarDate("2025-02-06", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: TBD",
    },
    // Week 7
    {
      date: verifyCalendarDate("2025-02-18", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: TBD",
    },
    {
      date: verifyCalendarDate("2025-02-20", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: TBD",
    },
    // Week 8
    {
      date: verifyCalendarDate("2025-02-25", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: TBD",
    },
    {
      date: verifyCalendarDate("2025-02-27", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: TBD",
    },
    // Week 10
    {
      date: verifyCalendarDate("2025-03-11", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: TBD",
    },
    {
      date: verifyCalendarDate("2025-03-13", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: TBD",
    },
    // Project Meetings, Week 6 and Week 9
    {
      dates: [
        verifyCalendarDate("2025-02-11", "Tue"),
        verifyCalendarDate("2025-02-13", "Thu"),
        verifyCalendarDate("2025-03-04", "Tue"),
        verifyCalendarDate("2025-03-06", "Thu"),
      ],
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Project Milestone Meetings",
    },

    // {
    //   date: verifyCalendarDate("2023-10-19", "Thu"),
    //   timeAndLocation: TIME_AND_LOCATION_LECTURE,
    //   type: "lecture",
    //   title:
    //     "Research Topic: Information and Communication Technologies and Development",
    //   guest: {
    //     name: "Kurtis Heimerl",
    //     link: "https://kurti.sh/",
    //   },
    //   readingsStandard: {
    //     framing: {
    //       authorText:
    //         "Lilly Irani, Janet Vertesi, Paul Dourish, Kavita Philip, Rebecca E. Grinter",
    //       title: "Postcolonial Computing: A Lens on Design and Development",
    //       publicationText: "CHI 2010",
    //       link: "https://canvas.uw.edu/files/109846175/",
    //     },
    //     instances: [
    //       {
    //         authorText:
    //           "Eric Brewer, Michael Demmer, Melissa Ho, R. J. Honicky, Joyojeet Pal, Madelaine Plauche, Sonesh Surana",
    //         title:
    //           "The Challenges of Technology Research for Developing Regions",
    //         publicationText: "IEEE Pervasive Computing, 2006",
    //         link: "https://canvas.uw.edu/files/109846171/",
    //       },
    //       {
    //         authorText:
    //           "Matthew William Johnson, Esther Han Beol Jang, Frankie O'Rourke, Rachel Ye, Kurtis Heimerl",
    //         title:
    //           "Network Capacity as Common Pool Resource: Community-Based Congestion Management in a Community Network",
    //         publicationText: "CSCW 2021",
    //         link: "https://canvas.uw.edu/files/109846179/",
    //       },
    //     ],
    //   },
    // },
    // // Week 5
    // {
    //   date: verifyCalendarDate("2023-10-24", "Tue"),
    //   timeAndLocation: TIME_AND_LOCATION_LECTURE,
    //   type: "lecture",
    //   title: "Research Topic: Design Tools",
    //   readingsStandard: {
    //     framing: {
    //       authorText:
    //         "Mark W. Newman, James Lin, Jason I. Hong, James A. Landay",
    //       title:
    //         "DENIM: An Informal Web Site Design Tool Inspired by Observations of Practice",
    //       publicationText: "HCI, 2003",
    //       link: "https://canvas.uw.edu/files/109846152/",
    //     },
    //     instances: [
    //       {
    //         authorText:
    //           "Steven P. Dow, Alana Glassco, Jonathan Kass, Melissa Schwarz, Daniel L. Schwartz, Scott R. Klemmer",
    //         title:
    //           "Parallel Prototyping Leads to Better Design Results, More Divergence, and Increased Self-Efficacy",
    //         publicationText: "TOCHI, 2010",
    //         link: "https://canvas.uw.edu/files/109846134/",
    //       },
    //       {
    //         authorText:
    //           "Stefanie Mueller, Sangha Im, Serafima Gurevich, Alexander Teibrich, Lisa Pfisterer, François Guimbretière, Patrick Baudisch",
    //         title: "WirePrint: 3D Printed Previews for Fast Prototyping",
    //         publicationText: "UIST 2014",
    //         link: "https://canvas.uw.edu/files/109846146/",
    //       },
    //     ],
    //   },
    // },
    // {
    //   date: verifyCalendarDate("2023-10-26", "Thu"),
    //   timeAndLocation: TIME_AND_LOCATION_LECTURE,
    //   type: "lecture",
    //   title: "Experimental Design and Analysis",
    // },
    // // Week 7
    // {
    //   date: verifyCalendarDate("2023-11-07", "Tue"),
    //   timeAndLocation: TIME_AND_LOCATION_LECTURE,
    //   type: "lecture",
    //   title: "Research Topic: Accessibility",
    //   guest: {
    //     name: "Martez Mott",
    //     link: "http://www.martezmott.com/",
    //   },
    //   readingsStandard: {
    //     framing: {
    //       authorText:
    //         "Jacob O. Wobbrock, Krzysztof Z. Gajos, Shaun K. Kane, Gregg C. Vanderheiden",
    //       title: "Ability-Based Design",
    //       publicationText: "CACM, 2018",
    //       link: "https://canvas.uw.edu/files/109669327/",
    //     },
    //     instances: [
    //       {
    //         authorText:
    //           "Martez E. Mott, Radu-Daniel Vatavu, Shaun K. Kane, Jacob O. Wobbrock",
    //         title:
    //           "Smart Touch: Improving Touch Accuracy for People with Motor Impairments with Template Matching",
    //         publicationText: "CHI 2016",
    //         link: "https://canvas.uw.edu/files/109669328/",
    //       },
    //       {
    //         authorText: "Rachel L. Franz, Sasa Junuzovic, Martez Mott",
    //         title:
    //           "Nearmi: A Framework for Designing Point of Interest Techniques for VR Users with Limited Mobility",
    //         publicationText: "ASSETS 2021",
    //         link: "https://canvas.uw.edu/files/109669329/",
    //       },
    //     ],
    //   },
    // },
    // {
    //   date: verifyCalendarDate("2023-11-09", "Thu"),
    //   timeAndLocation: TIME_AND_LOCATION_LECTURE,
    //   type: "lecture",
    //   title: "Research Topic: Computing Education and Learning",
    //   guest: {
    //     name: "Ben Shapiro",
    //     link: "https://benshapi.ro/",
    //   },
    //   readingsStandard: {
    //     framing: {
    //       authorText: "William J. Pluta, Clark A. Chinn, Ravit Golan Duncan",
    //       title: "Learners' Epistemic Criteria for Good Scientific Models",
    //       publicationText: "Journal of Research in Science Teaching, 2011",
    //       link: "https://canvas.uw.edu/files/110704967/",
    //     },
    //     instances: [
    //       {
    //         authorText:
    //           "Andrea A. diSessa, David Hammer, Bruce Sherin, Tina Kolpakowski",
    //         title:
    //           "Inventing Graphing: Meta-Representational Expertise in Children",
    //         publicationText: "The Journal of Mathematical Behavior, 1991",
    //         link: "https://canvas.uw.edu/files/109846090/",
    //       },
    //       {
    //         authorText:
    //           "Thomas M. Philip, Maria C. Olivares-Pasillas, Janet Rocha",
    //         title:
    //           "Becoming Racially Literate About Data and Data-Literate About Race: Data Visualizations in the Classroom as a Site of Racial-Ideological Micro-Contestations",
    //         publicationText: "Cognition and Instruction, 2016",
    //         link: "https://canvas.uw.edu/files/110704966/",
    //       },
    //     ],
    //   },
    // },
    // // Week 8
    // {
    //   date: verifyCalendarDate("2023-11-14", "Tue"),
    //   timeAndLocation: TIME_AND_LOCATION_LECTURE,
    //   type: "lecture",
    //   title: "Research Topic: Interaction with AI",
    //   guest: {
    //     name: "Mitchell Gordon",
    //     link: "https://mgordon.me/",
    //   },
    //   readingsStandard: {
    //     framing: {
    //       authorText: "Eric Horvitz",
    //       title: "Principles of Mixed-Initiative User Interfaces",
    //       publicationText: "CHI 1999",
    //       link: "https://canvas.uw.edu/files/110367098/",
    //     },
    //     instances: [
    //       {
    //         authorText:
    //           "Mitchell L. Gordon, Michelle S. Lam, Joon Sung Park, Kayur Patel, Jeff Hancock, Tatsunori Hashimoto, Michael S. Bernstein",
    //         title:
    //           "Jury Learning: Integrating Dissenting Voices into Machine Learning Models",
    //         publicationText: "CHI 2022",
    //         link: "https://canvas.uw.edu/files/109846184/",
    //       },
    //       {
    //         authorText:
    //           "Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein",
    //         title: "Generative Agents: Interactive Simulacra of Human Behavior",
    //         publicationText: "UIST 2023",
    //         link: "https://canvas.uw.edu/files/110367205/",
    //       },
    //     ],
    //   },
    // },
    // {
    //   date: verifyCalendarDate("2023-11-16", "Thu"),
    //   timeAndLocation: TIME_AND_LOCATION_LECTURE,
    //   type: "lecture",
    //   title: "Research Topic: Designing with Children",
    //   guest: {
    //     name: "Jason Yip",
    //     link: "https://bigyipper.com/",
    //   },
    //   readingsStandard: {
    //     framing: {
    //       authorText: "Allison Druin",
    //       title: "The Role of Children in the Design of New Technology",
    //       publicationText: "Behaviour and Information Technology, 2002",
    //       link: "https://canvas.uw.edu/files/109846155/",
    //     },
    //     instances: [
    //       {
    //         authorText:
    //           "Kung Jin Lee, Wendy Roldan, Tian Qi Zhu, Harkiran Kaur Saluja, Sungmin Na, Britnie Chin, Yilin Zeng, Jin Ha Lee, Jason Yip",
    //         title:
    //           "The Show Must Go On: A Conceptual Model of Conducting Synchronous Participatory Design With Children Online",
    //         publicationText: "CHI 2021",
    //         link: "https://canvas.uw.edu/files/109846160/",
    //       },
    //       {
    //         authorText:
    //           "Jason Yip, Kelly Wong, Isabella Oh, Farisha Sultan, Wendy Roldan, Kung Jin Lee, Jimi Huh",
    //         title:
    //           "Co-Design Tensions Between Parents, Children, and Researchers Regarding Mobile Health Technology Design Needs and Decisions: Case Study",
    //         publicationText: "JMIR Formative Research, 2023",
    //         link: "https://canvas.uw.edu/files/110702877/",
    //       },
    //     ],
    //   },
    // },
    // // Week 9
    // {
    //   date: verifyCalendarDate("2023-11-21", "Tue"),
    //   timeAndLocation: TIME_AND_LOCATION_LECTURE,
    //   type: "lecture",
    //   title: "Research Topic: CSCW and Social Computing",
    //   guest: {
    //     name: "Mako Hill",
    //     link: "https://mako.cc/",
    //   },
    //   readingsStandard: {
    //     framing: {
    //       authorText: "Mark S. Ackerman",
    //       title:
    //         "The Intellectual Challenge of CSCW: The Gap Between Social Requirements and Technical Feasibility",
    //       publicationText: "HCI 2000",
    //       link: "https://canvas.uw.edu/files/109846110/",
    //     },
    //     instances: [
    //       {
    //         authorText:
    //           "Aaron Halfaker, R. Stuart Geiger, Jonathan T. Morgan, John Riedl",
    //         title:
    //           "The Rise and Decline of an Open Collaboration System: How Wikipedia’s Reaction to Popularity Is Causing Its Decline",
    //         publicationText: "American Behavioral Scientist 2012",
    //         link: "https://canvas.uw.edu/files/109846115/",
    //       },
    //       {
    //         authorText:
    //           "Sneha Narayan, Jake Orlowitz, Jonathan T Morgan, Benjamin Mako Hill, Aaron Shaw",
    //         title:
    //           "The Wikipedia Adventure: Field Evaluation of an Interactive Tutorial for New Users",
    //         publicationText: "CSCW 2017",
    //         link: "https://canvas.uw.edu/files/109846121/",
    //       },
    //     ],
    //   },
    //   additionalResourceReadings: [
    //     {
    //       authorText:
    //         "P. J. Resnick, Neophytos Iacovou, Mitesh Suchak, Pete Bergstrom, John Riedl",
    //       title:
    //         "GroupLens: An Open Architecture for Collaborative Filtering of Netnews",
    //       publicationText: "CSCW 1994",
    //       link: "https://canvas.uw.edu/files/109846127/",
    //     },
    //   ],
    // },
    // // Week 11
    // {
    //   date: verifyCalendarDate("2023-12-05", "Tue"),
    //   timeAndLocation: TIME_AND_LOCATION_LECTURE,
    //   type: "lecture",
    //   title: "Research Topic: Personal Health Informatics",
    //   guest: {
    //     name: "Sean Munson",
    //     link: "https://www.smunson.com/",
    //   },
    //   // contentNonstandard: (
    //   //   <React.Fragment>
    //   //     <p>Read both framing papers:</p>
    //   //     <ul>
    //   //       <li>
    //   //         <p>
    //   //           <FormattedReading
    //   //             reading={{
    //   //               authorText: "Ian Li, Anind Dey, Jodi Forlizzi",
    //   //               title:
    //   //                 "A Stage-Based Model of Personal Informatics Systems",
    //   //               publicationText: "CHI 2010",
    //   //               link: "https://canvas.uw.edu/files/112522023",
    //   //             }}
    //   //           />
    //   //         </p>
    //   //       </li>
    //   //       <li>
    //   //         <p>
    //   //           <FormattedReading
    //   //             reading={{
    //   //               authorText: "Charlotte P. Lee",
    //   //               title:
    //   //                 "Boundary Negotiating Artifacts: Unbinding the Routine of Boundary Objects and Embracing Chaos in Collaborative Work",
    //   //               publicationText: "CSCW 2007",
    //   //               link: "https://canvas.uw.edu/files/112522025/",
    //   //             }}
    //   //           />
    //   //         </p>
    //   //       </li>
    //   //     </ul>
    //   //     <p>Optional instance reading:</p>
    //   //     <ul>
    //   //       <li>
    //   //         <p>
    //   //           <FormattedReading
    //   //             reading={{
    //   //               authorText:
    //   //                 "Chia-Fang Chung, Qiaosi Wang, Jessica Schroeder, Allison Cole, Jasmine Zia, James Fogarty, Sean A. Munson",
    //   //               title:
    //   //                 "Identifying and Planning for Individualized Change: Patient-Provider Collaboration Using Lightweight Food Diaries in Healthy Eating and Irritable Bowel Syndrome",
    //   //               publicationText: "UbiComp 2019",
    //   //               link: "https://canvas.uw.edu/files/112522022",
    //   //             }}
    //   //           />
    //   //         </p>
    //   //       </li>
    //   //     </ul>
    //   //     <p>
    //   //       Post a reading report in the appropriate thread(s), by 11:59pm the
    //   //       night before class:
    //   //     </p>
    //   //     <CourseStoreLink
    //   //       outerComponent="p"
    //   //       linkKey={"linkCanvasDiscussion"}
    //   //     />
    //   //   </React.Fragment>
    //   // ),
    // },
    // {
    //   date: verifyCalendarDate("2023-12-07", "Thu"),
    //   timeAndLocation: TIME_AND_LOCATION_LECTURE,
    //   type: "lecture",
    //   title: "Research Topic: Sustained HCI Research In-the-Wild",
    //   guests: [
    //     {
    //       name: "Katharina Reinecke",
    //       link: "https://homes.cs.washington.edu/~reinecke/",
    //     },
    //     {
    //       name: "Richard Li",
    //       link: "https://lichard49.github.io/",
    //     },
    //   ],
    //   readingsStandard: {
    //     framing: {
    //       authorText: "Philip Guo",
    //       title:
    //         "Ten Million Users and Ten Years Later: Python Tutor’s Design Guidelines for Building Scalable and Sustainable Research Software in Academia",
    //       publicationText: "UIST 2021",
    //       link: "https://canvas.uw.edu/files/112522481/",
    //     },
    //     instances: [
    //       {
    //         authorText: "Katharina Reinecke and Krzysztof Z. Gajos",
    //         title:
    //           "LabintheWild: Conducting Large-Scale Online Experiments With Uncompensated Samples",
    //         publicationText: "CSCW 2015",
    //         link: "https://canvas.uw.edu/files/112522487/",
    //       },
    //       {
    //         authorText: "Richard Li et al",
    //         title: "Title Anonymized",
    //         publicationText: "In Preparation",
    //         link: "https://canvas.uw.edu/files/112522484/",
    //       },
    //     ],
    //   },
    // },
  ],

  officeHours: [],

  studios: [],
};

/*

export const calendarData: {
  datesOfInstruction: {
    start: CalendarDate;
    end: CalendarDate;
  };
  holidays: HolidayCalendarItem[];
  lectures: LectureCalendarItem[];
  studios: StudioCalendarItem[];
  events: EventCalendarItem[];
  officeHours: OfficeHourCalendarItem[];
  assignments: { [key: string]: AssignmentCalendarItem };
} = {
  studios: [
    {
      type: "studio",
      dates: [
        verifyCalendarDate("2024-09-27", "Fri"),
        verifyCalendarDate("2024-10-04", "Fri"),
        verifyCalendarDate("2024-10-11", "Fri"),
        verifyCalendarDate("2024-10-18", "Fri"),
        verifyCalendarDate("2024-10-25", "Fri"),
        verifyCalendarDate("2024-11-08", "Fri"),
        verifyCalendarDate("2024-11-15", "Fri"),
        verifyCalendarDate("2024-11-22", "Fri"),
        verifyCalendarDate("2024-12-06", "Fri"),
      ],
      timeAndLocations: TIME_AND_LOCATIONS_SECTION,
      title: "Studio",
    },
    {
      type: "studio",
      dates: [verifyCalendarDate("2024-10-24", "Thu")],
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Studio",
      slides: "https://canvas.uw.edu/files/125633734/",
    },
    {
      type: "studio",
      dates: [
        verifyCalendarDate("2024-11-26", "Tue"),
        verifyCalendarDate("2024-12-03", "Tue"),
        verifyCalendarDate("2024-12-05", "Thu"),
      ],
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Studio",
    },
    {
      type: "studio",
      title: "Design Presentations",
      dates: [
        verifyCalendarDate("2024-10-29", "Tue"),
        verifyCalendarDate("2024-10-31", "Thu"),
      ],
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
    },
    {
      type: "studio",
      title: "Design Presentations",
      date: verifyCalendarDate("2024-11-01", "Fri"),
      timeAndLocations: TIME_AND_LOCATIONS_SECTION,
    },
  ],

  events: [
    {
      type: "event",
      title: "Exam Q&A",
      date: verifyCalendarDate("2024-11-18", "Mon"),
      timeAndLocation: TIME_AND_LOCATION_EXAM_QA,
      slides: "https://canvas.uw.edu/files/126571016/",
    },
    {
      type: "event",
      title: "Exam",
      date: verifyCalendarDate("2024-11-19", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
    },
    {
      type: "event",
      title: "Poster Session",
      date: verifyCalendarDate("2024-12-09", "Mon"),
      timeAndLocation: TIME_AND_LOCATION_POSTER_SESSION,
    },
  ],

  officeHours: [
    {
      type: "officeHour",
      title: "Office Hour: Katelyn",
      timeAndLocation: TIME_AND_LOCATION_OFFICE_HOUR_KATELYN,
      dates: [
        verifyCalendarDate("2024-10-02", "Wed"),
        verifyCalendarDate("2024-10-09", "Wed"),
        verifyCalendarDate("2024-10-16", "Wed"),
        verifyCalendarDate("2024-10-23", "Wed"),
        verifyCalendarDate("2024-10-30", "Wed"),
        verifyCalendarDate("2024-11-06", "Wed"),
        verifyCalendarDate("2024-11-13", "Wed"),
        verifyCalendarDate("2024-11-20", "Wed"),
        verifyCalendarDate("2024-12-04", "Wed"),
      ],
    },
    {
      type: "officeHour",
      title: "Office Hour: Jesse",
      timeAndLocation: TIME_AND_LOCATION_OFFICE_HOUR_JESSE,
      dates: [
        verifyCalendarDate("2024-10-03", "Thu"),
        verifyCalendarDate("2024-10-10", "Thu"),
        verifyCalendarDate("2024-10-17", "Thu"),
        verifyCalendarDate("2024-10-24", "Thu"),
        verifyCalendarDate("2024-10-31", "Thu"),
        verifyCalendarDate("2024-11-07", "Thu"),
        verifyCalendarDate("2024-11-14", "Thu"),
        verifyCalendarDate("2024-11-21", "Thu"),
        verifyCalendarDate("2024-12-05", "Thu"),
      ],
    },
  ],

  assignments: {
    //
    // Assignment 0
    //
    assignment_0: {
      type: "assignment",
      title: "Assignment 0: Introduction Slide",
      link: SiteLinks.assignment_0_top.href,
      date: verifyCalendarDate("2024-10-02", "Wed"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9634757",
    },

    //
    // Milestone 1
    //
    assignment_1_1: {
      type: "assignment",
      title: "Assignment 1.1: Individual Brainstorm",
      link: SiteLinks.assignment_1_1_top.href,
      date: verifyCalendarDate("2024-09-26", "Thu"),
      submission: "canvas",
      submitCanvasTime: "10:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9635629",
    },
    assignment_1_2: {
      type: "assignment",
      title: "Assignment 1.2: Group Proposals",
      link: SiteLinks.assignment_1_2_top.href,
      date: verifyCalendarDate("2024-09-30", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9634760",
    },
    assignment_1_3: {
      type: "assignment",
      title: "Assignment 1.3: Final Proposal",
      link: SiteLinks.assignment_1_3_top.href,
      date: verifyCalendarDate("2024-10-03", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9634761",
    },
    assignment_1_4: {
      type: "assignment",
      title: "Assignment 1.4: Design Ideation",
      link: SiteLinks.assignment_1_4_top.href,
      date: verifyCalendarDate("2024-10-04", "Fri"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9636906",
    },
    milestone_1_report: {
      type: "assignment",
      title: "Milestone 1: Report",
      link: SiteLinks.milestone_1_report_top.href,
      date: verifyCalendarDate("2024-10-07", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9636932",
    },

    //
    // Milestone 2
    //
    assignment_2_1: {
      type: "assignment",
      title: "Assignment 2.1: Design Research Plan",
      link: SiteLinks.assignment_2_1_top.href,
      date: verifyCalendarDate("2024-10-10", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9730292",
    },
    assignment_2_2: {
      type: "assignment",
      title: "Assignment 2.2: Design Research Check-In",
      link: SiteLinks.assignment_2_2_top.href,
      date: verifyCalendarDate("2024-10-17", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9730293",
    },
    milestone_2_report: {
      type: "assignment",
      title: "Milestone 2: Report",
      link: SiteLinks.milestone_2_report_top.href,
      date: verifyCalendarDate("2024-10-21", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9755342",
    },

    //
    // Milestone 3
    //
    assignment_3_1: {
      type: "assignment",
      title: "Assignment 3.1: Task Review",
      link: SiteLinks.assignment_3_1_top.href,
      date: verifyCalendarDate("2024-10-23", "Wed"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9759789",
    },
    assignment_3_2: {
      type: "assignment",
      title: "Assignment 3.2: Design Review",
      link: SiteLinks.assignment_3_2_top.href,
      date: verifyCalendarDate("2024-10-28", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9764927",
    },
    // assignment_3_3: {
    //   type: "assignment",
    //   title: "Assignment 3.3: Design Presentations",
    //   link: SiteLinks.assignment_3_3_top.href,
    //   // date: verifyCalendarDate("2024-10-28", "Mon"),
    // },
    assignment_3_4: {
      type: "assignment",
      title: "Assignment 3.4: Scenarios and Storyboards",
      link: SiteLinks.assignment_3_4_top.href,
      date: verifyCalendarDate("2024-11-05", "Tue"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9776564",
    },
    milestone_3_report: {
      type: "assignment",
      title: "Milestone 3: Report",
      link: SiteLinks.milestone_3_report_top.href,
      date: verifyCalendarDate("2024-11-08", "Fri"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9776723",
    },

    //
    // Milestone 4
    //
    assignment_4_1: {
      type: "assignment",
      title: "Assignment 4.1: Paper Prototype",
      link: SiteLinks.assignment_4_1_top.href,
      date: verifyCalendarDate("2024-11-12", "Tue"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9793018",
    },
    assignment_4_2: {
      type: "assignment",
      title: "Assignment 4.2: Heuristic Evaluation",
      link: SiteLinks.assignment_4_2_top.href,
      date: verifyCalendarDate("2024-11-14", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9793114",
    },
    assignment_4_3: {
      type: "assignment",
      title: "Assignment 4.3: Usability Testing",
      link: SiteLinks.assignment_4_3_top.href,
      date: verifyCalendarDate("2024-11-25", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9795140",
    },
    milestone_4_report: {
      type: "assignment",
      title: "Milestone 4: Report",
      link: SiteLinks.milestone_4_report_top.href,
      date: verifyCalendarDate("2024-11-27", "Wed"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9795144",
    },

    //
    // Milestone 5
    //
    assignment_5_digital_mockup: {
      type: "assignment",
      title: "Assignment 5: Digital Mockup",
      link: SiteLinks.assignment_5_digital_mockup_top.href,
      date: verifyCalendarDate("2024-12-02", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9821454",
    },
    assignment_5_poster_initial: {
      type: "assignment",
      title: "Assignment 5: Initial Poster",
      link: SiteLinks.assignment_5_poster_top.href,
      date: verifyCalendarDate("2024-12-02", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9821457",
    },
    assignment_5_poster_final: {
      type: "assignment",
      title: "Assignment 5: Final Poster",
      link: SiteLinks.assignment_5_poster_top.href,
      date: verifyCalendarDate("2024-12-04", "Wed"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9821486",
    },
    assignment_5_web_post_initial: {
      type: "assignment",
      title: "Assignment 5: Initial Web Post",
      link: SiteLinks.assignment_5_web_post_top.href,
      date: verifyCalendarDate("2024-12-04", "Wed"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
    },
    assignment_5_web_post_final: {
      type: "assignment",
      title: "Assignment 5: Final Web Post",
      link: SiteLinks.assignment_5_web_post_top.href,
      date: verifyCalendarDate("2024-12-06", "Fri"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
    },
  },
};

*/