export type LoginLabelType = {
  labelKey: string, 
  title: string, 
}

export interface LoginLabelsResponse {
  value: LoginLabelType[]
}

export interface LoginPageLabel {
  [key: string] : string,
}