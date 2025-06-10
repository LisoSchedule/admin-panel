import { SubjectType } from "../enums/subjectType";

export interface Subject {
  id: number;
  name: string;
  type: SubjectType;
}