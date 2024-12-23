import * as React from "react";

import { ok as assert } from "assert";

import { FormattedReading } from "@/components/FormattedReading";
import { CourseStoreLink } from "@/components/links/CourseStoreLink";
import { default as ContentContributionsInHCI } from "@/contentcomponents/ContributionsInHCI.mdx";
import { default as ContentNoReading } from "@/contentcomponents/NoReading.mdx";
import { default as ContentVisionsOfHCI } from "@/contentcomponents/VisionsOfHCI.mdx";
import { SiteLinks } from "@/data/SiteLinks";
import {
  AssignmentCalendarItem,
  CalendarDate,
  CalendarItem,
  HolidayCalendarItem,
  LectureCalendarItem,
} from "@/types/CalendarData";
import {
  format as datefnsFormat,
  isValid as datefnsIsValid,
  parse as datefnsParse,
  eachDayOfInterval,
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

const LECTURE_TIME_AND_LOCATION = {
  time: "10:00 to 11:20",
  location: "CSE2/Gates G04",
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

export function calendarDates(): string[] {
  return eachDayOfInterval({
    start: parseCalendarDate(calendarData.datesOfInstruction.start),
    end: parseCalendarDate(calendarData.datesOfInstruction.end),
  }).map((dateCurrent: Date): string => {
    return datefnsFormat(dateCurrent, "yyyy-MM-dd");
  });
}

export function calendarItems(): CalendarItem[] {
  return [
    ...Object.values(calendarData.assignments),
    ...calendarData.holidays,
    ...calendarData.lectures,
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
  holidays: HolidayCalendarItem[];
  lectures: LectureCalendarItem[];
  assignments: { [key: string]: AssignmentCalendarItem };
} = {
  datesOfInstruction: {
    start: verifyCalendarDate("2023-09-27", "Wed"),
    end: verifyCalendarDate("2023-12-15", "Fri"),
  },

  holidays: [
    {
      date: verifyCalendarDate("2023-11-10", "Fri"),
      type: "holiday",
      title: "Veterans Day Observed",
    },
    {
      date: verifyCalendarDate("2023-11-23", "Thu"),
      type: "holiday",
      title: "Thanksgiving",
    },
    {
      date: verifyCalendarDate("2023-11-24", "Fri"),
      type: "holiday",
      title: "Native American Heritage Day",
    },
  ],

  lectures: [
    // Week 1
    {
      date: verifyCalendarDate("2023-09-28", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Introductions and Overview",
      contentNonstandard: <ContentNoReading />,
    },
    // Week 2
    {
      date: verifyCalendarDate("2023-10-03", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Visions of Human-Computer Interaction",
      contentNonstandard: (
        <ContentVisionsOfHCI
          readings={[
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
              link: "https://canvas.uw.edu/files/109669385/",
            },
            {
              authorText:
                "Roy Want, Andy Hopper, Veronica Falcão, Jonathan Gibbons",
              title: "The Active Badge Location System",
              publicationText: "TOIS 1992",
              link: "https://canvas.uw.edu/files/109669381/",
            },
            {
              authorText: "James D. Hollan, Scott Stornetta",
              title: "Beyond Being There",
              publicationText: "CHI 1992",
              link: "https://canvas.uw.edu/files/109669382/",
            },
            {
              authorText: "Pierre Wellner",
              title: "Interacting with Paper on the DigitalDesk",
              publicationText: "CACM 1993",
              link: "https://canvas.uw.edu/files/109669377/",
            },
            {
              authorText: "Benjamin B. Bederson, James D. Hollan",
              title:
                "Pad++: A Zooming Graphical Interface for Exploring Alternate Interface Physics",
              publicationText: "UIST 1994",
              link: "https://canvas.uw.edu/files/109669378/",
            },
            {
              authorText: "Hiroshi Ishii, Brygg Ullmer",
              title:
                "Tangible Bits: Towards Seamless Interfaces between People, Bits and Atoms",
              publicationText: "CHI 1997",
              link: "https://canvas.uw.edu/files/109669372/",
            },
            {
              authorText: "Eric Horvitz",
              title: "Principles of Mixed-Initiative User Interfaces",
              publicationText: "CHI 1999",
              link: "https://canvas.uw.edu/files/109669379/",
            },
            {
              authorText:
                "Ken Hinckley, Jeff Pierce, Mike Sinclair, Eric Horvitz",
              title: "Sensing Techniques for Mobile Interaction",
              publicationText: "UIST 2000",
              link: "https://canvas.uw.edu/files/109669380/",
            },
            {
              authorText: "Claudio S. Pinhanez",
              title:
                "The Everywhere Displays Projector: A Device to Create Ubiquitous Graphical Interfaces",
              publicationText: "UbiComp 2001",
              link: "https://canvas.uw.edu/files/109669383/",
            },
            {
              authorText: "Saul Greenberg, Chester Fitchett",
              title:
                "Phidgets: Easy Development of Physical Interfaces through Physical Widgets",
              publicationText: "UIST 2001",
              link: "https://canvas.uw.edu/files/109669384/",
            },
            {
              authorText:
                "Roy Want, Trevor Pering, Gunner Danneels, Muthu Kumar, Murali Sundar, John Light",
              title:
                "The Personal Server: Changing the Way We Think about Ubiquitous Computing",
              publicationText: "UbiComp 2002",
              link: "https://canvas.uw.edu/files/109669375/",
            },
            {
              authorText:
                "Jonathan Lester, Tanzeem Choudhury, Gaetano Borriello",
              title: "A Practical Approach to Recognizing Physical Activities",
              publicationText: "Pervasive 2006",
              link: "https://canvas.uw.edu/files/109669374/",
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
              link: "https://canvas.uw.edu/files/109669648/",
            },
          ]}
        />
      ),
    },
    {
      date: verifyCalendarDate("2023-10-05", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Contributions in Human-Computer Interaction",
      contentNonstandard: (
        <ContentContributionsInHCI
          readings={{
            framing: {
              authorText: "Jacob O. Wobbrock, Julie A. Kientz",
              title: "Research Contributions in Human-Computer Interaction",
              publicationText: "Interactions, 2016",
              link: "https://canvas.uw.edu/files/109669373/",
            },
            contributions: {
              Empirical: [
                {
                  authorText: "Rosanna Bellini",
                  title:
                    "Paying the Price: When Intimate Partners Use Technology for Financial Harm",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581101",
                },
                {
                  authorText:
                    "Ananya Bhattacharjee, Joseph Jay Williams, Jonah Meyerhoff, Harsh Kumar, Alex Mariakakis, Rachel Kornfield",
                  title:
                    "Investigating the Role of Context in the Delivery of Text Messages for Supporting Psychological Wellbeing",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3580774",
                },
                {
                  authorText:
                    "Ishita Chordia, Lena-Phuong Tran, Tala June Tayebi, Emily Parrish, Sheena Erete, Jason Yip, Alexis Hiniker",
                  title:
                    "Deceptive Design Patterns in Safety Technologies: A Case Study of the Citizen App",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581258",
                },
                {
                  authorText:
                    "Eunkyung Jo, Daniel A. Epstein, Hyunhoon Jung, Young-Ho Kim",
                  title:
                    "Understanding the Benefits and Challenges of Deploying Conversational AI Leveraging Large Language Models for Public Health Intervention",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581503",
                },
              ],
              Artifact: [
                {
                  authorText:
                    "Joseph Chee Chang, Amy X. Zhang, Jonathan Bragg, Andrew Head, Kyle Lo, Doug Downey, Daniel S. Weld",
                  title:
                    "CiteSee: Augmenting Citations in Scientific Papers with Persistent and Personalized Historical Context",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3580847",
                },
                {
                  authorText:
                    "Damien Masson, Sylvain Malacria, Daniel Vogel, Edward Lank, Géry Casiez",
                  title:
                    "ChartDetective: Easy and Accurate Interactive Data Extraction from Complex Vector Charts",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581113",
                },
                {
                  authorText:
                    "Steven Moore, Q. Vera Liao, Hariharan Subramonyam",
                  title:
                    "FAIlureNotes: Supporting Designers in Understanding the Limits of AI Models for Computer Vision Tasks",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581242",
                },
              ],
              Methodological: [
                {
                  authorText:
                    "Paul T. Chiou, Ali S. Alotaibi, William G.J. Halfond",
                  title:
                    "BAGEL: An Approach to Automatically Detect Navigation-Based Web Accessibility Barriers for Keyboard Users",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3580749",
                },
                {
                  authorText:
                    "Laura J Perovich, Bernice Rogowitz, Victoria Crabb, Jack Vogelsang, Sara Hartleben, Dietmar Offenhuber",
                  title:
                    "The Tactile Dimension: A Method for Physicalizing Touch Behaviors",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581137",
                },
                {
                  authorText:
                    "Lara Reime, Vasiliki Tsaknaki, Marisa Leavitt Cohn",
                  title:
                    "Walking Through Normativities of Reproductive Bodies: A Method for Critical Analysis of Tracking Applications",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581450",
                },
              ],
              Theoretical: [
                {
                  authorText:
                    "Rachael Garrett, Kristina Popova, Claudia Núñez-Pacheco, Thorhildur Asgeirsdottir, Airi Lampinen, Kristina Höök",
                  title:
                    "Felt Ethics: Cultivating Ethical Sensibility in Design Practice",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3580875",
                },
                {
                  authorText:
                    "Beat Rossmy, Nađa Terzimehić, Tanja Döring, Daniel Buschek, Alexander Wiethoff",
                  title:
                    "Point of no Undo: Irreversible Interactions as a Design Strategy",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581433",
                },
                {
                  authorText:
                    "Carol F Scott, Gabriela Marcu, Riana Elyse Anderson, Mark W Newman, Sarita Schoenebeck",
                  title:
                    "Trauma-Informed Social Media: Towards Solutions for Reducing and Healing Online Harm",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581512",
                },
              ],
              "Benchmark / Dataset": [
                {
                  authorText:
                    "Amanda Baughan, Xuezhi Wang, Ariel Liu, Allison Mercurio, Jilin Chen, Xiao Ma",
                  title:
                    "A Mixed-Methods Approach to Understanding User Trust after Voice Assistant Failures",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581152",
                },
                {
                  authorText:
                    "Saelyne Yang, Sangkyung Kwak, Juhoon Lee, Juho Kim",
                  title:
                    "Beyond Instructions: A Taxonomy of Information Types in How-to Videos",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581126",
                },
                {
                  authorText: "Zehua Zeng, Leilani Battle",
                  title:
                    "A Review and Collation of Graphical Perception Knowledge for Visualization Recommendation",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581349",
                },
              ],
              Survey: [
                {
                  authorText:
                    "Alyxander Burns, Christiana Lee, Ria Chawla, Evan Peck, Narges Mahyar",
                  title:
                    "Who Do We Mean When We Talk About Visualization Novices?",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581524",
                },
                {
                  authorText:
                    "Yiqun T. Chen, Angela D. R. Smith, Katharina Reinecke, Alexandra To",
                  title:
                    "Why, When, and From Whom: Considerations for Collecting and Reporting Race and Ethnicity Data in HCI",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581122",
                },
                {
                  authorText:
                    "Yixuan Zhang, Joseph D Gaggiano, Nutchanon Yongsatianchot, Nurul M Suhaimi, Miso Kim, Yifan Sun, Jacqueline Griffin, Andrea G Parker",
                  title:
                    "What Do We Mean When We Talk about Trust in Social Media? A Systematic Review",
                  publicationText: "CHI 2023",
                  link: "https://doi.org/10.1145/3544548.3581019",
                },
              ],
              Opinion: [
                {
                  authorText: "Ron Wakkary, Doenja Oogjes, Armi Behzad",
                  title:
                    "Two Years or More of Co-speculation: Polylogues of Philosophers, Designers, and a Tilting Bowl",
                  publicationText: "TOCHI, 2022",
                  link: "https://doi.org/10.1145/3514235",
                },
              ],
            },
          }}
        />
      ),
      additionalResourceReadings: [
        {
          authorText: "Herbert A. Simon",
          title: "The Science of Design: Creating the Artificial",
          publicationText: "Design Issues, 1988",
          link: "https://canvas.uw.edu/files/109669331/",
        },
        {
          authorText: "Donald E. Stokes",
          title:
            "Pasteur’s Quadrant: Basic Science and Technological Innovation",
          publicationText: "Book Chapter, 1997",
          link: "https://canvas.uw.edu/files/109669330/",
        },
      ],
    },
    // Week 3
    {
      date: verifyCalendarDate("2023-10-10", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "In-Class Work on Project Proposals",
      contentNonstandard: <ContentNoReading />,
    },
    {
      date: verifyCalendarDate("2023-10-12", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Human-Computer Interaction History",
      contentNonstandard: <ContentNoReading />,
      additionalResourceReadings: [
        {
          authorText: "Jonathan Grudin",
          title:
            "A Moving Target - The Evolution of Human-Computer Interaction",
          publicationText: "Book Chapter",
          link: "https://canvas.uw.edu/files/109846167/",
        },
      ],
    },
    // Week 4
    {
      date: verifyCalendarDate("2023-10-17", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Usability Evaluation Considered Harmful",
      readingsStandard: {
        framing: {
          authorText: "Saul Greenberg, Bill Buxton",
          title: "Usability Evaluation Considered Harmful (Some of the Time)",
          publicationText: "CHI 2008",
          link: "https://canvas.uw.edu/files/109846204/",
        },
        instances: [
          {
            authorText: "Dan R. Olsen, Jr",
            title: "Evaluating User Interface Systems Research",
            publicationText: "UIST 2007",
            link: "https://canvas.uw.edu/files/109846207/",
          },
          {
            authorText: "James Fogarty",
            title: "Code and Contribution in Interactive Systems Research",
            publicationText:
              "CHI 2017 Workshop on #HCI.Tools: Strategies and Best Practices for Designing, Evaluating, and Sharing Technical HCI Toolkits",
            link: "https://canvas.uw.edu/files/109846202/",
          },
        ],
      },
    },
    {
      date: verifyCalendarDate("2023-10-19", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title:
        "Research Topic: Information and Communication Technologies and Development",
      guest: {
        name: "Kurtis Heimerl",
        link: "https://kurti.sh/",
      },
      readingsStandard: {
        framing: {
          authorText:
            "Lilly Irani, Janet Vertesi, Paul Dourish, Kavita Philip, Rebecca E. Grinter",
          title: "Postcolonial Computing: A Lens on Design and Development",
          publicationText: "CHI 2010",
          link: "https://canvas.uw.edu/files/109846175/",
        },
        instances: [
          {
            authorText:
              "Eric Brewer, Michael Demmer, Melissa Ho, R. J. Honicky, Joyojeet Pal, Madelaine Plauche, Sonesh Surana",
            title:
              "The Challenges of Technology Research for Developing Regions",
            publicationText: "IEEE Pervasive Computing, 2006",
            link: "https://canvas.uw.edu/files/109846171/",
          },
          {
            authorText:
              "Matthew William Johnson, Esther Han Beol Jang, Frankie O'Rourke, Rachel Ye, Kurtis Heimerl",
            title:
              "Network Capacity as Common Pool Resource: Community-Based Congestion Management in a Community Network",
            publicationText: "CSCW 2021",
            link: "https://canvas.uw.edu/files/109846179/",
          },
        ],
      },
    },
    // Week 5
    {
      date: verifyCalendarDate("2023-10-24", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: Design Tools",
      readingsStandard: {
        framing: {
          authorText:
            "Mark W. Newman, James Lin, Jason I. Hong, James A. Landay",
          title:
            "DENIM: An Informal Web Site Design Tool Inspired by Observations of Practice",
          publicationText: "HCI, 2003",
          link: "https://canvas.uw.edu/files/109846152/",
        },
        instances: [
          {
            authorText:
              "Steven P. Dow, Alana Glassco, Jonathan Kass, Melissa Schwarz, Daniel L. Schwartz, Scott R. Klemmer",
            title:
              "Parallel Prototyping Leads to Better Design Results, More Divergence, and Increased Self-Efficacy",
            publicationText: "TOCHI, 2010",
            link: "https://canvas.uw.edu/files/109846134/",
          },
          {
            authorText:
              "Stefanie Mueller, Sangha Im, Serafima Gurevich, Alexander Teibrich, Lisa Pfisterer, François Guimbretière, Patrick Baudisch",
            title: "WirePrint: 3D Printed Previews for Fast Prototyping",
            publicationText: "UIST 2014",
            link: "https://canvas.uw.edu/files/109846146/",
          },
        ],
      },
    },
    {
      date: verifyCalendarDate("2023-10-26", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Experimental Design and Analysis",
    },
    // Week 7
    {
      date: verifyCalendarDate("2023-11-07", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: Accessibility",
      guest: {
        name: "Martez Mott",
        link: "http://www.martezmott.com/",
      },
      readingsStandard: {
        framing: {
          authorText:
            "Jacob O. Wobbrock, Krzysztof Z. Gajos, Shaun K. Kane, Gregg C. Vanderheiden",
          title: "Ability-Based Design",
          publicationText: "CACM, 2018",
          link: "https://canvas.uw.edu/files/109669327/",
        },
        instances: [
          {
            authorText:
              "Martez E. Mott, Radu-Daniel Vatavu, Shaun K. Kane, Jacob O. Wobbrock",
            title:
              "Smart Touch: Improving Touch Accuracy for People with Motor Impairments with Template Matching",
            publicationText: "CHI 2016",
            link: "https://canvas.uw.edu/files/109669328/",
          },
          {
            authorText: "Rachel L. Franz, Sasa Junuzovic, Martez Mott",
            title:
              "Nearmi: A Framework for Designing Point of Interest Techniques for VR Users with Limited Mobility",
            publicationText: "ASSETS 2021",
            link: "https://canvas.uw.edu/files/109669329/",
          },
        ],
      },
    },
    {
      date: verifyCalendarDate("2023-11-09", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: Computing Education and Learning",
      guest: {
        name: "Ben Shapiro",
        link: "https://benshapi.ro/",
      },
      readingsStandard: {
        framing: {
          authorText: "William J. Pluta, Clark A. Chinn, Ravit Golan Duncan",
          title: "Learners' Epistemic Criteria for Good Scientific Models",
          publicationText: "Journal of Research in Science Teaching, 2011",
          link: "https://canvas.uw.edu/files/110704967/",
        },
        instances: [
          {
            authorText:
              "Andrea A. diSessa, David Hammer, Bruce Sherin, Tina Kolpakowski",
            title:
              "Inventing Graphing: Meta-Representational Expertise in Children",
            publicationText: "The Journal of Mathematical Behavior, 1991",
            link: "https://canvas.uw.edu/files/109846090/",
          },
          {
            authorText:
              "Thomas M. Philip, Maria C. Olivares-Pasillas, Janet Rocha",
            title:
              "Becoming Racially Literate About Data and Data-Literate About Race: Data Visualizations in the Classroom as a Site of Racial-Ideological Micro-Contestations",
            publicationText: "Cognition and Instruction, 2016",
            link: "https://canvas.uw.edu/files/110704966/",
          },
        ],
      },
    },
    // Week 8
    {
      date: verifyCalendarDate("2023-11-14", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: Interaction with AI",
      guest: {
        name: "Mitchell Gordon",
        link: "https://mgordon.me/",
      },
      readingsStandard: {
        framing: {
          authorText: "Eric Horvitz",
          title: "Principles of Mixed-Initiative User Interfaces",
          publicationText: "CHI 1999",
          link: "https://canvas.uw.edu/files/110367098/",
        },
        instances: [
          {
            authorText:
              "Mitchell L. Gordon, Michelle S. Lam, Joon Sung Park, Kayur Patel, Jeff Hancock, Tatsunori Hashimoto, Michael S. Bernstein",
            title:
              "Jury Learning: Integrating Dissenting Voices into Machine Learning Models",
            publicationText: "CHI 2022",
            link: "https://canvas.uw.edu/files/109846184/",
          },
          {
            authorText:
              "Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein",
            title: "Generative Agents: Interactive Simulacra of Human Behavior",
            publicationText: "UIST 2023",
            link: "https://canvas.uw.edu/files/110367205/",
          },
        ],
      },
    },
    {
      date: verifyCalendarDate("2023-11-16", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: Designing with Children",
      guest: {
        name: "Jason Yip",
        link: "https://bigyipper.com/",
      },
      readingsStandard: {
        framing: {
          authorText: "Allison Druin",
          title: "The Role of Children in the Design of New Technology",
          publicationText: "Behaviour and Information Technology, 2002",
          link: "https://canvas.uw.edu/files/109846155/",
        },
        instances: [
          {
            authorText:
              "Kung Jin Lee, Wendy Roldan, Tian Qi Zhu, Harkiran Kaur Saluja, Sungmin Na, Britnie Chin, Yilin Zeng, Jin Ha Lee, Jason Yip",
            title:
              "The Show Must Go On: A Conceptual Model of Conducting Synchronous Participatory Design With Children Online",
            publicationText: "CHI 2021",
            link: "https://canvas.uw.edu/files/109846160/",
          },
          {
            authorText:
              "Jason Yip, Kelly Wong, Isabella Oh, Farisha Sultan, Wendy Roldan, Kung Jin Lee, Jimi Huh",
            title:
              "Co-Design Tensions Between Parents, Children, and Researchers Regarding Mobile Health Technology Design Needs and Decisions: Case Study",
            publicationText: "JMIR Formative Research, 2023",
            link: "https://canvas.uw.edu/files/110702877/",
          },
        ],
      },
    },
    // Week 9
    {
      date: verifyCalendarDate("2023-11-21", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: CSCW and Social Computing",
      guest: {
        name: "Mako Hill",
        link: "https://mako.cc/",
      },
      readingsStandard: {
        framing: {
          authorText: "Mark S. Ackerman",
          title:
            "The Intellectual Challenge of CSCW: The Gap Between Social Requirements and Technical Feasibility",
          publicationText: "HCI 2000",
          link: "https://canvas.uw.edu/files/109846110/",
        },
        instances: [
          {
            authorText:
              "Aaron Halfaker, R. Stuart Geiger, Jonathan T. Morgan, John Riedl",
            title:
              "The Rise and Decline of an Open Collaboration System: How Wikipedia’s Reaction to Popularity Is Causing Its Decline",
            publicationText: "American Behavioral Scientist 2012",
            link: "https://canvas.uw.edu/files/109846115/",
          },
          {
            authorText:
              "Sneha Narayan, Jake Orlowitz, Jonathan T Morgan, Benjamin Mako Hill, Aaron Shaw",
            title:
              "The Wikipedia Adventure: Field Evaluation of an Interactive Tutorial for New Users",
            publicationText: "CSCW 2017",
            link: "https://canvas.uw.edu/files/109846121/",
          },
        ],
      },
      additionalResourceReadings: [
        {
          authorText:
            "P. J. Resnick, Neophytos Iacovou, Mitesh Suchak, Pete Bergstrom, John Riedl",
          title:
            "GroupLens: An Open Architecture for Collaborative Filtering of Netnews",
          publicationText: "CSCW 1994",
          link: "https://canvas.uw.edu/files/109846127/",
        },
      ],
    },
    // Week 11
    {
      date: verifyCalendarDate("2023-12-05", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: Personal Health Informatics",
      guest: {
        name: "Sean Munson",
        link: "https://www.smunson.com/",
      },
      contentNonstandard: (
        <React.Fragment>
          <p>Read both framing papers:</p>
          <ul>
            <li>
              <p>
                <FormattedReading
                  reading={{
                    authorText: "Ian Li, Anind Dey, Jodi Forlizzi",
                    title:
                      "A Stage-Based Model of Personal Informatics Systems",
                    publicationText: "CHI 2010",
                    link: "https://canvas.uw.edu/files/112522023",
                  }}
                />
              </p>
            </li>
            <li>
              <p>
                <FormattedReading
                  reading={{
                    authorText: "Charlotte P. Lee",
                    title:
                      "Boundary Negotiating Artifacts: Unbinding the Routine of Boundary Objects and Embracing Chaos in Collaborative Work",
                    publicationText: "CSCW 2007",
                    link: "https://canvas.uw.edu/files/112522025/",
                  }}
                />
              </p>
            </li>
          </ul>
          <p>Optional instance reading:</p>
          <ul>
            <li>
              <p>
                <FormattedReading
                  reading={{
                    authorText:
                      "Chia-Fang Chung, Qiaosi Wang, Jessica Schroeder, Allison Cole, Jasmine Zia, James Fogarty, Sean A. Munson",
                    title:
                      "Identifying and Planning for Individualized Change: Patient-Provider Collaboration Using Lightweight Food Diaries in Healthy Eating and Irritable Bowel Syndrome",
                    publicationText: "UbiComp 2019",
                    link: "https://canvas.uw.edu/files/112522022",
                  }}
                />
              </p>
            </li>
          </ul>
          <p>
            Post a reading report in the appropriate thread(s), by 11:59pm the
            night before class:
          </p>
          <CourseStoreLink
            outerComponent="p"
            linkKey={"linkCanvasDiscussion"}
          />
        </React.Fragment>
      ),
    },
    {
      date: verifyCalendarDate("2023-12-07", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: Sustained HCI Research In-the-Wild",
      guests: [
        {
          name: "Katharina Reinecke",
          link: "https://homes.cs.washington.edu/~reinecke/",
        },
        {
          name: "Richard Li",
          link: "https://lichard49.github.io/",
        },
      ],
      readingsStandard: {
        framing: {
          authorText: "Philip Guo",
          title:
            "Ten Million Users and Ten Years Later: Python Tutor’s Design Guidelines for Building Scalable and Sustainable Research Software in Academia",
          publicationText: "UIST 2021",
          link: "https://canvas.uw.edu/files/112522481/",
        },
        instances: [
          {
            authorText: "Katharina Reinecke and Krzysztof Z. Gajos",
            title:
              "LabintheWild: Conducting Large-Scale Online Experiments With Uncompensated Samples",
            publicationText: "CSCW 2015",
            link: "https://canvas.uw.edu/files/112522487/",
          },
          {
            authorText: "Richard Li et al",
            title: "Title Anonymized",
            publicationText: "In Preparation",
            link: "https://canvas.uw.edu/files/112522484/",
          },
        ],
      },
    },

    // Project Milestone Presentations, Week 6 and Week 10
    {
      dates: [
        verifyCalendarDate("2023-10-31", "Tue"),
        verifyCalendarDate("2023-11-02", "Thu"),
        verifyCalendarDate("2023-11-28", "Tue"),
        verifyCalendarDate("2023-11-30", "Thu"),
      ],
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Project Milestone Presentations",
    },
  ],

  assignments: {
    projectProposal: {
      type: "assignment",
      title: "Project Proposal",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2023-10-15", "Sun"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1665830/assignments/8670194",
    },
    projectMilestoneReport1: {
      type: "assignment",
      title: "Project Milestone Report 1",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2023-10-30", "Mon"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1665830/assignments/8670192",
    },
    projectMilestonePresentation1Day1: {
      type: "assignment",
      title: "Project Milestone Presentation",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2023-10-31", "Tue"),
    },
    projectMilestonePresentation1Day2: {
      type: "assignment",
      title: "Project Milestone Presentation",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2023-11-02", "Thu"),
    },
    projectMilestoneReport2: {
      type: "assignment",
      title: "Project Milestone Report 2",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2023-11-27", "Mon"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1665830/assignments/8670193",
    },
    projectMilestonePresentation2Day1: {
      type: "assignment",
      title: "Project Milestone Presentation",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2023-11-28", "Tue"),
    },
    projectMilestonePresentation2Day2: {
      type: "assignment",
      title: "Project Milestone Presentation",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2023-11-30", "Thu"),
    },
    projectFinalReport: {
      type: "assignment",
      title: "Project Final Report",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2023-12-12", "Tue"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1665830/assignments/8670191",
    },

    statisticsLabAvailable: {
      type: "assignment",
      title: "Statistics Lab Available",
      link: SiteLinks.assignmentsStatisticsLabTop.href,
      date: verifyCalendarDate("2023-10-26", "Thu"),
    },
    statisticsLab: {
      type: "assignment",
      title: "Statistics Lab",
      link: SiteLinks.assignmentsStatisticsLabTop.href,
      date: verifyCalendarDate("2023-11-19", "Sun"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1665830/assignments/8670195",
    },

    examAvailable: {
      type: "assignment",
      title: "Exam Available",
      link: SiteLinks.assignmentsExamTop.href,
      date: verifyCalendarDate("2023-12-07", "Thu"),
    },
    exam: {
      type: "assignment",
      title: "Exam",
      link: SiteLinks.assignmentsExamTop.href,
      date: verifyCalendarDate("2023-12-11", "Mon"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1665830/assignments/8670190",
    },
  },
};
