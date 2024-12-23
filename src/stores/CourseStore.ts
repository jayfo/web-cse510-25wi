import CourseStore, {
  CourseStoreData,
  CourseStoreLinkHREF,
} from "@/types/CourseStore";
import { computed, makeObservable, observable } from "mobx";

export class CourseStoreImpl implements CourseStore {
  @observable linkCanvas?: CourseStoreLinkHREF;
  @observable linkGitHub?: CourseStoreLinkHREF;
  @observable linkUniversitySyllabusGuidelines?: CourseStoreLinkHREF;

  constructor(initialData: CourseStoreData) {
    ({
      linkCanvas: this.linkCanvas,
      linkGitHub: this.linkGitHub,
      linkUniversitySyllabusGuidelines: this.linkUniversitySyllabusGuidelines,
    } = initialData);

    makeObservable(this);
  }

  @computed
  get linkCanvasDiscussion(): CourseStoreLinkHREF | undefined {
    if (this.linkCanvas) {
      return this.linkCanvas + "/discussion_topics";
    } else {
      return undefined;
    }
  }
}

export default CourseStoreImpl;
