import $api from "./index";
import { AxiosResponse } from "axios";
import { IWorklogResponse, IWorklogItem } from "../models/WorklogResponce";

export default class WorklogService {
  static async getAllData(): Promise<AxiosResponse<IWorklogResponse>> {
    return $api.get<IWorklogResponse>("/UserCrmProfileWorklogs/GetAllDynamic");
  }

  static async createWorklog(newWorklogData: {
    [key: string]: any;
  }): Promise<AxiosResponse<IWorklogItem[]>> {
    return $api.post("/UserCrmProfileWorklogs/Create", newWorklogData);
  }
}
