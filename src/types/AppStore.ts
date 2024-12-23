import CourseStore, { CourseStoreData } from "@/types/CourseStore";

export interface AppStoreData {
  courseStoreData: CourseStoreData;
}

export interface AppStore extends AppStoreData {
  courseStore: CourseStore;
}

export default AppStore;
