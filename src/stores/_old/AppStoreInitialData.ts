import "server-only";

import { courseStoreData as initialCourseStoreData } from "@/data/CourseStoreData";
import { AppStoreData } from "@/types/AppStore";

export function appStoreInitialData(): AppStoreData {
  return {
    courseStoreData: initialCourseStoreData,
  };
}

export default appStoreInitialData;
