import Student from "../models/studentModal";

export class StudentState {
  student: Student | undefined;
}

export enum studentActionType {
  login = "login",
  logout = "logout",
}

// how the action will go, to prevent bugs
export interface studentAction {
  type: studentActionType;
  payload?: any;
}

export function login(student: Student) {
  return {
    type: studentActionType.login,
    payload: student,
  };
}

export function logout() {
  return {
    type: studentActionType.logout,
    payload: null,
  };
}

export function studentReducer(
  prevStudent: StudentState = new StudentState(),
  action: any
) {
  const newStudent = { ...prevStudent };
  switch (action.type) {
    case studentActionType.login:
      newStudent.student = action.payload;
      break;
    case studentActionType.logout:
      newStudent.student = undefined;
  }
  return newStudent;
}