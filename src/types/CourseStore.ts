import { AssertionError } from "assert";

export type CourseStoreLinkHREF = string;

const CourseStoreLinkKeyValues = [
  // "linkCanvas",
  // "linkGitHub",
  // "linkUniversitySyllabusGuidelines",
] as const;
export type CourseStoreLinkKey = (typeof CourseStoreLinkKeyValues)[number];

export function assertIsCourseStoreLinkKey(
  courseStoreLinkKey: any,
): asserts courseStoreLinkKey is CourseStoreLinkKey {
  // TODO: This is impossible while there are no key values defined
  // if (!CourseStoreLinkKeyValues.includes(courseStoreLinkKey)) {
  throw new AssertionError({ message: "Invalid CourseStoreLinkKey" });
  // }
}

export interface CourseStoreData {
  // linkCanvas?: CourseStoreLinkHREF;
  // linkGitHub?: CourseStoreLinkHREF;
  // linkUniversitySyllabusGuidelines?: CourseStoreLinkHREF;
}

export interface CourseStore extends CourseStoreData {}

export default CourseStore;
