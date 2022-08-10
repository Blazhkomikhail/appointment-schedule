export interface IWorkflowItem {
  "userCrmProfileID"?: string,
  "dayOfWeek": number,
  "fromTime": string,
  "toTime": string,
  "userCrmProfile"?: string | null,
  "id": string,
  "isActive"?: boolean
}