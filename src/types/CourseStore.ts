import { AssertionError } from "assert";

export type CourseStoreLinkHREF = string;

const CourseStoreLinkKeyValues = [
  "linkCanvas",
  "linkCanvasDiscussion",
  "linkGitHub",
  "linkUniversitySyllabusGuidelines",
] as const;
export type CourseStoreLinkKey = (typeof CourseStoreLinkKeyValues)[number];

export function assertIsCourseStoreLinkKey(
  courseStoreLinkKey: any,
): asserts courseStoreLinkKey is CourseStoreLinkKey {
  if (!CourseStoreLinkKeyValues.includes(courseStoreLinkKey)) {
    throw new AssertionError({ message: "Invalid CourseStoreLinkKey" });
  }
}

export interface CourseStoreData {
  linkCanvas?: CourseStoreLinkHREF;
  linkGitHub?: CourseStoreLinkHREF;
  linkUniversitySyllabusGuidelines?: CourseStoreLinkHREF;
}

export interface CourseStore extends CourseStoreData {
  linkCanvasDiscussion?: CourseStoreLinkHREF;
}

export default CourseStore;
