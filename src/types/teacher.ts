import { TeacherPosition } from '../enums/teacherPosition';

export interface Teacher {
  id: number;
  name: string;
  position: TeacherPosition;
}