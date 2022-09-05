type UserData = {
  absences: number;
  appIdentityUserID: string | null;
  dateOfBirth: string | null;
  email: string | null;
  firstName: string | null;
  fullName: string | null;
  generatePasswordEndDate: string | null;
  gitHubUserName: string | null;
  id: string;
  isActive: boolean;
  isCoreTeamMember: boolean;
  language: string | null;
  languageID: string;
  lastName: string | null;
  mobilePhone: string | null;
  personalEmail: string | null;
  slackUserName: string | null;
  startDate: string | null;
  userCrmProfilePermission: string | boolean | null;
  userCrmProfilePermissionID: string | null;
  userCrmProfileWorklogs: string | null;
  userPhoto: string | null;
}

export interface UserDataResponse {
  value: Array<UserData>,
}